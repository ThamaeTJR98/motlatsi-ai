
import React from 'react';
import { UserState } from '../../types';
import { Plus, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import MotlatsiLogo from '../MotlatsiLogo';

interface ParentHomeProps {
    user: UserState;
    children: any[];
    onLinkChild: () => void;
    onSelectChild: (child: any) => void;
}

const ParentHome: React.FC<ParentHomeProps> = ({ user, children, onLinkChild, onSelectChild }) => {
    return (
        <div className="flex flex-col h-full bg-[#F9F9FB] dark:bg-[#0f0d09]">
            <header className="px-6 pt-6 pb-4 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
                <div className="flex justify-between items-center">
                    <div className="space-y-0">
                        <p className="text-[#8E8E93] text-[11px] font-bold uppercase tracking-wider">Parent Hub</p>
                        <h1 className="text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">Lumela, {user.name.split(' ')[0]}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-white/10 bg-white flex items-center justify-center text-gray-400 font-bold text-sm shadow-sm">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32 space-y-6 no-scrollbar">
                {/* Insight Card */}
                {children.length > 0 && (
                    <div className="relative group bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200/40 dark:border-amber-700/30 shadow-sm">
                        <div className="flex gap-3 items-center">
                            <div className="bg-amber-500/15 p-2 rounded-xl text-amber-600 shrink-0">
                                <AlertCircle size={20} />
                            </div>
                            <div className="pr-6">
                                <p className="text-[#1C1C1E] dark:text-white text-[10px] font-bold uppercase tracking-wider opacity-60">Weekly Insight</p>
                                <p className="text-[#1C1C1E] dark:text-gray-300 text-[13px] leading-tight font-medium mt-0.5">
                                    {children[0].name} needs support with fractions this week.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8E8E93]">My Children</h2>
                    </div>

                    {children.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-700">
                            <p className="text-gray-400 text-sm">No children linked yet.</p>
                        </div>
                    ) : (
                        children.map((child) => {
                            // Calculate Mock Progress for Visuals
                            const logs = JSON.parse(localStorage.getItem('motlatsi_activity_log') || '[]');
                            const cLogs = logs.filter((l: any) => l.studentId === child.id.toString());
                            const avgMastery = cLogs.length > 0 
                                ? Math.round(cLogs.reduce((acc: number, curr: any) => acc + (curr.score/curr.total)*100, 0) / cLogs.length)
                                : 42;
                            const isOnTrack = avgMastery > 60;
                            const circumference = 2 * Math.PI * 34;
                            const offset = circumference - (avgMastery / 100) * circumference;

                            return (
                                <div 
                                    key={child.id} 
                                    onClick={() => onSelectChild(child)}
                                    className="bg-white dark:bg-[#1C1C1E] p-4 rounded-[2rem] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                                >
                                    <div className="relative size-[76px] flex items-center justify-center shrink-0">
                                        <svg className="absolute inset-0 size-[76px] -rotate-90">
                                            <circle className="text-gray-100 dark:text-white/5" cx="38" cy="38" fill="transparent" r="34" stroke="currentColor" strokeWidth="4"></circle>
                                            <circle className={`${isOnTrack ? 'text-green-500' : 'text-primary'}`} cx="38" cy="38" fill="transparent" r="34" stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="5"></circle>
                                        </svg>
                                        <div className="size-13 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white dark:ring-black z-10 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {child.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h3 className="font-bold text-[#1C1C1E] dark:text-white text-lg leading-tight">{child.name}</h3>
                                                <div className="flex flex-col mt-0.5">
                                                    <span className="text-[#8E8E93] text-[10px] font-bold truncate">Grade {child.currentGrade}</span>
                                                    {child.school && <span className="text-gray-400 text-[9px] truncate">{child.school}</span>}
                                                </div>
                                            </div>
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ring-1 ring-inset ${isOnTrack ? 'bg-[#E7F7EF] text-[#047857] ring-emerald-600/10' : 'bg-[#FEE2E2] text-[#B91C1C] ring-red-600/10'}`}>
                                                {isOnTrack ? 'On Track' : 'Review'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`font-bold text-[11px] ${isOnTrack ? 'text-green-600' : 'text-primary'}`}>{avgMastery}% Mastery</span>
                                            <ChevronRight size={14} className="text-gray-300 ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <button 
                        onClick={onLinkChild}
                        className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2rem] flex items-center justify-center gap-2 text-[#8E8E93] font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm"
                    >
                        <Plus size={18} />
                        <span>Link another child</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentHome;
