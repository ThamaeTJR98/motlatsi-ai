
import React, { useState, useEffect, useCallback } from 'react';
import { UserState, Topic, StudentNotification, GradeRecord } from '../types';
import { allGrades } from '../curriculum';
import { useLearningEngine } from '../contexts/LearningEngineContext';
import { useVoiceAccess } from '../contexts/VoiceAccessContext';
import { useToast } from '../contexts/ToastContext';
import { 
    PlayCircle, Flame, Layers, BarChart3, Bell, 
    Swords, ArrowRight, BookOpenCheck, 
    Calendar, Mic, X, EyeOff, Zap, Plus, Info, ChevronRight
} from 'lucide-react';

interface StudentDashboardProps {
    user: UserState;
    onTopicSelect: (topic: Topic, targetView?: string) => void;
    onLogout: () => void;
    onNavigate: (view: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onTopicSelect, onLogout, onNavigate }) => {
    const { schedule, recentActivity } = useLearningEngine();
    const { toggleBlindMode } = useVoiceAccess(); 
    const { addToast } = useToast();
    
    const [showNotifications, setShowNotifications] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [classCode, setClassCode] = useState('');
    
    // Derived State (Memoized)
    const weeklyGoal = React.useMemo(() => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

        const weeklyCompleted = recentActivity.filter((l: GradeRecord) => {
            const d = new Date(l.date);
            return d >= startOfWeek && d <= endOfWeek;
        });

        const target = 5; // Weekly goal
        const progress = (weeklyCompleted.length / target) * 100;
        return Math.min(100, Math.round(progress));
    }, [recentActivity]);

    const [notifications, setNotifications] = useState<StudentNotification[]>(() => {
        if (user.isDemo) {
            const allNotes = JSON.parse(localStorage.getItem('motlatsi_notifications') || '[]');
            const myNotes = allNotes.filter((n: any) => n.studentId === user.id);
            return myNotes.reverse();
        }
        return [];
    });

    const { streak, xp, level } = React.useMemo(() => {
        const dates = [...new Set(recentActivity.map((a: GradeRecord) => new Date(a.date).toDateString()))].sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());
        const calculatedStreak = dates.length > 0 ? Math.min(dates.length, 5) : 0; 
        
        let totalXp = 0;
        recentActivity.forEach(a => {
            totalXp += Math.round((a.score / a.total) * 100);
        });
        
        return {
            streak: calculatedStreak,
            xp: totalXp,
            level: Math.floor(totalXp / 500) + 1
        };
    }, [recentActivity]);

    const nextTopic = React.useMemo(() => {
        const gradeStr = user.currentGrade.toString();
        const gradeCurriculum = allGrades.find(g => g.grade === gradeStr || g.grade === `Grade ${gradeStr}`);
        
        if (gradeCurriculum) {
            // Prioritize Math and Science subjects for the "Up Next" demo
            const priority = ['Mathematics', 'Science', 'Numeracy', 'Scientific and Technological', 'Numerical and Mathematical'];
            const sortedSubjects = [...gradeCurriculum.subjects].sort((a, b) => {
                const aIndex = priority.findIndex(p => a.name.includes(p));
                const bIndex = priority.findIndex(p => b.name.includes(p));
                if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;
                return 0;
            });

            const allTopics: Topic[] = [];
            sortedSubjects.forEach(sub => {
                allTopics.push(...sub.topics);
            });

            // Find the first uncompleted topic in the prioritized list
            const next = allTopics.find(t => !user.completedTopics.includes(t.id));
            
            if (next) return next;
            if (allTopics.length > 0) return allTopics[0];
        }
        return null;
    }, [user.currentGrade, user.completedTopics]);

    const handleJoinClass = () => {
        if (!classCode.startsWith('M-')) {
            addToast("Invalid code format. Codes start with 'M-'", "error");
            return;
        }

        // Simulated Join Logic
        // In the demo, codes are M-[TEACHER_NAME_3_CHARS][GRADE][SUBJECT_3_CHARS]
        // We look for a teacher who could have this code
        let allUsers: any[] = [];
        if (user.isDemo) {
            allUsers = JSON.parse(localStorage.getItem('motlatsi_admin_users') || '[]');
        }
        const teacherPart = classCode.substring(2, 5);
        
        const targetTeacher = allUsers.find((u: any) => 
            u.role === 'Teacher' && 
            u.name.substring(0, 3).toUpperCase() === teacherPart
        );

        if (!targetTeacher) {
            addToast("Class not found. Double check the code.", "error");
            return;
        }

        // Add this student to the teacher's list
        const teacherLinkedIds = targetTeacher.linkedStudentIds || [];
        if (!teacherLinkedIds.includes(user.id)) {
            targetTeacher.linkedStudentIds = [...teacherLinkedIds, user.id];
            localStorage.setItem('motlatsi_admin_users', JSON.stringify(allUsers));
            
            // Also update the teacher's data in the "active" profile if they are currently logged in
            const currentProfile = JSON.parse(localStorage.getItem('motlatsi_user') || '{}');
            if (currentProfile.id === targetTeacher.id) {
                currentProfile.linkedStudentIds = [...(currentProfile.linkedStudentIds || []), user.id];
                localStorage.setItem('motlatsi_user', JSON.stringify(currentProfile));
            }
        }

        addToast("Successfully joined the class!", "success");
        setShowJoinModal(false);
        setClassCode('');
    };

    const markAllRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        // Persist
        if (user.isDemo) {
            const allNotes = JSON.parse(localStorage.getItem('motlatsi_notifications') || '[]');
            const otherNotes = allNotes.filter((n: any) => n.studentId !== user.id);
            localStorage.setItem('motlatsi_notifications', JSON.stringify([...otherNotes, ...updated]));
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] w-full bg-gray-50 dark:bg-[#121212] font-sans px-4 pt-4 pb-20 md:pb-4 overflow-y-auto relative">
            
            {/* 1. Header */}
            <header className="shrink-0 flex justify-between items-center bg-white dark:bg-[#1a1f23] p-3 border-b border-gray-100 dark:border-slate-800 shadow-sm z-30 rounded-2xl mb-3 relative">
                <div className="flex items-center gap-3">
                    <div className="size-9 shrink-0 overflow-hidden rounded-full border-2 border-teacherBlue/20 bg-white shadow-sm relative">
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-teacherBlue font-bold text-xs">
                            {user.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[8px] font-bold px-1 rounded-full border border-white">
                            {level}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-gray-900 dark:text-white text-sm font-bold leading-tight">Hi, {user.name.split(' ')[0]}!</h1>
                        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">{xp} XP Earned</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setShowJoinModal(true)}
                        className="p-2 rounded-full bg-blue-50 text-teacherBlue hover:bg-blue-100 transition-colors mr-1"
                        title="Join a Class"
                    >
                        <Plus size={20} />
                    </button>

                    <button 
                        onClick={toggleBlindMode}
                        className="p-2 rounded-full bg-black text-yellow-300 hover:bg-gray-800 transition-colors shadow-sm mr-1"
                        title="Voice Access Mode"
                    >
                        <EyeOff size={20} />
                    </button>

                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 relative text-gray-500 dark:text-gray-400 transition-colors"
                        >
                            <Bell size={20} />
                            {notifications.some(n => !n.read) && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>}
                        </button>
                    </div>
                </div>

                {/* Notifications Dropdown */}
                {showNotifications && (
                    <div className="absolute top-16 right-0 left-0 mx-4 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 animate-in slide-in-from-top-2 max-h-80 overflow-y-auto">
                        <div className="p-3 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50 sticky top-0">
                            <h3 className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Notifications</h3>
                            <button onClick={markAllRead} className="text-[10px] text-teacherBlue font-bold hover:underline">Mark all read</button>
                        </div>
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-400 text-xs">No notifications.</div>
                        ) : (
                            notifications.map((note, i) => (
                                <div key={i} className={`p-3 border-b border-gray-50 dark:border-slate-700 last:border-0 ${!note.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                                    <div className="flex gap-2">
                                        <div className={`mt-0.5 size-2 rounded-full shrink-0 ${!note.read ? 'bg-teacherBlue' : 'bg-gray-300'}`}></div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{note.title}</p>
                                            <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5 leading-snug">{note.message}</p>
                                            <p className="text-[9px] text-slate-400 mt-1">{new Date(note.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </header>

            {/* 2. Compact Stats Pill - Clickable */}
            <section 
                onClick={() => onNavigate('student-hub')}
                className="shrink-0 bg-white dark:bg-slate-800 rounded-2xl p-2.5 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-3 mb-3 cursor-pointer hover:border-teacherBlue/30 dark:hover:border-blue-900 transition-all active:scale-[0.99] group"
            >
                <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-full text-teacherBlue shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 size={16} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Planner Goal</p>
                        <p className="text-[10px] font-bold text-teacherBlue">{weeklyGoal}%</p>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-teacherBlue rounded-full transition-all duration-1000" style={{ width: `${weeklyGoal}%` }}></div>
                    </div>
                </div>
                <div className="bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 border border-orange-100">
                    <Flame size={12} fill="currentColor" /> {streak}d
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-teacherBlue transition-colors -ml-1" />
            </section>

            {/* 3. Hero Card */}
            <section className="flex-1 min-h-[120px] mb-3 relative group overflow-hidden rounded-3xl shadow-lg bg-gray-900 border border-white/10 cursor-pointer" onClick={() => nextTopic && onTopicSelect(nextTopic)}>
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                    <span className="inline-flex items-center gap-1 w-fit bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 mb-2">
                        <PlayCircle size={10} fill="currentColor" /> Up Next
                    </span>
                    <h2 className="text-white text-lg md:text-xl font-bold leading-tight line-clamp-1 mb-1">
                        {nextTopic ? nextTopic.title : "Start Journey"}
                    </h2>
                    <p className="text-gray-300 text-[10px] line-clamp-1 mb-3 opacity-90">
                        {nextTopic ? nextTopic.description : "Select a topic to begin learning."}
                    </p>
                    <button className="w-full bg-teacherBlue hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                        Start Lesson <ArrowRight size={14} />
                    </button>
                </div>
            </section>

            {/* 4. Grid */}
            <section className="shrink-0 grid grid-cols-2 gap-2" onClick={() => setShowNotifications(false)}>
                <DashboardCard 
                    title="Learn Your Way" 
                    subtitle="Choice Hub" 
                    icon={<Layers size={18} />} 
                    color="blue"
                    onClick={() => nextTopic && onTopicSelect(nextTopic)}
                />
                <DashboardCard 
                    title="Voice Assistant" 
                    subtitle="Ask questions" 
                    icon={<Mic size={18} />} 
                    color="purple"
                    onClick={() => onNavigate('student-voice')}
                />
                <DashboardCard 
                    title="Battle" 
                    subtitle="Challenge Peers" 
                    icon={<Swords size={18} />} 
                    color="orange"
                    onClick={() => onNavigate('battle')}
                />
                <DashboardCard 
                    title="Library" 
                    subtitle="Lessons & Cards" 
                    icon={<BookOpenCheck size={18} />} 
                    color="green"
                    onClick={() => onNavigate('student-library')}
                />
            </section>

            {/* Join Class Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[2rem] w-full max-w-sm p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Plus size={100} className="text-teacherBlue" />
                        </div>
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-14 rounded-2xl bg-blue-50 text-teacherBlue flex items-center justify-center">
                                <Plus size={32} />
                            </div>
                            <button onClick={() => setShowJoinModal(false)} className="p-2 text-gray-300 hover:text-gray-500"><X size={24} /></button>
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 mb-2">Join a Class</h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium">Enter the 8-character Class Code provided by your teacher.</p>

                        <div className="space-y-4">
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 group-focus-within:text-teacherBlue transition-colors">#</span>
                                <input 
                                    type="text" 
                                    placeholder="M-XXXXXX" 
                                    className="w-full pl-8 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-teacherBlue focus:ring-0 outline-none transition-all text-sm font-black uppercase tracking-widest bg-gray-50"
                                    value={classCode}
                                    onChange={e => setClassCode(e.target.value.toUpperCase())}
                                />
                            </div>
                            
                            <div className="bg-blue-50/50 rounded-xl p-3 flex gap-3 border border-blue-100/50">
                                <Info size={16} className="text-teacherBlue shrink-0 mt-0.5" />
                                <p className="text-[10px] text-blue-700 leading-tight">Joining a class allows your teacher to see your progress and send you targeted recovery lessons.</p>
                            </div>

                            <button 
                                onClick={handleJoinClass}
                                className="w-full bg-teacherBlue text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all"
                            >
                                <span>Join Class</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardCard = ({ title, subtitle, icon, color, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-center items-start hover:border-${color}-200 transition-colors active:scale-[0.98] h-20 group`}
    >
        <div className="flex items-center gap-2 mb-1">
            <div className={`bg-${color}-50 dark:bg-${color}-900/30 p-1.5 rounded-lg text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <p className="font-bold text-xs text-gray-900 dark:text-white leading-none text-left">{title}</p>
        </div>
        <p className="text-[10px] text-gray-500 pl-1">{subtitle}</p>
    </button>
);

export default StudentDashboard;
