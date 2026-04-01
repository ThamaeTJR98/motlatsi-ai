
import React, { useState, useMemo } from 'react';
import { UserState, TeachingAssignment } from '../types';
import { User, Mail, School, Save, Check, LogOut, Book, Plus, Trash2, X, ChevronDown, HelpCircle, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { allGrades } from '../curriculum';
import SupportAgent from './SupportAgent';

interface UserProfileProps {
    user: UserState;
    onUpdate: (user: UserState) => void;
    onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate, onLogout }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email || '');
    const [school, setSchool] = useState(user.school || '');
    const [grade, setGrade] = useState(user.currentGrade);
    const [subject, setSubject] = useState(user.subject || '');
    
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

    // Teacher Portfolio State
    const [teachingPortfolio, setTeachingPortfolio] = useState<TeachingAssignment[]>(user.teachingSubjects || []);
    const [isAddingAssignment, setIsAddingAssignment] = useState(false);
    const [newAssignSubject, setNewAssignSubject] = useState('');
    const [newAssignGrades, setNewAssignGrades] = useState<string[]>([]);

    // Calculate available subjects based on selected grades
    const availableSubjects = useMemo(() => {
        const uniqueSubjects = new Set<string>();
        if (newAssignGrades.length === 0) return [];

        newAssignGrades.forEach(selectedG => {
            const gradeData = allGrades.find(g => 
                g.grade === selectedG || 
                g.grade === `Grade ${selectedG}` ||
                g.grade.replace('Grade ', '') === selectedG
            );
            if (gradeData) {
                gradeData.subjects.forEach(sub => uniqueSubjects.add(sub.name));
            }
        });
        return Array.from(uniqueSubjects).sort();
    }, [newAssignGrades]);

    const toggleNewGrade = (g: string) => {
        if (newAssignGrades.includes(g)) {
            const updated = newAssignGrades.filter(g2 => g2 !== g);
            setNewAssignGrades(updated);
            if (updated.length === 0 && newAssignSubject !== 'All Subjects' && newAssignSubject !== 'Custom') {
                setNewAssignSubject('');
            }
        } else {
            setNewAssignGrades(prev => [...prev, g]);
        }
    };

    const handleAddAssignment = () => {
        if (!newAssignSubject.trim() || newAssignGrades.length === 0) return;
        
        const newAssignment: TeachingAssignment = {
            subject: newAssignSubject.trim(),
            grades: newAssignGrades.sort((a, b) => parseInt(a) - parseInt(b))
        };
        
        setTeachingPortfolio([...teachingPortfolio, newAssignment]);
        setNewAssignSubject('');
        setNewAssignGrades([]);
        setIsAddingAssignment(false);
    };

    const handleRemoveAssignment = (index: number) => {
        const updated = [...teachingPortfolio];
        updated.splice(index, 1);
        setTeachingPortfolio(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        let updatedGrade = grade;
        let updatedSubject = subject;
        
        if (user.role === 'teacher' && teachingPortfolio.length > 0) {
            updatedGrade = teachingPortfolio[0].grades[0];
            updatedSubject = teachingPortfolio[0].subject;
        }

        const updatedUser: UserState = { 
            ...user, 
            name, 
            email, 
            school, 
            currentGrade: updatedGrade,
            subject: updatedSubject,
            teachingSubjects: teachingPortfolio
        };
        
        onUpdate(updatedUser);
        localStorage.setItem('motlatsi_user', JSON.stringify(updatedUser));
        
        if (user.id) {
            try {
                const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(user.id));
                if (isUuid) {
                    await supabase.from('profiles').update({
                        name, email, school, current_grade: updatedGrade, subject: updatedSubject,
                    }).eq('id', user.id);
                } else {
                    const users = JSON.parse(localStorage.getItem('motlatsi_admin_users') || '[]');
                    const userIndex = users.findIndex((u: any) => u.id.toString() === user.id!.toString());
                    if (userIndex >= 0) {
                        users[userIndex] = { ...users[userIndex], name, email, school, currentGrade: updatedGrade, subject: updatedSubject, teachingSubjects: teachingPortfolio };
                        localStorage.setItem('motlatsi_admin_users', JSON.stringify(users));
                    }
                }
            } catch (e) {
                console.error("Save failed", e);
            }
        }

        setSaving(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (showSupport) {
        return <SupportAgent user={user} onClose={() => setShowSupport(false)} />;
    }

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-950 overflow-hidden font-sans">
            {/* Compact Header */}
            <header className="shrink-0 px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center z-10">
                <h1 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2 tracking-tight">
                    <User size={16} className="text-teacherBlue" />
                    {user.role === 'admin' ? 'Admin Profile' : 
                     user.role === 'student' ? 'Student Profile' : 
                     user.role === 'parent' ? 'Parent Profile' : 'Teacher Profile'}
                </h1>
                <button 
                    onClick={onLogout}
                    className="p-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors active:scale-95"
                >
                    <LogOut size={16} />
                </button>
            </header>

            {/* Main Content - No Scroll if possible, or contained scroll */}
            <main className="flex-1 p-3 flex flex-col gap-3 min-h-0 overflow-y-auto pb-24 md:pb-3">
                
                {/* Identity Card - Compact */}
                <div className="shrink-0 flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-teacherBlue text-sm font-black shadow-sm shrink-0">
                        {name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent text-sm font-black text-gray-900 dark:text-white border-none focus:ring-0 p-0 truncate placeholder-gray-300"
                            placeholder="Your Name"
                        />
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{user.role}</span>
                            <span className="size-1 rounded-full bg-gray-300"></span>
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Active</span>
                        </div>
                    </div>
                </div>

                {/* Info Grid - 2 Columns */}
                <div className="shrink-0 grid grid-cols-2 gap-2">
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email</label>
                        <div className="flex items-center gap-2">
                            <Mail size={12} className="text-gray-300 shrink-0" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 border-none focus:ring-0 p-0 truncate"
                            />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">School</label>
                        <div className="flex items-center gap-2">
                            <School size={12} className="text-gray-300 shrink-0" />
                            <input 
                                type="text" 
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 border-none focus:ring-0 p-0 truncate"
                            />
                        </div>
                    </div>
                </div>

                {/* Teaching Portfolio - Flex Grow */}
                {user.role === 'teacher' && (
                    <div className="shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden">
                        <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Classes I teach</h3>
                            {!isAddingAssignment && (
                                <button 
                                    onClick={() => setIsAddingAssignment(true)}
                                    className="size-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                >
                                    <Plus size={14} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                        
                        <div className="p-2 space-y-2">
                            {isAddingAssignment ? (
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-blue-600 uppercase">New Class</span>
                                        <button onClick={() => setIsAddingAssignment(false)}><X size={14} className="text-blue-400" /></button>
                                    </div>
                                    
                                    {/* Grade Selector */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                                            <button
                                                key={g}
                                                onClick={() => toggleNewGrade(g.toString())}
                                                className={`text-[9px] font-bold w-6 h-6 flex items-center justify-center rounded transition-colors ${newAssignGrades.includes(g.toString()) ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-blue-100 text-gray-400'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Subject Selector */}
                                    <div className="relative mb-3">
                                        <select 
                                            className="w-full p-2 rounded-lg text-xs font-bold border border-blue-200 bg-white focus:ring-0 outline-none appearance-none"
                                            value={newAssignSubject}
                                            onChange={e => setNewAssignSubject(e.target.value)}
                                            disabled={newAssignGrades.length === 0}
                                        >
                                            <option value="">Select Subject...</option>
                                            <option value="All Subjects">★ All Subjects</option>
                                            {availableSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                            <option value="Custom">Custom...</option>
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    
                                    {newAssignSubject === 'Custom' && (
                                        <input 
                                            type="text" 
                                            placeholder="Subject Name"
                                            className="w-full p-2 mb-3 rounded-lg text-xs border border-blue-200 bg-white focus:ring-0 outline-none"
                                            onChange={e => setNewAssignSubject(e.target.value)}
                                        />
                                    )}

                                    <button 
                                        onClick={handleAddAssignment} 
                                        disabled={!newAssignSubject || newAssignGrades.length === 0}
                                        className="w-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Add Class
                                    </button>
                                </div>
                            ) : teachingPortfolio.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                                    <Book size={24} className="opacity-20" />
                                    <p className="text-[10px] font-medium">No classes yet</p>
                                </div>
                            ) : (
                                teachingPortfolio.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700 group">
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-gray-800 dark:text-white truncate">
                                                {item.subject === 'All Subjects' ? 'General' : item.subject}
                                            </p>
                                            <div className="flex gap-1 mt-1 overflow-x-auto scrollbar-hide">
                                                {item.grades.map(g => (
                                                    <span key={g} className="text-[9px] font-bold bg-white dark:bg-slate-800 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100 dark:border-slate-700 whitespace-nowrap">Gr {g}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => handleRemoveAssignment(idx)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Student Grade Selector */}
                {user.role === 'student' && (
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Current Grade</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <select 
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="w-full pl-9 pr-8 py-2 bg-gray-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 focus:ring-0 outline-none appearance-none"
                            >
                                {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                                    <option key={g} value={g}>Grade {g}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                )}

                {/* Support Button - Compact */}
                <button 
                    onClick={() => setShowSupport(true)}
                    className="shrink-0 w-full bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between group active:scale-[0.99] transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-indigo-500 shadow-sm">
                            <HelpCircle size={14} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300">AI Support Assistant</p>
                        </div>
                    </div>
                    <ChevronDown size={14} className="-rotate-90 text-indigo-300" />
                </button>

                {/* Save Button - Sticky Bottom */}
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="shrink-0 w-full py-3.5 bg-teacherBlue text-white rounded-xl font-black text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-auto"
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Check size={16} strokeWidth={3} />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </main>
        </div>
    );
};

export default UserProfile;
