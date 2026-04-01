
import React, { useState, useEffect, useRef } from 'react';
import { Topic, SavedItem, ScheduleSlot } from '../types';
import { aiClient } from '../src/utils/aiClient';
import { safeJsonParse } from '../utils/aiHelpers';
import { useToast } from '../contexts/ToastContext';
import { useLearningEngine } from '../contexts/LearningEngineContext';
import { 
    ArrowLeft, Brain, Gauge, Wand2, Sparkles, 
    X, Download, Calendar, Printer, FileText, Clock, Presentation, Mic, Edit3, Save
} from 'lucide-react';

interface WorksheetGeneratorProps {
    topic: Topic;
    onBack: () => void;
}

// Data Structure for the Worksheet
interface WorksheetData {
    title: string;
    objective: string;
    sections: {
        type: 'fill-blank' | 'short-answer' | 'matching';
        title: string;
        items: {
            question: string;
            answer?: string; // For teacher key
            options?: string[]; // For matching
        }[];
    }[];
}

// Types for Configuration
interface WorksheetConfig {
    selectedObjectives: string[];
    complexity: 'remembering' | 'applying' | 'analyzing' | 'creating';
    questionCount: number;
    outputMode: 'digital' | 'print';
}

const WorksheetGenerator: React.FC<WorksheetGeneratorProps> = ({ topic, onBack }) => {
    const { addToast } = useToast();
    const { schedule, refreshSchedule } = useLearningEngine();

    const [view, setView] = useState<'config' | 'generating' | 'preview'>('config');
    
    // Config State
    const [config, setConfig] = useState<WorksheetConfig>({
        selectedObjectives: [],
        complexity: 'applying',
        questionCount: 8,
        outputMode: 'print'
    });

    // Generation State
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing...");
    
    // Result State
    const [content, setContent] = useState<WorksheetData | null>(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleTime, setScheduleTime] = useState({ day: 'Mon', time: '09:00' });

    // Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [recordingField, setRecordingField] = useState<string | null>(null);

    // Initialize Objectives safely
    useEffect(() => {
        if (topic && topic.learningObjectives && Array.isArray(topic.learningObjectives)) {
            // Pre-select first 3
            setConfig(prev => ({
                ...prev,
                selectedObjectives: topic.learningObjectives!.slice(0, 3)
            }));
        }
    }, [topic]);

    const toggleObjective = (obj: string) => {
        setConfig(prev => {
            const exists = prev.selectedObjectives.includes(obj);
            return {
                ...prev,
                selectedObjectives: exists 
                    ? prev.selectedObjectives.filter(o => o !== obj)
                    : [...prev.selectedObjectives, obj]
            };
        });
    };

    const handleGenerate = async () => {
        setView('generating');
        
        // Simulation of progress steps
        const steps = [
            { pct: 15, text: "Analyzing curriculum standards..." },
            { pct: 35, text: "Drafting questions based on Bloom's Taxonomy..." },
            { pct: 60, text: "Formatting layout for printing..." },
            { pct: 85, text: "Finalizing answer key..." }
        ];

        let stepIdx = 0;
        const interval = setInterval(() => {
            if (stepIdx < steps.length) {
                setProgress(steps[stepIdx].pct);
                setStatusText(steps[stepIdx].text);
                stepIdx++;
            }
        }, 800);

        try {
            const prompt = `
                Generate a printable worksheet for the topic: "${topic.title}".
                Target Audience: Primary school students (ages 6-13) in Lesotho.
                
                Context:
                - Objectives: ${config.selectedObjectives.join(', ')}
                - Complexity Level: ${config.complexity.toUpperCase()} (Bloom's Taxonomy)
                - Total Items: ${config.questionCount}
                
                IMPORTANT: Use LAYMAN'S TERMS. No difficult words.
                Use relatable scenarios, stories, and cultural references from Lesotho (e.g., mountains, cattle, papa, village life, school games like morabaraba).

                Structure the output as JSON:
                {
                    "title": "Worksheet: ${topic.title}",
                    "objective": "A single clear sentence in simple words about what we are learning.",
                    "sections": [
                        {
                            "type": "fill-blank",
                            "title": "Fill in the blanks (using simple stories)",
                            "items": [
                                { "question": "The [papa] is a traditional food in Lesotho.", "answer": "papa" }
                            ]
                        },
                        {
                            "type": "short-answer",
                            "title": "Short Answer (using relatable scenarios)",
                            "items": [
                                { "question": "If you were in the mountains with your sheep, how would you...", "answer": "Model answer in simple words..." }
                            ]
                        }
                    ]
                }
                Make sure the "question" in fill-blank has the answer inside brackets like [this] or is formatted so I can replace it with a line.
            `;

            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            const data = safeJsonParse<WorksheetData>(response.text);
            
            clearInterval(interval);
            setProgress(100);
            setStatusText("Ready!");
            
            setTimeout(() => {
                if (data) {
                    setContent(data);
                    setView('preview');
                    setIsEditing(true); // Enable editing by default so users know they can change it
                } else {
                    addToast("Failed to generate valid worksheet.", "error");
                    setView('config');
                }
            }, 500);

        } catch (e) {
            clearInterval(interval);
            console.error(e);
            addToast("Error connecting to AI.", "error");
            setView('config');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSchedule = () => {
        if (!content) return;
        
        // 1. Save to Library first
        const libraryItem: SavedItem = {
            id: `worksheet-${Date.now()}`,
            type: 'worksheet',
            title: content.title,
            date: new Date().toISOString(),
            data: { content: JSON.stringify(content) }
        };
        
        const currentLib = JSON.parse(localStorage.getItem('motlatsi_library') || '[]');
        localStorage.setItem('motlatsi_library', JSON.stringify([libraryItem, ...currentLib]));

        // 2. Add to Schedule
        const newSlot: ScheduleSlot = {
            id: `sch-${Date.now()}`,
            day: scheduleTime.day,
            time: scheduleTime.time,
            subject: topic.title,
            type: 'class',
            notes: `Worksheet: ${content.objective}`,
            linkedResourceId: libraryItem.id,
            autoGenerated: false
        };

        const updatedSchedule = [...schedule, newSlot];
        localStorage.setItem('motlatsi_schedule', JSON.stringify(updatedSchedule));
        refreshSchedule();

        addToast("Worksheet saved and scheduled!", "success");
        setShowScheduleModal(false);
        onBack();
    };

    // --- Editing Functions ---

    const handleContentChange = (sectionIdx: number, itemIdx: number, field: 'question' | 'answer', value: string) => {
        if (!content) return;
        const newContent = { ...content };
        newContent.sections[sectionIdx].items[itemIdx][field] = value;
        setContent(newContent);
    };

    const handleTitleChange = (value: string) => {
        if (!content) return;
        setContent({ ...content, title: value });
    };

    const handleObjectiveChange = (value: string) => {
        if (!content) return;
        setContent({ ...content, objective: value });
    };

    const startDictation = (fieldId: string, callback: (text: string) => void) => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            addToast("Speech recognition not supported", "error");
            return;
        }
        
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        setRecordingField(fieldId);

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            callback(text);
            setRecordingField(null);
        };

        recognition.onerror = (e: any) => {
            console.error("Speech error", e);
            setRecordingField(null);
        };
        
        recognition.onend = () => setRecordingField(null);

        recognition.start();
    };

    // Safely render content
    if (!topic) return null;

    // --- VIEW 1: CONFIG WIZARD ---
    if (view === 'config') {
        return (
            <div className="min-h-screen bg-[#f9fafa] dark:bg-[#1a1f23] font-display text-[#0f1a1a] dark:text-white flex flex-col">
                <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-[#1a1f23]/80 backdrop-blur-md px-4 py-3 justify-between border-b border-[#2ab2b2]/10 shadow-sm">
                    <button onClick={onBack} className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-[#2ab2b2]/10 transition-colors">
                        <ArrowLeft size={18} className="text-[#0f1a1a] dark:text-white" />
                    </button>
                    <div className="flex flex-col items-center">
                        <h1 className="text-base font-bold leading-tight tracking-tight">Worksheet Wizard</h1>
                        <span className="text-[9px] font-semibold text-[#2ab2b2] uppercase tracking-widest">Configuration</span>
                    </div>
                    <div className="w-9"></div>
                </header>

                <main className="flex-1 w-full px-4 pt-4 space-y-6 pb-32 overflow-y-auto">
                    <section className="px-4 py-4 bg-[#2ab2b2]/5 rounded-xl border border-[#2ab2b2]/10">
                        <span className="px-2 py-0.5 bg-[#2ab2b2] text-white text-[9px] font-bold rounded uppercase tracking-wider mb-2 inline-block">Topic</span>
                        <h2 className="text-[#2ab2b2] text-xl font-extrabold leading-tight">{topic.title}</h2>
                    </section>

                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2ab2b2]/10 text-[#2ab2b2] font-bold text-[10px]">1</span>
                            <h3 className="text-sm font-bold">Select Learning Objectives</h3>
                        </div>
                        <div className="space-y-2">
                            {(topic.learningObjectives || []).map((obj, i) => (
                                <label key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#252a30] border border-transparent transition-all cursor-pointer hover:bg-[#ebf1f2] dark:hover:bg-[#2d3238] has-[:checked]:border-[#2ab2b2] has-[:checked]:bg-white dark:has-[:checked]:bg-[#252a30] has-[:checked]:shadow-sm">
                                    <div className="flex items-center h-5 mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            checked={config.selectedObjectives.includes(obj)}
                                            onChange={() => toggleObjective(obj)}
                                            className="w-4 h-4 rounded border-gray-300 text-[#2ab2b2] focus:ring-[#2ab2b2]" 
                                        />
                                    </div>
                                    <span className="text-xs font-medium leading-tight text-gray-700 dark:text-gray-300">{obj}</span>
                                </label>
                            ))}
                            {(!topic.learningObjectives || topic.learningObjectives.length === 0) && (
                                <p className="text-xs text-gray-400 italic">No specific objectives found. The AI will generate based on the title.</p>
                            )}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2ab2b2]/10 text-[#2ab2b2] font-bold text-[10px]">2</span>
                            <h3 className="text-sm font-bold">Question Complexity</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {['remembering', 'applying', 'analyzing', 'creating'].map((level) => (
                                <label key={level} className="relative cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="complexity" 
                                        className="peer sr-only"
                                        checked={config.complexity === level}
                                        onChange={() => setConfig({...config, complexity: level as any})}
                                    />
                                    <div className="h-full p-3 rounded-xl bg-white dark:bg-[#252a30] border border-transparent transition-all group-hover:bg-[#ebf1f2] peer-checked:border-[#2ab2b2] peer-checked:bg-white dark:peer-checked:bg-[#252a30] peer-checked:shadow-sm text-center">
                                        {level === 'remembering' && <Brain size={18} className="mx-auto mb-1.5 text-[#568f8f]" />}
                                        {level === 'applying' && <Gauge size={18} className="mx-auto mb-1.5 text-[#568f8f]" />}
                                        {level === 'analyzing' && <Wand2 size={18} className="mx-auto mb-1.5 text-[#568f8f]" />}
                                        {level === 'creating' && <Sparkles size={18} className="mx-auto mb-1.5 text-[#568f8f]" />}
                                        
                                        <p className="font-bold text-[10px] capitalize">{level}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2ab2b2]/10 text-[#2ab2b2] font-bold text-[10px]">3</span>
                                <h3 className="text-sm font-bold">Item Count</h3>
                            </div>
                            <span className="bg-[#2ab2b2]/10 text-[#2ab2b2] px-2 py-0.5 rounded-full font-bold text-[10px]">{config.questionCount} Items</span>
                        </div>
                        <div className="px-2">
                            <input 
                                type="range" 
                                min="5" 
                                max="15" 
                                value={config.questionCount}
                                onChange={(e) => setConfig({...config, questionCount: parseInt(e.target.value)})}
                                className="w-full h-2 bg-[#f0f4f5] dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#2ab2b2]"
                            />
                            <div className="flex justify-between mt-2 text-[9px] font-bold text-[#568f8f] uppercase tracking-widest">
                                <span>Short (5)</span>
                                <span>Long (15)</span>
                            </div>
                        </div>
                    </section>
                </main>
                
                <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-[#1a1f23]/95 backdrop-blur-md border-t border-[#2ab2b2]/10 px-4 py-4 pb-safe">
                    <button 
                        onClick={handleGenerate}
                        className="w-full bg-[#2ab2b2] hover:bg-[#259c9c] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#2ab2b2]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <Wand2 size={18} />
                        Start AI Generation
                    </button>
                </div>
            </div>
        );
    }

    // --- VIEW 2: GENERATION STATE ---
    if (view === 'generating') {
        return (
            <div className="bg-[#f0f4f5] dark:bg-[#1a1f23] flex items-center justify-center min-h-screen p-6 font-display">
                <div className="max-w-md w-full flex flex-col items-center gap-8">
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                        <Wand2 className="text-[#2ab2b2]" size={28} />
                        <h1 className="text-lg font-extrabold tracking-tight text-[#0f1a1a] dark:text-white uppercase">Motlatsi AI</h1>
                    </div>

                    <div className="relative flex flex-col items-center">
                        <div className="relative size-32 flex items-center justify-center mb-6">
                            <div className="absolute inset-0 bg-[#2ab2b2]/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="relative z-10 size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(42,178,178,0.2)]">
                                <Brain size={40} className="text-[#2ab2b2]" />
                            </div>
                            <div className="absolute inset-0 border-4 border-[#2ab2b2]/10 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
                        </div>
                        <h2 className="text-lg font-bold text-[#0f1a1a] dark:text-white mb-1">Creating worksheet...</h2>
                        <p className="text-[#568f8f] text-xs font-medium">{statusText}</p>
                    </div>

                    <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#568f8f]">Progress</span>
                            <span className="text-xl font-black text-[#2ab2b2]">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#d2e4e4] dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2ab2b2] transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 3: PREVIEW / RESULT ---
    return (
        <div className="bg-[#f9fafa] dark:bg-[#1a1f23] text-[#0f1a1a] dark:text-white font-display min-h-screen flex flex-col">
            <style>{`
                @media print {
                    .print-hidden { display: none !important; }
                    .print-show { display: block !important; }
                    body { background: white; color: black; }
                    .worksheet-container { box-shadow: none; border: none; max-width: 100%; margin: 0; padding: 0; }
                    textarea, input { border: none !important; resize: none; overflow: hidden; }
                }
                .custom-shadow { box-shadow: 0 4px 20px -2px rgba(42, 178, 178, 0.08); }
            `}</style>

            <header className="print-hidden sticky top-0 z-20 bg-[#f9fafa]/90 dark:bg-[#1a1f23]/90 backdrop-blur-md px-4 pt-4 pb-3 flex items-center justify-between border-b border-[#2ab2b2]/10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-white/10 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-base font-extrabold tracking-tight">Preview</h1>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${isEditing ? 'bg-[#2ab2b2] text-white' : 'text-[#2ab2b2] hover:bg-[#2ab2b2]/10'}`}
                    >
                        <Edit3 size={18} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#2ab2b2] hover:bg-[#2ab2b2]/10 transition-colors">
                        <Download size={18} />
                    </button>
                </div>
            </header>

            <main className="flex-1 px-4 py-4 space-y-6 max-w-3xl mx-auto w-full worksheet-container print:p-0 pb-36 overflow-y-auto">
                <div className="border-b-2 border-[#2ab2b2] pb-4 mb-6">
                    {isEditing ? (
                        <div className="flex gap-2 mb-2">
                            <input 
                                value={content?.title} 
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="text-2xl font-black text-[#0f1a1a] dark:text-white bg-transparent border-b border-dashed border-gray-300 focus:border-[#2ab2b2] outline-none w-full"
                            />
                            <button 
                                onClick={() => startDictation('title', handleTitleChange)}
                                className={`p-2 rounded-full ${recordingField === 'title' ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#2ab2b2]'}`}
                            >
                                <Mic size={16} />
                            </button>
                        </div>
                    ) : (
                        <h1 className="text-2xl font-black text-[#0f1a1a] dark:text-black mb-1">{content?.title}</h1>
                    )}
                    
                    <div className="flex justify-between items-end mt-4">
                        <p className="text-xs font-bold text-[#568f8f] dark:text-gray-600 uppercase tracking-widest">Name: ______________________</p>
                        <p className="text-xs font-bold text-[#568f8f] dark:text-gray-600 uppercase tracking-widest">Date: ________________</p>
                    </div>
                </div>

                <section className="bg-[#f0f4f5] dark:bg-gray-100 p-4 rounded-lg border border-[#2ab2b2]/10 print:border print:border-gray-300">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-[#2ab2b2] dark:text-[#2ab2b2]">Learning Objective</span>
                    </div>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <textarea 
                                value={content?.objective}
                                onChange={(e) => handleObjectiveChange(e.target.value)}
                                className="w-full bg-white dark:bg-white p-2 rounded border border-gray-200 text-sm font-medium text-[#0f1a1a] dark:text-black focus:ring-1 focus:ring-[#2ab2b2] outline-none resize-none"
                                rows={2}
                            />
                            <button 
                                onClick={() => startDictation('objective', handleObjectiveChange)}
                                className={`p-2 h-fit rounded-full ${recordingField === 'objective' ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#2ab2b2]'}`}
                            >
                                <Mic size={16} />
                            </button>
                        </div>
                    ) : (
                        <p className="text-sm font-medium leading-relaxed text-[#0f1a1a] dark:text-black">
                            {content?.objective}
                        </p>
                    )}
                </section>

                {content?.sections.map((section, sectionIdx) => (
                    <section key={sectionIdx} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#568f8f] dark:text-gray-600">{section.title}</h2>
                            <span className="text-[9px] font-bold text-[#2ab2b2] bg-[#2ab2b2]/10 px-2 py-0.5 rounded print:border print:border-gray-200">{section.items.length} Questions</span>
                        </div>
                        
                        {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="bg-white dark:bg-white p-4 rounded-lg custom-shadow border border-[#f0f4f5] dark:border-gray-200 flex flex-col gap-3 print:shadow-none print:border-gray-300">
                                <div className="flex justify-between items-start gap-2">
                                    <span className="font-bold text-sm mt-1 dark:text-black">{itemIdx + 1}.</span>
                                    
                                    {isEditing ? (
                                        <div className="flex-1 flex gap-2">
                                            <textarea
                                                value={item.question}
                                                onChange={(e) => handleContentChange(sectionIdx, itemIdx, 'question', e.target.value)}
                                                className="flex-1 p-2 rounded border border-gray-200 text-sm font-medium text-[#0f1a1a] dark:text-black focus:ring-1 focus:ring-[#2ab2b2] outline-none resize-none bg-gray-50"
                                                rows={2}
                                            />
                                            <button 
                                                onClick={() => startDictation(`q-${sectionIdx}-${itemIdx}`, (text) => handleContentChange(sectionIdx, itemIdx, 'question', text))}
                                                className={`p-2 h-fit rounded-full ${recordingField === `q-${sectionIdx}-${itemIdx}` ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#2ab2b2]'}`}
                                            >
                                                <Mic size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-sm font-medium leading-normal flex-1 dark:text-black">
                                            {item.question.replace(/\[(.*?)\]/g, '__________________')}
                                        </p>
                                    )}
                                </div>
                                {section.type === 'short-answer' && (
                                    <div className="w-full h-20 bg-[#f0f4f5] dark:bg-gray-50 rounded-lg border-2 border-dashed border-[#2ab2b2]/20 print:border-gray-300 ml-6"></div>
                                )}
                            </div>
                        ))}
                    </section>
                ))}
            </main>

            <div className="print-hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#1a1f23]/95 backdrop-blur-md border-t border-[#2ab2b2]/10 px-4 py-4 pb-safe">
                <div className="max-w-md mx-auto flex gap-3">
                    <button 
                        onClick={handlePrint}
                        className="flex-1 bg-[#2ab2b2] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#259c9c] transition-all active:scale-[0.98] shadow-lg shadow-[#2ab2b2]/20"
                    >
                        <Printer size={18} />
                        Export PDF
                    </button>
                    <button 
                        onClick={() => setShowScheduleModal(true)}
                        className="flex-1 bg-[#0f1a1a] dark:bg-gray-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
                    >
                        <Presentation size={18} />
                        Schedule
                    </button>
                </div>
            </div>

            {showScheduleModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in print-hidden">
                    <div className="bg-white dark:bg-[#1a1f23] w-full max-w-sm rounded-3xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-[#0f1a1a] dark:text-white">Schedule Worksheet</h3>
                            <button onClick={() => setShowScheduleModal(false)} className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500"><X size={20} /></button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Day</label>
                                <div className="flex gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                                        <button 
                                            key={d}
                                            onClick={() => setScheduleTime({...scheduleTime, day: d})}
                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${scheduleTime.day === d ? 'bg-[#2ab2b2] text-white border-[#2ab2b2]' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input 
                                        type="time" 
                                        value={scheduleTime.time}
                                        onChange={(e) => setScheduleTime({...scheduleTime, time: e.target.value})}
                                        className="w-full p-3 pl-9 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-bold focus:ring-2 focus:ring-[#2ab2b2] outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleSchedule}
                                className="w-full py-4 bg-[#2ab2b2] text-white rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-2 hover:bg-[#259c9c]"
                            >
                                <Calendar size={18} /> Confirm & Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorksheetGenerator;
