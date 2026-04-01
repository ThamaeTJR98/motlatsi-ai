
import React, { useState } from 'react';
import { GradeRecord } from '../../types';
import { ArrowLeft, CheckCircle, ChevronDown, Gamepad2, User, CalendarDays, Flame, Sparkles, Headphones } from 'lucide-react';

interface ParentActivityProps {
    child: any | null;
    activityLog: GradeRecord[];
    onBack: () => void;
}

const ParentActivity: React.FC<ParentActivityProps> = ({ child, activityLog, onBack }) => {
    // Track which card is expanded
    const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
    const [focusedDayIndex, setFocusedDayIndex] = useState<number>(6); // Default to Sunday (last day)

    if (!child) return (
        <div className="flex flex-col h-full bg-[#f8f7f6] dark:bg-[#221c10]">
            <div className="px-5 pt-5 pb-3 bg-white dark:bg-[#1c1810] border-b border-black/5 dark:border-white/5 flex items-center justify-between shrink-0 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={18} className="text-gray-900 dark:text-white" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold font-display leading-tight text-[#181611] dark:text-white">
                            Activity
                        </h1>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                        Overview
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="size-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <User size={40} />
                </div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">No Student Selected</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-[200px]">Link a student profile in the Home tab to see their weekly activity breakdown.</p>
                <button onClick={onBack} className="text-primary font-bold text-sm hover:underline">Go to Home Hub</button>
            </div>
        </div>
    );

    // Mock Data for Interactive Graph
    const graphData = [
        { day: 'M', val: 40, subjects: 'Math', mins: 25 },
        { day: 'T', val: 65, subjects: 'Science', mins: 45 },
        { day: 'W', val: 90, subjects: 'Battle', mins: 60 },
        { day: 'T', val: 55, subjects: 'Sesotho', mins: 35 },
        { day: 'F', val: 80, subjects: 'English', mins: 50 },
        { day: 'S', val: 30, subjects: 'Review', mins: 20 },
        { day: 'S', val: 20, subjects: 'Reading', mins: 15 }
    ];

    const currentDayData = graphData[focusedDayIndex];

    const toggleExpand = (id: string) => {
        setExpandedLogId(expandedLogId === id ? null : id);
    };

    return (
        <div className="flex flex-col h-full bg-[#f8f7f6] dark:bg-[#101010]">
            <div className="px-5 pt-5 pb-3 bg-white dark:bg-[#1c1810] border-b border-black/5 dark:border-white/5 flex items-center justify-between shrink-0 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={18} className="text-gray-900 dark:text-white" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold font-display leading-tight text-[#181611] dark:text-white">
                            Activity
                        </h1>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                        {child ? child.name : 'Overview'}
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                <div className="px-4 py-3 space-y-4">
                    
                    {/* Compact Interactive Consistency Card */}
                    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5">
                        
                        {/* Compact Header Row */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-lg shrink-0">
                                    <CalendarDays size={14} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none mb-0.5">Study Time</h3>
                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-none">
                                        {currentDayData.mins}m <span className="text-gray-400 font-normal text-xs">• {currentDayData.subjects}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5">
                                <Flame size={12} className="text-orange-500 fill-orange-500" />
                                <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">4 Day Streak</span>
                            </div>
                        </div>
                        
                        {/* Compact Interactive Bars */}
                        <div className="flex items-end justify-between h-16 gap-1.5 px-1">
                            {graphData.map((data, i) => {
                                const isActive = focusedDayIndex === i;
                                return (
                                    <div 
                                        key={i} 
                                        onClick={() => setFocusedDayIndex(i)}
                                        className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer h-full justify-end"
                                    >
                                        <div className="relative w-full h-full flex items-end justify-center">
                                            <div 
                                                className={`w-2.5 sm:w-3 rounded-t-sm transition-all duration-500 ease-out 
                                                    ${isActive ? 'bg-primary shadow-[0_0_10px_rgba(236,164,19,0.4)]' : 'bg-gray-100 dark:bg-white/10 group-hover:bg-primary/40'}
                                                `}
                                                style={{ height: `${data.val}%`, minHeight: '4px' }}
                                            ></div>
                                        </div>
                                        <span className={`text-[8px] font-bold transition-colors ${isActive ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`}>
                                            {data.day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Actions List */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">History</h4>
                            <span className="text-[9px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-gray-500 font-bold">{activityLog.length}</span>
                        </div>
                        
                        {activityLog.length === 0 ? (
                            <div className="text-center py-6 bg-white dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-xs text-gray-400 font-medium">No recent activity.</p>
                            </div>
                        ) : (
                            activityLog.slice(0, 8).map((log) => {
                                const scorePct = log.score / log.total;
                                let type = 'mastered';
                                if (log.type === 'quiz' && scorePct < 0.6) type = 'lost';
                                if (log.itemTitle.toLowerCase().includes('audio')) type = 'audio';

                                const config = {
                                    mastered: {
                                        bg: 'bg-emerald-50 dark:bg-emerald-900/30',
                                        text: 'text-emerald-700 dark:text-emerald-500',
                                        icon: <CheckCircle size={14} />,
                                        label: 'Done'
                                    },
                                    lost: {
                                        bg: 'bg-rose-50 dark:bg-rose-900/30',
                                        text: 'text-rose-700 dark:text-rose-500',
                                        icon: <Gamepad2 size={14} />,
                                        label: 'Try' 
                                    },
                                    audio: {
                                        bg: 'bg-blue-50 dark:bg-blue-900/30',
                                        text: 'text-blue-700 dark:text-blue-500',
                                        icon: <Headphones size={14} />,
                                        label: 'Heard'
                                    }
                                };
                                
                                const style = config[type as keyof typeof config] || config.mastered;
                                const isExpanded = expandedLogId === log.id;

                                return (
                                    <div 
                                        key={log.id} 
                                        className={`bg-white dark:bg-[#1c1c1e] rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-primary/30 shadow-sm' : 'border-gray-100 dark:border-white/5'}`}
                                    >
                                        <div 
                                            className="p-3 flex items-center justify-between cursor-pointer active:bg-gray-50 dark:active:bg-white/5 transition-colors"
                                            onClick={() => toggleExpand(log.id)}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                                                    {style.icon}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-bold text-[#181611] dark:text-white truncate leading-tight">
                                                        {log.itemTitle}
                                                    </p>
                                                    <p className="text-[9px] font-medium text-gray-400 mt-0.5">
                                                        {new Date(log.date).toLocaleDateString([], {month:'short', day:'numeric'})}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 shrink-0">
                                                {log.type === 'quiz' && (
                                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${scorePct >= 0.6 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'}`}>
                                                        {Math.round(scorePct * 100)}%
                                                    </span>
                                                )}
                                                <ChevronDown size={14} className={`text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                        
                                        {/* Retractable Content */}
                                        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-3 pb-3 pt-0">
                                                <div className="mt-1 pt-2 border-t border-gray-50 dark:border-white/5">
                                                    <div className="flex gap-2">
                                                        <Sparkles size={12} className="text-primary shrink-0 mt-0.5" />
                                                        <p className="text-[10px] leading-relaxed text-gray-600 dark:text-gray-300">
                                                            {type === 'mastered' 
                                                                ? `${child.name} has mastered this! Ask them to teach you the key concept.`
                                                                : `${child.name} struggled here. A quick 5-min review is scheduled for tomorrow.`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentActivity;
