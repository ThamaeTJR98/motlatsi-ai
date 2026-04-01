
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UserState, Topic, ScheduleSlot } from '../types';
import { useLearningEngine } from '../contexts/LearningEngineContext';
import { allGrades } from '../curriculum';
import { aiClient } from '../src/utils/aiClient';
import { safeJsonParse } from '../utils/aiHelpers';
import { useToast } from '../contexts/ToastContext';
import VoiceAssistant from './VoiceAssistant';
import { 
    BarChart3, Mic, Download, WifiOff,
    Calendar, AlertTriangle, Bell, Rocket, Zap, ChevronDown, ChevronUp,
    Timer, ListChecks, ArrowLeft, X, CheckCircle, Calculator, Leaf, Trophy, Bot, Send, 
    TrendingUp, BookOpen, Plus, Loader2, RefreshCw, AlertCircle, Sparkles, Clock, Save, Brain, Lightbulb,
    History, Target, Award, Star, Users, Play, LayoutDashboard, LogOut, Map, Swords, BookOpenCheck, Key
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from 'recharts';
import SmartScheduler from './SmartScheduler';

interface StudentHubProps {
    user: UserState;
    initialView?: 'overview' | 'planner' | 'analytics' | 'voice';
    onNavigate?: (view: string) => void;
    onTopicSelect?: (topic: Topic, targetView?: string) => void;
    onLogout?: () => void;
}

type SubView = 'overview' | 'planner' | 'analytics' | 'voice' | 'revision';

interface AIPlan {
    time?: string;
    subject?: string;
    notes?: string;
}

const StudentHub: React.FC<StudentHubProps> = ({ user, initialView = 'overview', onNavigate, onTopicSelect, onLogout }) => {
    const { academicStatus, schedule, refreshSchedule, downloadProgress, recentActivity, downloadTermContent } = useLearningEngine();
    const [subView, setSubView] = useState<SubView>(initialView);
    const { addToast } = useToast();

    // Join Class State
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [joinedClassIds, setJoinedClassIds] = useState<string[]>([]);

    useEffect(() => {
        const checkClassStatus = async () => {
            if (user?.role === 'student' && !user.isDemo) {
                try {
                    const { supabase } = await import('../lib/supabase');
                    const { data } = await supabase
                        .from('classroom_students')
                        .select('classroom_id')
                        .eq('student_id', user.id);
                    
                    if (data && data.length > 0) {
                        setJoinedClassIds(data.map((d: any) => d.classroom_id));
                    }
                } catch (e) {
                    console.error("Failed to check class status", e);
                }
            }
        };
        checkClassStatus();
    }, [user]);

    // Analytics Insight State
    const [selectedAnalyticsSubject, setSelectedAnalyticsSubject] = useState<{name: string, score: number, icon: React.ReactNode} | null>(null);
    const [analyticsInsight, setAnalyticsInsight] = useState('');
    const [insightLoading, setInsightLoading] = useState(false);

    // --- Sub-Components ---

    const handleJoinClass = async () => {
        if (!joinCode) {
            addToast("Please enter a class code", "error");
            return;
        }

        setIsJoining(true);
        try {
            if (user.isDemo) {
                addToast("Demo: Joined class locally", "success");
                setShowJoinModal(false);
                return;
            }

            const { supabase } = await import('../lib/supabase');
            
            // 1. Find the classroom
            const { data: classroom, error: classError } = await supabase
                .from('classrooms')
                .select('id')
                .eq('join_code', joinCode.toUpperCase())
                .single();

            if (classError || !classroom) {
                throw new Error("Classroom not found. Please check the code.");
            }

            // 2. Join the classroom
            const { error: joinError } = await supabase
                .from('classroom_students')
                .insert({
                    classroom_id: classroom.id,
                    student_id: user.id
                });

            if (joinError) {
                if (joinError.code === '23505') {
                    throw new Error("You are already in this class.");
                }
                throw joinError;
            }

            addToast("Successfully joined the class!", "success");
            setShowJoinModal(false);
            setJoinCode('');
            setJoinedClassIds(prev => [...prev, classroom.id]);
        } catch (err: any) {
            addToast(err.message || "Failed to join class", "error");
        } finally {
            setIsJoining(false);
        }
    };

    // --- Sub-Components ---
    
    // Revision Game Wrapper
    const RenderRevisionGame = () => {
        const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
        const [gradeTopics, setGradeTopics] = useState<Topic[]>([]);

        useEffect(() => {
            // Get topics for current grade
            const gradeData = allGrades.find(g => g.grade === user.currentGrade);
            if (gradeData) {
                const topics = gradeData.subjects.flatMap(s => s.topics);
                setGradeTopics(topics);
            }
        }, []);

        if (selectedTopic) {
            const RevisionGame = React.lazy(() => import('./games/RevisionGame'));
            return (
                <React.Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>}>
                    <RevisionGame 
                        topic={selectedTopic} 
                        onBack={() => setSelectedTopic(null)}
                        onComplete={() => setSelectedTopic(null)}
                    />
                </React.Suspense>
            );
        }

        return (
            <div className="flex flex-col h-full bg-[#f0f9ff] dark:bg-[#1a1d24] animate-in slide-in-from-right-4 duration-300">
                <header className="shrink-0 flex items-center gap-4 px-6 py-6">
                    <button onClick={() => setSubView('overview')} className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm transition-all text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Choose a Topic</h2>
                </header>
                <div className="flex-1 overflow-y-auto px-6 pb-8 grid gap-4">
                    {gradeTopics.map(topic => (
                        <button 
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic)}
                            className="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm text-left hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white mb-1">{topic.title}</h3>
                                <p className="text-xs text-slate-400 line-clamp-1">{topic.description}</p>
                            </div>
                            <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-teacherBlue group-hover:text-white transition-colors">
                                <Play size={14} fill="currentColor" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const RenderStudentDesk = () => {
        const mastery = academicStatus.masteryScore;
        const isBehind = academicStatus.pacerStatus === 'behind';
        
        // Simple greeting based on time of day
        const hour = new Date().getHours();
        const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

        return (
            <div className="flex flex-col h-full animate-in fade-in bg-[#f0f9ff] dark:bg-[#1a1d24]">
                {/* Kid-Friendly Header */}
                <header className="shrink-0 flex items-center justify-between px-3 py-2 z-10">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onNavigate && onNavigate('dashboard')}
                            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="size-8 rounded-full bg-white border-2 border-teacherBlue/20 flex items-center justify-center shadow-sm">
                            <span className="font-black text-teacherBlue text-xs">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                            <p className="text-slate-500 font-bold text-[8px] uppercase tracking-wider">{greeting}</p>
                            <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
                        </div>
                    </div>
                    
                    {/* Magic Sparks (Credits) */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-indigo-100">
                            <Zap size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-black text-slate-700 dark:text-white text-xs">{user.ai_credits ?? 5}</span>
                        </div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">Sparks</span>
                    </div>
                </header>

                <div className="flex-1 px-4 pb-16 overflow-y-auto">
                    
                    {/* Level Progress Bar (Gamified Pacer) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 mb-3 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex justify-between items-end mb-1">
                            <div>
                                <h2 className="text-xs font-black text-slate-700 dark:text-white flex items-center gap-1">
                                    <Trophy size={14} className="text-yellow-500" />
                                    Level {Math.floor(mastery / 10) + 1}
                                </h2>
                            </div>
                            <span className="text-sm font-black text-teacherBlue">{mastery}%</span>
                        </div>
                        
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${isBehind ? 'bg-orange-400' : 'bg-green-500'}`}
                                style={{ width: `${mastery}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* My Desk Grid (Big Buttons) */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* My Day (Planner) */}
                        <button 
                            onClick={() => setSubView('planner')}
                            className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                        >
                            <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Calendar size={20} className="text-blue-500" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs font-black text-slate-700 dark:text-white">My Day</h3>
                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">Schedule</p>
                            </div>
                        </button>

                        {/* Talk to Motlatsi (Voice) */}
                        <button 
                            onClick={() => setSubView('voice')}
                            className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                        >
                            <div className="size-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                <Mic size={20} className="text-orange-500" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs font-black text-slate-700 dark:text-white">Ask Help</h3>
                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">Assistant</p>
                            </div>
                        </button>

                        {/* Join Class */}
                        <button 
                            onClick={() => setShowJoinModal(true)}
                            className={`bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all group ${joinedClassIds.length > 0 ? 'ring-2 ring-green-500/20' : ''}`}
                        >
                            <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${joinedClassIds.length > 0 ? 'bg-green-100 dark:bg-green-900/40' : 'bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100'}`}>
                                <Users size={20} className="text-green-500" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs font-black text-slate-700 dark:text-white">{joinedClassIds.length > 0 ? 'My Class' : 'Join'}</h3>
                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">{joinedClassIds.length > 0 ? 'View' : 'Enter Code'}</p>
                            </div>
                        </button>

                        {/* Revision Game (New) */}
                        <button 
                            onClick={() => setSubView('revision')}
                            className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                        >
                            <div className="size-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                                <Brain size={20} className="text-pink-500" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs font-black text-slate-700 dark:text-white">Revision</h3>
                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">Play Snake</p>
                            </div>
                        </button>
                    </div>

                    {/* Offline Mode Card (Simplified) */}
                    <div className="mt-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white dark:bg-slate-700 rounded-lg text-slate-500">
                                <WifiOff size={14} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-700 dark:text-white text-[10px]">Offline Mode</h4>
                                <p className="text-[8px] text-slate-400 font-bold uppercase">{downloadProgress.isDownloading ? "Downloading..." : "Ready"}</p>
                            </div>
                        </div>
                        {!downloadProgress.isDownloading && (
                            <button 
                                onClick={downloadTermContent}
                                className="px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-white text-[9px] font-black rounded-lg shadow-sm hover:bg-slate-50"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer Navigation */}
                <footer className="shrink-0 flex items-center justify-around px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                    <button onClick={() => onNavigate && onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
                        <LayoutDashboard size={18} />
                        <span className="text-[9px] font-bold uppercase">Home</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('journey')} className="flex flex-col items-center gap-1 text-slate-400">
                        <Map size={18} />
                        <span className="text-[9px] font-bold uppercase">Journey</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('battle')} className="flex flex-col items-center gap-1 text-slate-400">
                        <Swords size={18} />
                        <span className="text-[9px] font-bold uppercase">Battle</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('student-hub')} className="flex flex-col items-center gap-1 text-teacherBlue">
                        <BookOpenCheck size={18} />
                        <span className="text-[9px] font-bold uppercase">Manage</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('accessibility')} className="flex flex-col items-center gap-1 text-slate-400">
                        <Key size={18} />
                        <span className="text-[9px] font-bold uppercase">Access</span>
                    </button>
                    <button onClick={() => {
                        if (onLogout) {
                            const confirmLogout = window.confirm("Are you sure you want to sign out?");
                            if (confirmLogout) {
                                onLogout();
                            }
                        }
                    }} className="flex flex-col items-center gap-1 text-red-500">
                        <LogOut size={18} />
                        <span className="text-[9px] font-bold uppercase">Exit</span>
                    </button>
                </footer>
            </div>
        );
    };

    const handleSubjectClick = async (sub: {name: string, score: number, icon: React.ReactNode}) => {
        setSelectedAnalyticsSubject(sub);
        setInsightLoading(true);
        setAnalyticsInsight('');
        
        try {
             const prompt = `
                Role: Academic Coach for a Grade ${user.currentGrade} student.
                Subject: ${sub.name}
                Current Mastery: ${sub.score}%
                
                Task: Provide a 2-sentence insight.
                1. One sentence analyzing performance (Encouraging if low, praising if high).
                2. One specific, fun study action item for this subject.
                
                Output plain text only.
            `;
            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                organizationId: user.organization_id
            });
            setAnalyticsInsight(response.text || "Keep practicing! Consistency is key.");
        } catch (e) {
            setAnalyticsInsight("Unable to load insights. Try again later.");
        } finally {
            setInsightLoading(false);
        }
    };

    function RenderMyDay() {
        const isTeacher = user?.role === 'teacher';
        return (
            <div className="flex flex-col h-full bg-[#f0f9ff] dark:bg-[#1a1d24] animate-in slide-in-from-right-4 duration-300">
                <header className="shrink-0 flex items-center gap-4 px-6 py-6">
                    <button onClick={() => setSubView('overview')} className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm transition-all text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        My Day
                    </h2>
                </header>
                <div className="flex-1 overflow-hidden px-4 pb-4">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm h-full overflow-hidden border border-slate-100 dark:border-slate-700">
                        <SmartScheduler variant="student" />
                    </div>
                </div>
            </div>
        );
    }

    function RenderMyStars() {
        const subjects = useMemo(() => {
            const baseSubjects = [
                { name: 'Mathematics', score: 0, icon: <Calculator size={14} />, color: '#3b82f6', keywords: ['math', 'num', 'calc'] },
                { name: 'Science', score: 0, icon: <Leaf size={14} />, color: '#10b981', keywords: ['sci', 'bio', 'phys'] },
                { name: 'English', score: 0, icon: <BookOpen size={14} />, color: '#f59e0b', keywords: ['eng', 'lit', 'read'] },
                { name: 'Sesotho', score: 0, icon: <Mic size={14} />, color: '#ef4444', keywords: ['ses', 'lin'] }
            ];

            if (user.isDemo && recentActivity.length === 0) {
                // Fallback for demo with no activity yet
                return [
                    { ...baseSubjects[0], score: 85 },
                    { ...baseSubjects[1], score: 92 },
                    { ...baseSubjects[2], score: 78 },
                    { ...baseSubjects[3], score: 88 }
                ];
            }

            // Calculate scores from recentActivity
            return baseSubjects.map(s => {
                const subjectLogs = recentActivity.filter(log => 
                    s.keywords.some(k => log.itemTitle?.toLowerCase().includes(k) || log.topicId?.toLowerCase().includes(k))
                );
                
                if (subjectLogs.length > 0) {
                    const totalScore = subjectLogs.reduce((acc, curr) => acc + (curr.score / curr.total), 0);
                    return { ...s, score: Math.round((totalScore / subjectLogs.length) * 100) };
                }
                return s;
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [recentActivity, user.isDemo]);

        const chartData = subjects.map(s => ({ name: s.name.substring(0, 4), score: s.score, full: 100 }));
        
        const trendData = [
            { week: 'W1', score: 65 },
            { week: 'W2', score: 72 },
            { week: 'W3', score: 68 },
            { week: 'W4', score: 82 },
            { week: 'W5', score: 85 },
        ];

        return (
            <div className="flex flex-col h-full bg-[#f0f9ff] dark:bg-[#1a1d24] animate-in slide-in-from-right-4 duration-300">
                <header className="shrink-0 flex items-center gap-4 px-6 py-6">
                    <button onClick={() => setSubView('overview')} className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm transition-all text-slate-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">My Stars</h2>
                </header>

                <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6">
                    {/* Mastery Chart */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Subject Power</h3>
                            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                <TrendingUp size={12} /> +12% Power Up
                            </div>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }} />
                                    <Tooltip 
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={32}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={subjects[index].color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Subject Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {subjects.map((sub, i) => (
                            <button 
                                key={i}
                                onClick={() => handleSubjectClick(sub)}
                                className="bg-white dark:bg-slate-800 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm text-left hover:scale-[1.02] transition-all active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                                        {sub.icon}
                                    </div>
                                    <span className="text-xs font-black text-slate-500 truncate uppercase tracking-wider">{sub.name}</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">{sub.score}%</span>
                                    <div className="flex gap-0.5">
                                        {[1,2,3].map(star => (
                                            <Star key={star} size={12} className={star <= Math.round(sub.score / 33) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                        ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* AI Insight Modal/Section */}
                    {selectedAnalyticsSubject && (
                        <div className="bg-gradient-to-br from-teacherBlue to-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={20} className="text-yellow-300" />
                                    <h4 className="text-sm font-black uppercase tracking-widest">Coach Says</h4>
                                </div>
                                <button onClick={() => setSelectedAnalyticsSubject(null)} className="text-blue-200 hover:text-white bg-white/10 p-1 rounded-full">
                                    <X size={16} />
                                </button>
                            </div>
                            <p className="text-xs font-bold mb-2 opacity-80 uppercase tracking-wider">{selectedAnalyticsSubject.name} Tips</p>
                            {insightLoading ? (
                                <div className="flex items-center gap-3 py-4">
                                    <Loader2 size={20} className="animate-spin" />
                                    <span className="text-sm font-bold">Thinking...</span>
                                </div>
                            ) : (
                                <p className="text-sm leading-relaxed font-medium">{analyticsInsight}</p>
                            )}
                        </div>
                    )}

                    {/* My History (Recent Activity) */}
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">My History</h3>
                            <History size={16} className="text-slate-300" />
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-700">
                            {recentActivity.slice(0, 5).map((act, i) => (
                                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                    <div className={`size-10 rounded-2xl flex items-center justify-center shrink-0 ${act.score / act.total > 0.8 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                        <Trophy size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">{act.itemTitle}</p>
                                        <p className="text-xs text-slate-400 font-bold">{new Date(act.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-slate-900 dark:text-white">{Math.round((act.score / act.total) * 100)}%</p>
                                        <div className="flex justify-end">
                                            {[1,2,3].map(s => (
                                                <Star key={s} size={8} className={s <= Math.round((act.score / act.total) * 3) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recentActivity.length === 0 && (
                                <div className="p-8 text-center">
                                    <p className="text-sm text-slate-400 font-bold">No history yet. Start learning!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
         <div className="h-full w-full flex flex-col bg-[#f0f9ff] dark:bg-[#1a1d24]">
            {subView === 'overview' && <RenderStudentDesk />}
            {subView === 'planner' && <RenderMyDay />}
            {subView === 'analytics' && <RenderMyStars />}
            {subView === 'revision' && <RenderRevisionGame />}
            {subView === 'voice' && (
                <VoiceAssistant 
                    user={user} 
                    onBack={() => setSubView('overview')}
                    onNavigate={(v) => { if(onNavigate) onNavigate(v); }}
                />
            )}

            {/* Join Class Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] w-full max-w-sm p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-teacherBlue flex items-center justify-center">
                                <Rocket size={32} />
                            </div>
                            <button onClick={() => setShowJoinModal(false)} className="p-2 text-gray-300 hover:text-gray-500"><X size={24} /></button>
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Join a Class</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed mb-6 font-medium">Enter the 6-digit code your teacher gave you to join their classroom.</p>

                        <div className="space-y-4">
                            <input 
                                type="text"
                                placeholder="e.g. MATH8-XYZ"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-4 text-center text-xl font-black tracking-widest focus:ring-2 focus:ring-teacherBlue outline-none uppercase"
                            />
                        </div>

                        <button 
                            onClick={handleJoinClass}
                            disabled={isJoining}
                            className="w-full mt-8 bg-teacherBlue text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {isJoining ? <Loader2 size={20} className="animate-spin" /> : "Join Classroom"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentHub;
