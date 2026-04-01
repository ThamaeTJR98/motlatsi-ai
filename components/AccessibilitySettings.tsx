
import React from 'react';
import { AccessibilitySettings as SettingsType } from '../types';
import { ArrowLeft, Check, Type, Sun, MessageSquare, BookOpen, WifiOff, User, LogOut, ChevronRight } from 'lucide-react';

interface Props {
    settings: SettingsType;
    onUpdate: (s: SettingsType) => void;
    onBack: () => void;
    onNavigate: (view: string) => void;
    onLogout: () => void;
}

const AccessibilitySettingsView: React.FC<Props> = ({ settings, onUpdate, onBack, onNavigate, onLogout }) => {
    const toggle = (key: keyof SettingsType) => {
        onUpdate({ ...settings, [key]: !settings[key] });
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-slate-950 overflow-hidden">
            {/* Compact Header */}
            <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Access & Settings</h1>
                </div>
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                    <User size={14} />
                </div>
            </header>

            {/* Main Content - Grid Layout for Compactness */}
            <main className="flex-1 p-3 flex flex-col gap-3 min-h-0">
                
                {/* Toggles Grid - 2 Columns */}
                <div className="grid grid-cols-2 gap-2 shrink-0">
                    <CompactToggle 
                        icon={<WifiOff size={16} />}
                        label="Data Saver"
                        active={settings.dataSaver}
                        onToggle={() => toggle('dataSaver')}
                        color="green"
                    />
                    <CompactToggle 
                        icon={<Type size={16} />}
                        label="Dyslexic Font"
                        active={settings.dyslexicFont}
                        onToggle={() => toggle('dyslexicFont')}
                        color="purple"
                    />
                    <CompactToggle 
                        icon={<Sun size={16} />}
                        label="High Contrast"
                        active={settings.highContrast}
                        onToggle={() => toggle('highContrast')}
                        color="orange"
                    />
                    <CompactToggle 
                        icon={<BookOpen size={16} />}
                        label="Simple Text"
                        active={settings.simplifiedLanguage}
                        onToggle={() => toggle('simplifiedLanguage')}
                        color="blue"
                    />
                </div>

                {/* Full Width Toggle */}
                <div 
                    onClick={() => toggle('autoTranscript')}
                    className={`shrink-0 flex items-center justify-between p-3 rounded-xl border transition-all active:scale-[0.99] ${settings.autoTranscript ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${settings.autoTranscript ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>
                            <MessageSquare size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-xs text-gray-900 dark:text-white">Auto Transcript</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">Show captions for audio</p>
                        </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.autoTranscript ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-slate-700'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${settings.autoTranscript ? 'left-5.5' : 'left-0.5'}`}></div>
                    </div>
                </div>

                {/* Account Actions - Compact List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-1 flex flex-col">
                    <button 
                        onClick={() => onNavigate('profile')}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 dark:bg-slate-800 p-1.5 rounded-lg text-gray-600 dark:text-gray-300">
                                <User size={16} />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">Edit Profile</span>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
                    </button>
                    
                    <div className="h-px bg-gray-50 dark:bg-slate-800 mx-3"></div>

                    <button 
                        onClick={onLogout}
                        className="flex items-center justify-between p-3 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-red-50 dark:bg-red-900/20 p-1.5 rounded-lg text-red-500">
                                <LogOut size={16} />
                            </div>
                            <span className="text-xs font-bold text-red-500">Sign Out</span>
                        </div>
                    </button>
                </div>

                {/* Save Button - Stays at bottom */}
                <button 
                    onClick={onBack} 
                    className="shrink-0 w-full py-3.5 bg-teacherBlue text-white rounded-xl font-black text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Check size={16} strokeWidth={3} />
                    <span>Save & Close</span>
                </button>
            </main>
        </div>
    );
};

const CompactToggle = ({ icon, label, active, onToggle, color }: any) => {
    const colorStyles: any = {
        green: active ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' : '',
        purple: active ? 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400' : '',
        orange: active ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400' : '',
        blue: active ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' : '',
    };

    const activeStyle = colorStyles[color] || '';
    const inactiveStyle = 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-400';

    return (
        <button 
            onClick={onToggle}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all active:scale-[0.96] h-24 ${active ? activeStyle : inactiveStyle}`}
        >
            <div className={`p-2 rounded-full ${active ? 'bg-white/60 dark:bg-black/20' : 'bg-gray-100 dark:bg-slate-800'}`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-center leading-tight">{label}</span>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
        </button>
    );
};

export default AccessibilitySettingsView;
