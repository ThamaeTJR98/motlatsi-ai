
import React, { useState } from 'react';
import { UserState } from '../../types';
import { LogOut, User, Mail, Settings, Bell, Shield, HelpCircle, ChevronRight, ArrowLeft, Save, Globe, Moon, Lock, Sparkles, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';
import MotlatsiLogo from '../MotlatsiLogo';
import { useToast } from '../../contexts/ToastContext';
import SupportAgent from '../SupportAgent';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ParentProfileProps {
    user: UserState;
    onLogout: () => void;
}

type ProfileView = 'main' | 'personal' | 'notifications' | 'privacy' | 'help' | 'preferences' | 'support';

const ParentProfile: React.FC<ParentProfileProps> = ({ user, onLogout }) => {
    const [view, setView] = useState<ProfileView>('main');
    const { addToast } = useToast();
    const { updateUser } = useAuth();

    // State for forms
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email || '');
    const [isSaving, setIsSaving] = useState(false);
    
    // Mock settings state
    const [notifs, setNotifs] = useState({ push: true, email: true, report: false });
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            // 1. Update Supabase if not a mock client
            const { error } = await supabase
                .from('profiles')
                .update({ name, email })
                .eq('id', user.id);

            if (error) throw error;

            // 2. Update local context
            updateUser({ name, email });

            // 3. Update localStorage for persistence
            const updated = { ...user, name, email };
            localStorage.setItem('motlatsi_user', JSON.stringify(updated));
            
            addToast("Profile updated successfully", "success");
            setView('main');
        } catch (error: any) {
            console.error("Error updating profile:", error);
            addToast(error.message || "Failed to update profile", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const toggleNotif = (key: keyof typeof notifs) => {
        setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (view === 'support') {
        return <SupportAgent user={user} onClose={() => setView('main')} />;
    }

    const renderHeader = () => {
        if (view === 'main') {
            return (
                <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-[#F9F9FB]/90 dark:bg-[#0f0d09]/90 backdrop-blur-sm z-20">
                    <h1 className="text-xl font-bold text-[#181611] dark:text-white font-display">Profile</h1>
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <MotlatsiLogo variant="icon" className="h-6 w-6" />
                    </div>
                </header>
            );
        }

        const titles: Record<string, string> = {
            personal: 'Personal Details',
            notifications: 'Notifications',
            privacy: 'Privacy & Security',
            help: 'Help Center',
            preferences: 'App Preferences'
        };

        return (
            <header className="px-4 pt-6 pb-4 flex items-center gap-4 sticky top-0 bg-[#F9F9FB]/90 dark:bg-[#0f0d09]/90 backdrop-blur-sm z-20 border-b border-black/5 dark:border-white/5">
                <button 
                    onClick={() => setView('main')}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft size={20} className="text-[#181611] dark:text-white" />
                </button>
                <h1 className="text-base font-bold text-[#181611] dark:text-white">{titles[view]}</h1>
            </header>
        );
    };

    const renderMain = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="size-16 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{user.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{user.email}</p>
                    <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase rounded-md tracking-wider">Parent Account</span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Account</p>
                <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
                    <MenuItem icon={<User size={18}/>} label="Personal Details" onClick={() => setView('personal')} />
                    <MenuItem icon={<Bell size={18}/>} label="Notifications" onClick={() => setView('notifications')} />
                    <MenuItem icon={<Shield size={18}/>} label="Privacy & Security" onClick={() => setView('privacy')} />
                    <MenuItem icon={<CreditCard size={18}/>} label="Billing & Subscription" onClick={() => addToast("Billing portal coming soon", "info")} />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Support</p>
                <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
                    <MenuItem icon={<Sparkles size={18} className="text-blue-500" />} label="AI Assistant" onClick={() => setView('support')} />
                    <MenuItem icon={<HelpCircle size={18}/>} label="Help Center" onClick={() => setView('help')} />
                    <MenuItem icon={<Settings size={18}/>} label="App Preferences" onClick={() => setView('preferences')} />
                </div>
            </div>
            
            <button 
                onClick={onLogout}
                className="w-full py-4 text-red-500 font-bold bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mb-8"
            >
                <LogOut size={18} /> Sign Out
            </button>
        </div>
    );

    const renderPersonal = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>
            </div>
            <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <ToggleItem label="Push Notifications" active={notifs.push} onToggle={() => toggleNotif('push')} />
                <ToggleItem label="Email Alerts" active={notifs.email} onToggle={() => toggleNotif('email')} />
                <ToggleItem label="Weekly Progress Report" active={notifs.report} onToggle={() => toggleNotif('report')} />
            </div>
            <p className="text-xs text-gray-400 px-4 text-center leading-relaxed">
                Notifications help you stay updated on your child's progress and critical interventions.
            </p>
        </div>
    );

    const renderPrivacy = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
             <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden p-6 space-y-4">
                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full">
                        <Lock size={24} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm">Change Password</h3>
                        <p className="text-xs text-gray-500">Update your login credentials</p>
                    </div>
                    <button 
                        onClick={() => addToast("Password reset email sent", "success")}
                        className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                        Update
                    </button>
                </div>
                <div className="flex items-center gap-4 text-gray-900 dark:text-white border-t border-gray-50 dark:border-white/5 pt-4">
                    <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-full">
                        <ShieldCheck size={24} className="text-green-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm">Two-Factor Auth</h3>
                        <p className="text-xs text-gray-500">Enhanced security for your account</p>
                    </div>
                    <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors">
                        Enable
                    </button>
                </div>
             </div>
             <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-blue-800 dark:text-blue-300 font-bold text-sm mb-2">Data Privacy</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                    Motlatsi AI encrypts all student data. We strictly follow data protection regulations. Your data is never sold to third parties.
                </p>
             </div>
        </div>
    );

    const renderHelp = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
             <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="p-5 border-b border-gray-50 dark:border-white/5">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                </div>
                {['How is mastery calculated?', 'Can I add multiple children?', 'What if I forget my password?'].map((q, i) => (
                    <button key={i} className="w-full text-left p-5 border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex justify-between items-center group">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{q}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                    </button>
                ))}
             </div>
             <button className="w-full py-4 bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-white/5 rounded-3xl font-bold text-sm text-primary shadow-sm hover:bg-gray-50 transition-colors">
                 Contact Support
             </button>
        </div>
    );

    const renderPreferences = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <Moon size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Dark Mode</span>
                    </div>
                    <button 
                        onClick={() => {
                            setDarkMode(!darkMode);
                            document.documentElement.classList.toggle('dark');
                        }}
                        className={`w-12 h-7 rounded-full p-1 transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                        <div className={`size-5 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-5' : ''}`}></div>
                    </button>
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Globe size={18} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Language</span>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">English (UK)</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#F9F9FB] dark:bg-[#0f0d09] font-sans">
            {renderHeader()}

            <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
                {view === 'main' && renderMain()}
                {view === 'personal' && renderPersonal()}
                {view === 'notifications' && renderNotifications()}
                {view === 'privacy' && renderPrivacy()}
                {view === 'help' && renderHelp()}
                {view === 'preferences' && renderPreferences()}
            </div>
        </div>
    );
};

const MenuItem = ({ icon, label, onClick }: any) => (
    <button 
        onClick={onClick}
        className="w-full flex items-center gap-3 p-4 border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left group"
    >
        <div className="text-gray-400 group-hover:text-primary transition-colors">{icon}</div>
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex-1">{label}</span>
        <ChevronRight size={16} className="text-gray-300" />
    </button>
);

const ToggleItem = ({ label, active, onToggle }: any) => (
    <div className="flex items-center justify-between p-5 border-b border-gray-50 dark:border-white/5 last:border-0">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{label}</span>
        <button 
            onClick={onToggle}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${active ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <div className={`size-5 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-5' : ''}`}></div>
        </button>
    </div>
);

export default ParentProfile;
