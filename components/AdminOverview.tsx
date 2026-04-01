
import React, { useEffect, useState } from 'react';
import { 
    Activity, Bell, CheckCircle, AlertTriangle, 
    FileText, ChevronRight, TrendingUp, ChevronDown, ChevronUp, X,
    School, Copy, Users, Shield, Key
} from 'lucide-react';
import { GradeRecord, UserState } from '../types';
import { supabase } from '../lib/supabase';
import MotlatsiLogo from './MotlatsiLogo';
import { allGrades } from '../curriculum';
import { useLearningEngine } from '../contexts/LearningEngineContext';
import { useToast } from '../contexts/ToastContext';

interface AdminOverviewProps {
    user: UserState;
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

interface SchoolKeys {
    adminCode: string;
    teacherCode: string;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ user, onLogout, onNavigate }) => {
    const { termConfig } = useLearningEngine();
    const { addToast } = useToast();
    
    const [stats, setStats] = useState({ 
        pacer: 0, 
        coverage: 0, 
        expected: 0 
    });
    
    const [teachers, setTeachers] = useState<any[]>([]);
    const [logs, setLogs] = useState<GradeRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [schoolName, setSchoolName] = useState('');
    const [adminName, setAdminName] = useState('Admin');
    const [showPacerModal, setShowPacerModal] = useState(false);
    const [schoolKeys, setSchoolKeys] = useState<SchoolKeys | null>(null);

    // State for retractable sections
    const [expandedSections, setExpandedSections] = useState({
        api: false,
        connect: true,
        pacer: true,
        teachers: true,
        logs: true
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            
            const adminSchool = user.school || '';
            setAdminName(user.name || 'Admin');
            setSchoolName(adminSchool || 'Unassigned School');

            // --- Retrieve or Generate School Codes ---
            if (user.isDemo) {
                const registry = JSON.parse(localStorage.getItem('motlatsi_school_registry') || '[]');
                const existingKeys = registry.find((s: any) => s.name === adminSchool);

                if (existingKeys) {
                    setSchoolKeys({
                        adminCode: existingKeys.adminCode,
                        teacherCode: existingKeys.teacherCode
                    });
                } else if (adminSchool) {
                    // Generate fallback keys for existing/demo schools not in registry
                    const prefix = adminSchool.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X');
                    const rand = Math.floor(1000 + Math.random() * 9000);
                    const newKeys = {
                        id: `sch-${Date.now()}`,
                        name: adminSchool,
                        adminCode: `ADM-${prefix}-${rand}`,
                        teacherCode: `TCH-${prefix}-${rand}`,
                        studentCodePrefix: `STU-${prefix}`,
                        principalName: adminName
                    };
                    // Persist these new keys so they work for login later
                    registry.push(newKeys);
                    localStorage.setItem('motlatsi_school_registry', JSON.stringify(registry));
                    
                    setSchoolKeys({
                        adminCode: newKeys.adminCode,
                        teacherCode: newKeys.teacherCode
                    });
                }
            } else {
                // For real users, we would fetch school keys from Supabase
                // Placeholder for now - we can try to fetch from school_settings if we add columns there
            }
            // -----------------------------------------

            if (!adminSchool) {
                setLoading(false);
                return;
            }

            let allSchoolUsers: any[] = [];
            
            if (user.isDemo) {
                const stored = localStorage.getItem('motlatsi_admin_users');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    allSchoolUsers = parsed.filter((u: any) => u.school === adminSchool);
                }
            } else {
                const { data } = await supabase.from('profiles').select('*').eq('school', adminSchool);
                if (data) {
                    allSchoolUsers = data;
                }
            }

            const students = allSchoolUsers.filter((u: any) => u.role === 'Student' || u.role === 'student');
            
            let totalCurriculumTopicsCount = 0;
            let totalCompletedTopicsCount = 0;

            if (students.length > 0) {
                students.forEach((student: UserState) => {
                    const gradeData = allGrades.find(g => g.grade === student.currentGrade || g.grade === `Grade ${student.currentGrade}`);
                    if (gradeData) {
                        let studentTotalTopics = 0;
                        gradeData.subjects.forEach(subj => {
                            studentTotalTopics += subj.topics.length;
                        });
                        totalCurriculumTopicsCount += studentTotalTopics;
                        totalCompletedTopicsCount += (student.completedTopics?.length || 0);
                    }
                });
            }

            const now = new Date().getTime();
            const start = new Date(termConfig.startDate).getTime();
            const end = new Date(termConfig.endDate).getTime();
            const totalDuration = end - start;
            const elapsed = Math.max(0, now - start);
            const timeProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
            
            const actualCoverage = totalCurriculumTopicsCount > 0 
                ? (totalCompletedTopicsCount / totalCurriculumTopicsCount) * 100 
                : 0;

            const pacerScore = timeProgress > 0 
                ? Math.round((actualCoverage / timeProgress) * 100) 
                : 100;

            setStats({
                pacer: Math.min(100, pacerScore),
                coverage: Math.round(actualCoverage),
                expected: Math.round(timeProgress)
            });

            const teacherList = allSchoolUsers.filter((u: any) => u.role === 'Teacher' || u.role === 'teacher');
            setTeachers(teacherList.map((t: any, idx: number) => ({
                ...t,
                subject: t.subject || 'General',
                pacer: Math.min(100, Math.max(40, pacerScore + (Math.random() * 20 - 10))), 
                status: 'active' 
            })));

            let activityLogs: GradeRecord[] = [];
            if (!user.isDemo) {
                const studentIds = students.map((s: any) => s.id);
                if (studentIds.length > 0) {
                    const { data: logData } = await supabase
                        .from('activity_logs')
                        .select('*')
                        .in('user_id', studentIds)
                        .order('created_at', { ascending: false })
                        .limit(5);
                    
                    if (logData) {
                        activityLogs = logData.map((l: any) => ({
                            id: l.id,
                            studentId: l.user_id,
                            studentName: students.find((s: any) => s.id === l.user_id)?.name || 'Unknown',
                            itemId: l.details?.topic_id || 'unknown',
                            itemTitle: l.details?.topic_id || 'Unknown Topic',
                            score: l.details?.score || 0,
                            total: 100,
                            type: 'quiz',
                            date: l.created_at
                        }));
                    }
                }
            } else {
                activityLogs = JSON.parse(localStorage.getItem('motlatsi_activity_log') || '[]');
            }
            
            setLogs(activityLogs.slice(0, 5));
            
            setLoading(false);
        };

        loadData();
    }, [termConfig, adminName, user.isDemo, user.name, user.school]);

    const copyCode = (code: string, label: string) => {
        navigator.clipboard.writeText(code);
        addToast(`${label} copied to clipboard!`, 'success');
    };

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (stats.pacer / 100) * circumference;

    return (
        <div className="h-full flex flex-col bg-[#f6f6f8] dark:bg-[#101622] font-sans overflow-hidden">
            {/* Top App Bar - Fixed */}
            <header className="shrink-0 bg-white/90 dark:bg-[#101622]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 transition-all z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-[#135bec]/10 p-1.5 rounded-lg text-[#135bec]">
                        <MotlatsiLogo variant="icon" className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold leading-tight text-gray-900 dark:text-white">Admin Overview</h1>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate max-w-[120px]">
                            {schoolName} • {termConfig.name}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                        <Bell size={16} />
                    </button>
                    <button 
                        onClick={() => onNavigate('profile')}
                        className="size-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white dark:ring-gray-800 transition-transform active:scale-95"
                    >
                        {adminName.charAt(0)}
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 max-w-md mx-auto w-full pb-32">
                
                {/* 0. Gemini API Settings */}
                <section>
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
                        <div 
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors select-none"
                            onClick={() => toggleSection('api')}
                        >
                            <div className="flex items-center gap-2">
                                <Key size={16} className="text-amber-500" />
                                <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">AI Quota Settings</h2>
                            </div>
                            {expandedSections.api ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.api ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-4 pt-0 space-y-3">
                                <p className="text-xs text-gray-500 mb-2">
                                    To avoid "Quota Exceeded" errors and use higher limits, connect your paid Google Cloud project key.
                                </p>
                                
                                <button 
                                    onClick={async () => {
                                        // @ts-expect-error - window.aistudio is injected by the platform
                                        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
                                            // @ts-expect-error - window.aistudio is injected by the platform
                                            await window.aistudio.openSelectKey();
                                            addToast("API Key selection opened.", "info");
                                        } else {
                                            addToast("API Key selector is not available.", "error");
                                        }
                                    }}
                                    className="w-full py-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-100 transition-colors"
                                >
                                    <Key size={16} />
                                    Connect Paid API Key
                                </button>
                                
                                <p className="text-[9px] text-gray-400 italic text-center">
                                    Note: The key is stored securely in your browser session.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1. School Connect Section (New) */}
                <section>
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
                        <div 
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors select-none"
                            onClick={() => toggleSection('connect')}
                        >
                            <div className="flex items-center gap-2">
                                <School size={16} className="text-teacherBlue" />
                                <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Connect Staff</h2>
                            </div>
                            {expandedSections.connect ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.connect ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-4 pt-0 space-y-3">
                                <p className="text-xs text-gray-500 mb-2">Share these codes. New staff can join your school instantly by entering them at registration.</p>
                                
                                {schoolKeys ? (
                                    <>
                                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-[9px] font-bold text-teacherBlue uppercase tracking-wider mb-0.5">Teacher Code</p>
                                                <code className="text-sm font-black text-gray-900 dark:text-white font-mono">{schoolKeys.teacherCode}</code>
                                            </div>
                                            <button 
                                                onClick={() => copyCode(schoolKeys.teacherCode, 'Teacher Code')}
                                                className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>

                                        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-lg p-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-0.5">Admin Code</p>
                                                <code className="text-sm font-black text-gray-900 dark:text-white font-mono">{schoolKeys.adminCode}</code>
                                            </div>
                                            <button 
                                                onClick={() => copyCode(schoolKeys.adminCode, 'Admin Code')}
                                                className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-full transition-colors"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-4 text-xs text-gray-400">Loading codes...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Curriculum Pacer Section */}
                <section>
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
                        <div 
                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors select-none"
                            onClick={() => toggleSection('pacer')}
                        >
                            <div className="flex items-center gap-2">
                                <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Curriculum Pacer</h2>
                                {!expandedSections.pacer && (
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${stats.pacer < 80 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                        {stats.pacer}%
                                    </span>
                                )}
                            </div>
                            {expandedSections.pacer ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.pacer ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div 
                                onClick={() => setShowPacerModal(true)}
                                className="p-4 pt-0 flex flex-col items-center text-center cursor-pointer active:scale-[0.99] transition-transform group"
                            >
                                <div className="w-full flex justify-end mb-2">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${stats.pacer < 80 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                        {stats.pacer < 80 ? 'BEHIND' : 'ON TRACK'}
                                    </span>
                                </div>
                                
                                <div className="relative flex items-center justify-center w-28 h-28 mb-3">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                                        <circle 
                                            className="text-gray-100 dark:text-gray-800" 
                                            cx="96" cy="96" r={radius} 
                                            fill="transparent" 
                                            stroke="currentColor" 
                                            strokeWidth="12"
                                        ></circle>
                                        <circle 
                                            className={`${stats.pacer < 80 ? 'text-orange-500' : 'text-[#135bec]'} transition-all duration-1000 ease-out`}
                                            cx="96" cy="96" r={radius} 
                                            fill="transparent" 
                                            stroke="currentColor" 
                                            strokeDasharray={circumference} 
                                            strokeDashoffset={offset} 
                                            strokeLinecap="round" 
                                            strokeWidth="12"
                                        ></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-2xl font-extrabold ${stats.pacer < 80 ? 'text-orange-500' : 'text-[#135bec]'}`}>{stats.pacer}%</span>
                                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Efficiency</span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-gray-600 dark:text-gray-300 max-w-[200px] leading-snug">
                                    Actual coverage vs Expected time target.
                                </p>

                                <div className="mt-3 flex gap-2 w-full pt-3 border-t border-gray-50 dark:border-gray-800">
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Coverage</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{stats.coverage}%</p>
                                    </div>
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Expected</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{stats.expected}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher Status Section */}
                <section>
                    <div 
                        className="flex items-center justify-between mb-2 px-1 cursor-pointer select-none"
                        onClick={() => toggleSection('teachers')}
                    >
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Teacher Status</h3>
                        {expandedSections.teachers ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>
                    
                    <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSections.teachers ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {loading ? (
                            <div className="text-center py-4 text-gray-400 text-xs italic">Loading teacher status...</div>
                        ) : teachers.length === 0 ? (
                            <div className="text-center py-4 text-gray-400 text-xs">No teachers found for this school.</div>
                        ) : (
                            teachers.map((teacher) => (
                                <div 
                                    key={teacher.id} 
                                    onClick={() => onNavigate('admin-users')}
                                    className={`bg-white dark:bg-gray-900 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-teacherBlue/30 transition-all active:scale-[0.98] group`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold text-xs shrink-0">
                                            {teacher.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-xs truncate group-hover:text-teacherBlue transition-colors">{teacher.name}</h4>
                                                <span className={`text-[9px] font-bold ${Math.round(teacher.pacer) < 80 ? 'text-amber-500' : 'text-[#135bec]'}`}>
                                                    {Math.round(teacher.pacer)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate pr-2">Gr {teacher.currentGrade} • {teacher.subject}</p>
                                                <div className="w-16 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shrink-0">
                                                    <div 
                                                        className={`h-full rounded-full ${Math.round(teacher.pacer) < 80 ? 'bg-amber-500' : 'bg-[#135bec]'}`} 
                                                        style={{ width: `${Math.min(100, teacher.pacer)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-gray-300 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {Math.round(teacher.pacer) < 80 && (
                                        <div className="mt-2 p-1.5 rounded bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                                            <AlertTriangle size={10} />
                                            <p className="text-[9px] font-bold">Intervention suggested</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Live Activity Log */}
                <section>
                    <div 
                        className="flex items-center justify-between mb-3 px-1 cursor-pointer select-none"
                        onClick={() => toggleSection('logs')}
                    >
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Activity Feed</h3>
                        {expandedSections.logs ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>

                    <div className={`space-y-3 relative pl-3 overflow-hidden transition-all duration-300 ${expandedSections.logs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {/* Vertical Line */}
                        <div className="absolute left-[18px] top-1 bottom-1 w-px bg-gray-200 dark:bg-gray-800"></div>

                        {logs.length > 0 ? (
                            logs.map((log, i) => (
                                <div key={i} className="relative pl-6 flex flex-col gap-0.5">
                                    <div className={`absolute left-0 top-1 w-4 h-4 rounded-full flex items-center justify-center z-10 ring-4 ring-[#f6f6f8] dark:ring-[#101622] ${
                                        log.type === 'quiz' ? 'bg-[#135bec]' : 'bg-green-500'
                                    }`}>
                                        {log.type === 'quiz' ? <FileText size={8} className="text-white" /> : <CheckCircle size={8} className="text-white" />}
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                                        <p className="text-[10px] font-medium text-gray-900 dark:text-white leading-snug">
                                            <span className="font-bold">{log.studentName}</span> {log.type === 'quiz' ? 'completed' : 'accessed'} <span className="text-[#135bec]">{log.itemTitle}</span>
                                        </p>
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                                            {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-[10px] text-gray-400 pl-6 italic">No recent activity.</div>
                        )}
                    </div>
                </section>
            </div>

            {/* Pacer Modal */}
            {showPacerModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Breakdown</h3>
                            <button onClick={() => setShowPacerModal(false)} className="p-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500"><X size={20} /></button>
                        </div>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                             <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-blue-800 dark:text-blue-300">Term Progress</span>
                                    <span className="text-xs font-bold text-blue-800 dark:text-blue-300">{stats.expected}%</span>
                                </div>
                                <div className="h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600" style={{width: `${stats.expected}%`}}></div>
                                </div>
                                <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-2">Target based on date: {new Date().toLocaleDateString()}</p>
                             </div>

                             <div>
                                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Grades Overview</h4>
                                 <div className="space-y-2">
                                     {teachers.length > 0 ? teachers.map((t, i) => (
                                         <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-700">
                                             <div>
                                                 <p className="text-xs font-bold text-gray-800 dark:text-white">Grade {t.currentGrade}</p>
                                                 <p className="text-[10px] text-gray-500">{t.subject}</p>
                                             </div>
                                             <div className="text-right">
                                                 <p className={`text-xs font-bold ${t.pacer < stats.expected ? 'text-red-500' : 'text-green-500'}`}>{t.pacer}%</p>
                                                 <p className="text-[8px] text-gray-400 uppercase">Covered</p>
                                             </div>
                                         </div>
                                     )) : (
                                         <p className="text-xs text-gray-400 italic text-center">No class data.</p>
                                     )}
                                 </div>
                             </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                            <button onClick={() => { setShowPacerModal(false); onNavigate('admin-curriculum'); }} className="w-full py-3 bg-teacherBlue text-white rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
                                Manage Curriculum
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOverview;
