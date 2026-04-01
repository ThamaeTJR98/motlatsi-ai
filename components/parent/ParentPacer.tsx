
import React, { useState } from 'react';
import { GradeRecord } from '../../types';
import { aiClient } from '../../src/utils/aiClient';
import { getLearnerProfileContext } from '../../utils/aiHelpers';
import { 
    ArrowLeft, RefreshCw, CheckCircle, MoreHorizontal, 
    PlayCircle, Mic, Sparkles, BookOpen, Map as MapIcon,
    ChevronDown, ChevronUp, AlertTriangle, X, Clock, Brain, FileText, ArrowRight
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface ParentPacerProps {
    child: any | null;
    activityLog: GradeRecord[];
    onBack: () => void;
}

const ParentPacer: React.FC<ParentPacerProps> = ({ child, activityLog, onBack }) => {
    const { addToast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiAdvice, setAiAdvice] = useState<string | null>(null);
    const [aiAdviceSesotho, setAiAdviceSesotho] = useState<string | null>(null);
    const [analogyTitle, setAnalogyTitle] = useState("The Herding Analogy");
    const [guideLanguage, setGuideLanguage] = useState<'EN' | 'SS'>('EN');

    // Modals & Menus
    const [showRoadmapModal, setShowRoadmapModal] = useState(false);
    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [showInterventionMenu, setShowInterventionMenu] = useState(false);
    
    // Manage expansion states
    const [expandedSections, setExpandedSections] = useState({
        roadmap: true,
        intervention: true,
        guide: false,
        progress: false
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const generateAdvice = async () => {
        if (!child) return;
        setIsGenerating(true);
        try {
            const struggle = activityLog.find(l => (l.score / l.total) < 0.6);
            const topic = struggle ? struggle.itemTitle : "General Studies";
            const inclusionContext = getLearnerProfileContext(child.learningNeeds);

            const prompt = `
                Role: Kitchen Table Tutor for a parent in Lesotho.
                Child: ${child.name}, Grade ${child.currentGrade}.
                Struggling Topic: ${topic}.
                ${inclusionContext}
                Create a brief teaching script using a cultural analogy familiar in Lesotho (like herding sheep, farming, or village life).
                Format: 
                Title: [Short Analogy Title]
                Content: [The analogy text]
            `;
            
            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt
            });
            
            const text = response.text || "";
            if (text.includes("Title:")) {
                const parts = text.split("Content:");
                setAnalogyTitle(parts[0].replace("Title:", "").trim());
                setAiAdvice(parts[1]?.trim());
            } else {
                setAiAdvice(text);
            }
            // Reset translations
            setAiAdviceSesotho(null);
            setGuideLanguage('EN');
        } catch (e) {
            setAiAdvice("Try using everyday objects to demonstrate the concept.");
        } finally {
            setIsGenerating(false);
        }
    };

    const translateAdvice = async () => {
        if (!aiAdvice) return;
        setIsGenerating(true);
        try {
            const prompt = `Translate the following educational advice into Sesotho:\n\n${aiAdvice}`;
            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt
            });
            
            if (response && response.text) {
                 setAiAdviceSesotho(response.text);
                 setGuideLanguage('SS');
            } else {
                 throw new Error("Empty response");
            }
        } catch (e) {
            console.warn("Translation API failed, using fallback.");
            // Fallback for demo purposes if API fails
            setAiAdviceSesotho("Sebelisa lintho tse tloaelehileng tsa lapeng ho hlalosa taba ena. Etsa mohlala ka lijo kapa lipapali tseo ngoana a li ratang.");
            setGuideLanguage('SS');
        } finally {
            setIsGenerating(false);
        }
    };

    const launchIntervention = () => {
        // Logic to actually assign content to student would go here
        setShowInterventionModal(false);
        addToast(`Remedial plan assigned to ${child.name}'s dashboard!`, "success");
    };

    const handleGuideDone = () => {
        setAiAdvice(null);
        setAiAdviceSesotho(null);
        setGuideLanguage('EN');
        toggleSection('guide'); // Collapse section to signify completion
        addToast("Guide marked as complete!", "success");
    };

    const handleInterventionMenuAction = (action: string) => {
        setShowInterventionMenu(false);
        if (action === 'dismiss') {
            toggleSection('intervention');
            addToast("Intervention dismissed for now.", "info");
        } else if (action === 'preview') {
             addToast("Previewing content...", "info");
        }
    };

    // Calculate Pacer Data (Mock)
    const progressPercent = 65;

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a] font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-4 justify-between border-b border-slate-200 dark:border-slate-800 transition-all">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <ArrowLeft className="text-slate-600 dark:text-slate-300" size={20} />
                    </button>
                    <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight leading-tight">
                        Pacer
                    </h1>
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                        {child ? child.name : 'Overview'}
                    </p>
                </div>
            </header>

            {!child ? (
                <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[200px]">
                        Select a child from the Home tab to view their academic pace.
                    </p>
                    <button onClick={onBack} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg">Return Home</button>
                </main>
            ) : (
                <main className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-4 px-4 space-y-4">
                    
                    {/* 1. Interactive Roadmap Card */}
                    <section 
                        className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300 ${expandedSections.roadmap ? 'ring-2 ring-primary/5' : ''}`}
                    >
                        <div 
                            className="p-5 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-700/50"
                            onClick={() => toggleSection('roadmap')}
                        >
                            <h2 className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2">
                                <MapIcon className="text-primary" size={18} />
                                Academic Roadmap
                            </h2>
                            {expandedSections.roadmap ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
                        </div>

                        {expandedSections.roadmap && (
                            <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2" onClick={() => setShowRoadmapModal(true)}>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-8 mt-2">
                                    <span>Jan (Start)</span>
                                    <span>Dec (End)</span>
                                </div>
                                
                                <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full mb-10 cursor-pointer group">
                                    <div className="absolute inset-0 w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)' }}></div>
                                    <div className="absolute top-0 left-0 h-full bg-primary/20 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                    
                                    {/* Markers */}
                                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ left: '58%' }}>
                                        <div className="bg-white dark:bg-slate-900 border-2 border-primary size-4 rounded-full shadow-md z-10 group-hover:scale-150 transition-transform"></div>
                                        <div className="absolute -top-9 whitespace-nowrap bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                            Current
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                    <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-100 dark:border-orange-900/20">
                                        <p className="text-[10px] text-orange-600/70 dark:text-orange-400/70 font-bold uppercase tracking-wider mb-1">Status</p>
                                        <div className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400 font-bold text-sm">
                                            <AlertTriangle size={14} /> 2.5 Weeks Behind
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl border border-slate-100 dark:border-slate-600/30">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Focus</p>
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold text-sm">
                                            <Brain size={14} className="text-primary" /> Fractions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 2. Smart Intervention Card */}
                    <section className="rounded-2xl overflow-hidden shadow-lg shadow-blue-500/10 transition-all duration-300 relative z-10">
                        <div 
                            className="bg-gradient-to-r from-[#135bec] to-[#0a3fa8] p-5 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleSection('intervention')}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="bg-white/20 p-1.5 rounded-lg text-white">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Smart Intervention</h3>
                                    {!expandedSections.intervention && (
                                        <p className="text-blue-200 text-[10px] font-medium">1 Action Plan Available</p>
                                    )}
                                </div>
                            </div>
                            {expandedSections.intervention ? <ChevronUp size={20} className="text-white/70" /> : <ChevronDown size={20} className="text-white/70" />}
                        </div>

                        {expandedSections.intervention && (
                            <div className="bg-white dark:bg-[#1e293b] p-5 border-x border-b border-gray-100 dark:border-slate-700 rounded-b-2xl animate-in slide-in-from-top-2">
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                                    Based on recent quiz scores, {child.name.split(' ')[0]} needs help bridging the gap in <strong>Math: Fractions</strong>.
                                </p>
                                
                                <div className="flex gap-3 relative">
                                    <button 
                                        onClick={() => setShowInterventionModal(true)}
                                        className="flex-1 bg-[#135bec] hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                                    >
                                        <PlayCircle size={16} />
                                        Launch Plan
                                    </button>
                                    <button 
                                        onClick={() => setShowInterventionMenu(!showInterventionMenu)}
                                        className="px-4 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>

                                    {/* Intervention Menu Dropdown */}
                                    {showInterventionMenu && (
                                        <div className="absolute right-0 bottom-full mb-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95">
                                            <button onClick={() => handleInterventionMenuAction('preview')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 rounded-t-xl">
                                                Preview Content
                                            </button>
                                            <button onClick={() => handleInterventionMenuAction('dismiss')} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-xs font-bold text-red-500 rounded-b-xl border-t border-gray-50 dark:border-slate-700">
                                                Dismiss for now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 3. Kitchen Table Guide */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div 
                            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={() => toggleSection('guide')}
                        >
                            <div className="flex items-center gap-2.5">
                                <BookOpen className="text-emerald-500" size={18} />
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Kitchen Table Guide</h3>
                            </div>
                            {expandedSections.guide ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
                        </div>

                        {expandedSections.guide && (
                            <div className="px-5 pb-6 pt-0 animate-in slide-in-from-top-1">
                                {aiAdvice && (
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider truncate mr-2">{analogyTitle}</p>
                                        <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg shrink-0">
                                            <button 
                                                onClick={() => setGuideLanguage('EN')}
                                                className={`px-2 py-0.5 rounded-md text-[9px] font-bold shadow-sm transition-colors ${guideLanguage === 'EN' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                EN
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    if (guideLanguage === 'EN') translateAdvice();
                                                    else setGuideLanguage('SS');
                                                }}
                                                className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-colors ${guideLanguage === 'SS' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                SS
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {isGenerating ? (
                                    <div className="py-8 flex flex-col items-center gap-3 text-slate-400 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-600">
                                        <RefreshCw className="animate-spin text-primary" size={24} />
                                        <p className="text-xs font-bold uppercase tracking-widest">Consulting Pedagogy AI...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {aiAdvice ? (
                                            <div className="p-5 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30 relative">
                                                <div className="absolute -top-2 -left-2 bg-emerald-100 dark:bg-emerald-800 rounded-full p-1.5 shadow-sm border border-white dark:border-slate-800">
                                                    <Mic size={14} className="text-emerald-600 dark:text-emerald-300" />
                                                </div>
                                                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-2 uppercase tracking-wide">Script:</h4>
                                                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium italic">
                                                    "{guideLanguage === 'SS' && aiAdviceSesotho ? aiAdviceSesotho : aiAdvice}"
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 px-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                                                <p className="text-xs text-gray-400 mb-2">Need a simple way to explain a tough topic?</p>
                                                <p className="text-xs font-bold text-gray-500">Generate a culturally relevant analogy.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="mt-4 flex flex-col gap-2">
                                    {!aiAdvice ? (
                                        <button 
                                            onClick={generateAdvice}
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
                                        >
                                            <Sparkles size={14} /> Generate Guide
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleGuideDone}
                                                className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                                            >
                                                <CheckCircle size={14} className="text-green-500" /> Mark Done
                                            </button>
                                            <button 
                                                onClick={generateAdvice}
                                                className="px-4 bg-slate-100 text-slate-500 rounded-xl font-bold text-xs flex items-center justify-center hover:text-primary transition-colors"
                                                title="Regenerate"
                                            >
                                                <RefreshCw size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            )}

            {/* Roadmap Modal */}
            {showRoadmapModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Term 3 Details</h3>
                            <button onClick={() => setShowRoadmapModal(false)}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Term Ends</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Dec 12, 2024</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Upcoming Exams</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Oct 15 - Oct 25</span>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                                    "Khotso is progressing well but needs a slight push in Math to meet the term goals comfortably." - Mrs. Molefe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detailed Intervention Modal */}
            {showInterventionModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-0 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="bg-teacherBlue p-5 text-white">
                            <div className="flex justify-between items-start mb-2">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Sparkles size={20} />
                                </div>
                                <button onClick={() => setShowInterventionModal(false)} className="text-white/70 hover:text-white"><X size={20}/></button>
                            </div>
                            <h3 className="font-bold text-xl leading-tight">Remedial Action Plan</h3>
                            <p className="text-blue-100 text-xs mt-1">Topic: Fractions & Decimals</p>
                        </div>
                        
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Step-by-Step Breakdown</h4>
                            
                            <div className="space-y-4 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-700"></div>

                                <div className="relative flex gap-4">
                                    <div className="size-8 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-slate-800">1</div>
                                    <div className="pb-2">
                                        <h5 className="text-sm font-bold text-gray-900 dark:text-white">Concept Review</h5>
                                        <p className="text-xs text-gray-500 mb-2">Video explanation of basic fractions using pizza analogy.</p>
                                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-700 px-2 py-0.5 rounded"><Clock size={10}/> 5 Mins</div>
                                    </div>
                                </div>

                                <div className="relative flex gap-4">
                                    <div className="size-8 rounded-full bg-purple-100 text-purple-600 font-bold text-xs flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-slate-800">2</div>
                                    <div className="pb-2">
                                        <h5 className="text-sm font-bold text-gray-900 dark:text-white">Visual Quiz</h5>
                                        <p className="text-xs text-gray-500 mb-2">5 questions matching fractions to images.</p>
                                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-700 px-2 py-0.5 rounded"><FileText size={10}/> 10 Mins</div>
                                    </div>
                                </div>

                                <div className="relative flex gap-4">
                                    <div className="size-8 rounded-full bg-green-100 text-green-600 font-bold text-xs flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-slate-800">3</div>
                                    <div className="pb-2">
                                        <h5 className="text-sm font-bold text-gray-900 dark:text-white">Mastery Check</h5>
                                        <p className="text-xs text-gray-500 mb-2">Final verification to ensure concept retention.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                             <button 
                                onClick={launchIntervention}
                                className="w-full py-3.5 bg-teacherBlue text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <span>Confirm & Assign</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentPacer;
