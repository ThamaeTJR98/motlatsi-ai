
import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../../types';
import { aiClient } from '../../src/utils/aiClient';
import { safeJsonParse } from '../../utils/aiHelpers';
import { 
    ArrowLeft, RefreshCw, Trophy, Lightbulb, Shuffle, Check, X, 
    Loader2, Users, User, Bot, Calculator, FlaskConical, Globe, Briefcase, Play, Timer
} from 'lucide-react';

interface WordScrambleProps {
    topic: Topic;
    onBack: () => void;
    onComplete: (score: number) => void;
    difficulty: 'easy' | 'medium' | 'hard';
    userGrade?: string;
}

interface GameRound {
    word: string;
    hint: string;
}

type GameMode = 'solo' | 'cpu' | 'human';
type Player = 'p1' | 'p2';
type GameState = 'setup' | 'loading' | 'playing' | 'turn_switch' | 'gameover';

const SUBJECTS = [
    { id: 'math', name: 'Mathematics', icon: <Calculator size={20}/>, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', icon: <FlaskConical size={20}/>, color: 'bg-green-500' },
    { id: 'geo', name: 'Geography', icon: <Globe size={20}/>, color: 'bg-orange-500' },
    { id: 'acc', name: 'Accounting', icon: <Briefcase size={20}/>, color: 'bg-purple-500' },
];

const WordScramble: React.FC<WordScrambleProps> = ({ topic, onBack, onComplete, difficulty, userGrade = 'General' }) => {
    // --- Config State ---
    const [gameState, setGameState] = useState<GameState>('setup');
    const [gameMode, setGameMode] = useState<GameMode>('solo');
    const [subjectFocus, setSubjectFocus] = useState<string>('science');

    // --- Gameplay State ---
    const [round, setRound] = useState<GameRound | null>(null);
    const [scrambledLetters, setScrambledLetters] = useState<{id: number, char: string}[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<{id: number, char: string}[]>([]);
    const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
    
    // --- Turn & Score ---
    const [turn, setTurn] = useState<Player>('p1');
    const [scores, setScores] = useState({ p1: 0, p2: 0 });
    const [roundCount, setRoundCount] = useState(0);
    const MAX_ROUNDS = 3; // Rounds per player in competitive mode

    // --- Solo Specific ---
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);

    // --- Visuals ---
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    
    // AI Turn Ref
    const aiTimeoutRef = useRef<number | null>(null);

    // --- Initialization ---
    const startGame = () => {
        setScores({ p1: 0, p2: 0 });
        setRoundCount(0);
        setLives(3);
        setStreak(0);
        setTurn('p1');
        loadNewRound();
    };

    // --- Round Management ---
    const loadNewRound = async () => {
        setLoading(true);
        setScrambledLetters([]);
        setSelectedLetters([]);
        setStatusMessage(null);

        // Check Win Condition for Competitive
        if (gameMode !== 'solo' && roundCount >= MAX_ROUNDS * 2) {
            setGameState('gameover');
            setLoading(false);
            return;
        }

        // Handle AI Turn
        if (gameMode === 'cpu' && turn === 'p2') {
            setGameState('playing');
            setLoading(false);
            simulateAiTurn();
            return;
        }
        
        // Handle Human Turn (P1 or P2)
        try {
            const subName = SUBJECTS.find(s => s.id === subjectFocus)?.name || "General Knowledge";
            const prompt = `
                Generate a single word puzzle.
                Context: Grade ${userGrade} ${subName}.
                Topic: ${topic.title}.
                Difficulty: ${difficulty}.
                PREVIOUS WORDS (DO NOT REPEAT): ${askedQuestions.join(', ')}
                
                Return JSON:
                {
                    "word": "SINGLE_WORD_UPPERCASE",
                    "hint": "A clear definition or clue."
                }
            `;

            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            const data = safeJsonParse<GameRound>(response.text);
            if (data && data.word) {
                const cleanWord = data.word.toUpperCase().replace(/[^A-Z]/g, '');
                setRound({ ...data, word: cleanWord });
                scrambleWord(cleanWord);
                setGameState('playing');
                setAskedQuestions(prev => [...prev, cleanWord]);
            } else {
                throw new Error("Invalid data");
            }
        } catch (e) {
            // Fallback
            const fallbackWord = "ENERGY";
            setRound({ word: fallbackWord, hint: "The capacity to do work." });
            scrambleWord(fallbackWord);
            setGameState('playing');
        } finally {
            setLoading(false);
        }
    };

    const scrambleWord = (word: string) => {
        const letters = word.split('').map((char, i) => ({ id: i, char }));
        // Fisher-Yates shuffle
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setScrambledLetters(letters);
    };

    // --- AI Simulation ---
    const simulateAiTurn = () => {
        // AI "Thinking"
        const thinkTime = difficulty === 'easy' ? 4000 : difficulty === 'medium' ? 3000 : 2000;
        
        if (aiTimeoutRef.current) clearTimeout(aiTimeoutRef.current);

        aiTimeoutRef.current = window.setTimeout(() => {
            // AI Success Chance
            const successRate = difficulty === 'easy' ? 0.6 : difficulty === 'medium' ? 0.8 : 0.95;
            const isSuccess = Math.random() < successRate;

            if (isSuccess) {
                const points = 100 + (Math.random() * 50); // Random bonus
                setScores(prev => ({ ...prev, p2: Math.round(prev.p2 + points) }));
                setStatusMessage("Opponent solved it!");
            } else {
                setStatusMessage("Opponent failed!");
            }
            
            setTimeout(() => {
                setTurn('p1');
                setRoundCount(c => c + 1);
                loadNewRound();
            }, 1500);

        }, thinkTime);
    };

    // --- Interactions ---

    const handleLetterClick = (item: {id: number, char: string}) => {
        if (gameMode === 'cpu' && turn === 'p2') return; 
        setScrambledLetters(prev => prev.filter(l => l.id !== item.id));
        setSelectedLetters(prev => [...prev, item]);
    };

    const handleSlotClick = (item: {id: number, char: string}) => {
        if (gameMode === 'cpu' && turn === 'p2') return;
        setSelectedLetters(prev => prev.filter(l => l.id !== item.id));
        setScrambledLetters(prev => [...prev, item]);
    };

    const handleShuffle = () => {
        const current = [...scrambledLetters];
        for (let i = current.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [current[i], current[j]] = [current[j], current[i]];
        }
        setScrambledLetters(current);
    };

    const handleCheck = () => {
        if (!round) return;
        
        const currentWord = selectedLetters.map(l => l.char).join('');
        if (currentWord === round.word) {
            // Success
            setStatusMessage("Correct!");
            const points = 100 + (streak * 10);
            
            setScores(prev => ({ ...prev, [turn]: Math.round(prev[turn] + points) }));
            setStreak(s => s + 1);

            setTimeout(() => {
                if (gameMode === 'solo') {
                    loadNewRound();
                } else {
                    const nextTurn = turn === 'p1' ? 'p2' : 'p1';
                    setTurn(nextTurn);
                    setRoundCount(c => c + 1);
                    
                    if (gameMode === 'human') {
                         setGameState('turn_switch');
                    } else {
                         loadNewRound();
                    }
                }
            }, 1000);
        } else {
            // Fail
            setShake(true);
            setTimeout(() => setShake(false), 500);
            
            if (gameMode === 'solo') {
                setLives(l => l - 1);
                setStreak(0);
                if (lives <= 1) {
                    setGameState('gameover');
                }
            } else {
                // In PVP, wrong answer passes turn with no points
                setStatusMessage("Wrong!");
                setTimeout(() => {
                    const nextTurn = turn === 'p1' ? 'p2' : 'p1';
                    setTurn(nextTurn);
                    setRoundCount(c => c + 1);
                    if (gameMode === 'human') setGameState('turn_switch');
                    else loadNewRound();
                }, 1000);
            }
        }
    };

    const handleClear = () => {
        const all = [...selectedLetters, ...scrambledLetters];
        setScrambledLetters(all);
        setSelectedLetters([]);
    };

    // --- RENDERERS ---

    // 1. SETUP SCREEN
    if (gameState === 'setup') {
        return (
            <div className="absolute inset-0 z-50 bg-[#0B1026] flex items-center justify-center p-6 text-white font-sans">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in-95">
                    <div className="text-center mb-8">
                        <Trophy size={48} className="text-emerald-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-black uppercase tracking-tight">Lingo Links</h1>
                        <p className="text-blue-200 text-sm font-bold mt-2">Unscramble the terminology.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Subject Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Domain</label>
                            <div className="grid grid-cols-2 gap-2">
                                {SUBJECTS.map(s => (
                                    <button 
                                        key={s.id}
                                        onClick={() => setSubjectFocus(s.id)}
                                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-left ${subjectFocus === s.id ? 'bg-emerald-600 border-emerald-400 shadow-lg' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                                    >
                                        <div className={`p-1.5 rounded-lg ${s.color} text-white shrink-0`}>{s.icon}</div>
                                        <span className="text-[10px] font-bold truncate">{s.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Mode</label>
                            <div className="flex bg-slate-800 p-1 rounded-xl">
                                <button onClick={() => setGameMode('solo')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'solo' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <User size={14}/> Solo
                                </button>
                                <button onClick={() => setGameMode('cpu')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'cpu' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <Bot size={14}/> Vs AI
                                </button>
                                <button onClick={() => setGameMode('human')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'human' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <Users size={14}/> 1v1
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={startGame}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Play fill="currentColor" /> Start Game
                        </button>
                        
                         <button onClick={onBack} className="w-full py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. TURN SWITCH (Human)
    if (gameState === 'turn_switch') {
        return (
            <div className="absolute inset-0 z-50 bg-[#1e293b] flex flex-col items-center justify-center p-6 text-center text-white">
                <Users size={64} className="text-emerald-400 mb-6" />
                <h2 className="text-2xl font-bold mb-2">Pass Device</h2>
                <p className="text-slate-400 mb-8">It's Player {turn === 'p1' ? '1' : '2'}'s turn to solve.</p>
                <button 
                    onClick={() => loadNewRound()}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg"
                >
                    I am Player {turn === 'p1' ? '1' : '2'}
                </button>
            </div>
        );
    }

    // 3. GAME OVER
    if (gameState === 'gameover') {
        const p1Win = scores.p1 >= scores.p2;
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 text-center animate-in fade-in">
                <div className="relative mb-6">
                     <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                     <Trophy size={80} className="text-yellow-400 relative z-10" />
                </div>
                
                <h2 className="text-4xl font-black mb-2">
                    {gameMode === 'solo' ? 'Game Over' : (p1Win ? 'Player 1 Wins!' : 'Player 2 Wins!')}
                </h2>
                
                {gameMode === 'solo' ? (
                    <p className="text-slate-400 mb-8 text-lg">Final Score: <span className="text-white font-bold">{scores.p1}</span></p>
                ) : (
                    <div className="flex gap-8 mb-8 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase font-bold">Player 1</p>
                            <p className="text-2xl font-black text-blue-400">{scores.p1}</p>
                        </div>
                        <div className="w-px bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase font-bold">{gameMode === 'cpu' ? 'AI Bot' : 'Player 2'}</p>
                            <p className="text-2xl font-black text-orange-400">{scores.p2}</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 w-full max-w-xs">
                    <button onClick={onBack} className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 border border-slate-700">Exit</button>
                    <button onClick={startGame} className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/20">Play Again</button>
                </div>
            </div>
        );
    }

    // 4. LOADING SPINNER
    if (loading && !round && gameMode === 'solo') {
         return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 dark:bg-slate-900">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                <p className="text-indigo-800 dark:text-indigo-300 font-bold uppercase tracking-widest text-xs">Mixing Letters...</p>
            </div>
        );
    }

    // 5. MAIN GAME
    const isAiTurn = gameMode === 'cpu' && turn === 'p2';

    return (
        <div className="flex flex-col h-full min-h-screen bg-[#f0f4ff] dark:bg-[#1a1f2e] font-sans overflow-hidden relative select-none">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-[#1a1f2e]/90 backdrop-blur-md border-b border-indigo-100 dark:border-slate-700 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors">
                        <ArrowLeft size={24} className="text-indigo-900 dark:text-white" />
                    </button>
                    <div>
                        <h1 className="text-sm font-black text-indigo-900 dark:text-white uppercase tracking-wider">Lingo Links</h1>
                        <p className="text-[10px] text-indigo-400 font-bold">
                            {gameMode === 'solo' ? `Streak: ${streak}` : `Round ${Math.ceil((roundCount+1)/2)}`}
                        </p>
                    </div>
                </div>
                
                {gameMode === 'solo' ? (
                     <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-2 w-6 rounded-full transition-colors ${i <= lives ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-xs font-bold">
                        <span className={`px-2 py-1 rounded-md ${turn === 'p1' ? 'bg-blue-100 text-blue-700' : 'text-slate-400'}`}>P1: {scores.p1}</span>
                        <span className={`px-2 py-1 rounded-md ${turn === 'p2' ? 'bg-orange-100 text-orange-700' : 'text-slate-400'}`}>{gameMode === 'cpu' ? 'AI' : 'P2'}: {scores.p2}</span>
                    </div>
                )}
            </header>

            {/* Game Area */}
            <main className="flex-1 flex flex-col items-center p-6 w-full max-w-lg mx-auto relative">
                
                {statusMessage && (
                    <div className="absolute top-4 z-20 bg-black/80 text-white px-6 py-2 rounded-full font-bold animate-in fade-in slide-in-from-top-4">
                        {statusMessage}
                    </div>
                )}

                {isAiTurn ? (
                     <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Bot size={80} className="text-indigo-300 animate-bounce mb-6" />
                        <h2 className="text-2xl font-bold text-indigo-900 dark:text-white mb-2">Opponent Thinking...</h2>
                        <div className="flex gap-1 justify-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                     </div>
                ) : (
                    <>
                        {/* Hint Card */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-indigo-50 dark:border-slate-700 w-full mb-10 text-center relative mt-4">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 p-2 rounded-xl shadow-sm">
                                <Lightbulb size={20} fill="currentColor" />
                            </div>
                            <p className="mt-2 text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">"{round?.hint}"</p>
                        </div>

                        {/* Answer Slots */}
                        <div className={`flex gap-2 mb-12 flex-wrap justify-center ${shake ? 'animate-shake' : ''}`}>
                            {round?.word.split('').map((_, i) => {
                                const letter = selectedLetters[i];
                                return (
                                    <button
                                        key={i}
                                        onClick={() => letter && handleSlotClick(letter)}
                                        className={`size-12 sm:size-14 rounded-xl border-b-4 text-2xl font-black flex items-center justify-center transition-all 
                                            ${letter 
                                                ? 'bg-indigo-500 border-indigo-700 text-white shadow-lg transform -translate-y-1' 
                                                : 'bg-indigo-100 dark:bg-slate-800 border-indigo-200 dark:border-slate-700 text-transparent'
                                            }
                                        `}
                                    >
                                        {letter?.char}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Letter Pool */}
                        <div className="flex gap-2 flex-wrap justify-center mb-auto">
                            {scrambledLetters.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleLetterClick(item)}
                                    className="size-12 sm:size-14 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl border-b-4 border-slate-200 dark:border-slate-900 font-black text-xl shadow-sm active:border-b-0 active:translate-y-1 transition-all hover:bg-slate-50 dark:hover:bg-slate-600"
                                >
                                    {item.char}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="w-full grid grid-cols-4 gap-3 mt-6">
                            <button onClick={handleShuffle} className="col-span-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl flex flex-col items-center justify-center h-16 active:scale-95 transition-transform">
                                <Shuffle size={20} />
                                <span className="text-[10px] font-bold uppercase mt-1">Mix</span>
                            </button>
                            <button onClick={handleCheck} className="col-span-2 bg-indigo-500 text-white rounded-2xl flex items-center justify-center gap-2 h-16 shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform text-lg font-black tracking-wide hover:bg-indigo-600">
                                SUBMIT <Check size={24} strokeWidth={3} />
                            </button>
                            <button onClick={handleClear} className="col-span-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl flex flex-col items-center justify-center h-16 active:scale-95 transition-transform">
                                <X size={20} />
                                <span className="text-[10px] font-bold uppercase mt-1">Clear</span>
                            </button>
                        </div>
                    </>
                )}
            </main>
            
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
};

export default WordScramble;
