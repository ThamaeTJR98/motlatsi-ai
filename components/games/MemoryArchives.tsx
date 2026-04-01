
import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../../types';
import { aiClient } from '../../src/utils/aiClient';
import { safeJsonParse } from '../../utils/aiHelpers';
import { 
    ArrowLeft, RefreshCw, Trophy, Settings, Loader2, Brain, 
    CheckCircle2, Bot, Users, User, Cpu, Calculator, FlaskConical, 
    Globe, Briefcase, Play 
} from 'lucide-react';

interface MemoryArchivesProps {
    topic: Topic;
    difficulty: 'easy' | 'medium' | 'hard';
    onBack: () => void;
    onComplete: (score: number) => void;
    userGrade?: string;
}

interface Card {
    id: number;
    content: string;
    type: 'term' | 'definition';
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

type GameMode = 'solo' | 'cpu' | 'human';
type Player = 'p1' | 'p2';
type GameState = 'setup' | 'loading' | 'playing' | 'finished';

const SUBJECTS = [
    { id: 'math', name: 'Mathematics', icon: <Calculator size={20}/>, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', icon: <FlaskConical size={20}/>, color: 'bg-green-500' },
    { id: 'geo', name: 'Geography', icon: <Globe size={20}/>, color: 'bg-orange-500' },
    { id: 'acc', name: 'Accounting', icon: <Briefcase size={20}/>, color: 'bg-purple-500' },
];

const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

const MemoryArchives: React.FC<MemoryArchivesProps> = ({ topic, difficulty, onBack, onComplete, userGrade = 'General' }) => {
    // --- Config State ---
    const [gameState, setGameState] = useState<GameState>('setup');
    const [gameMode, setGameMode] = useState<GameMode>('solo');
    const [subjectFocus, setSubjectFocus] = useState<string>('math');
    
    // --- Gameplay State ---
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [isBoardLocked, setIsBoardLocked] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
    
    // --- Turn & Score ---
    const [turn, setTurn] = useState<Player>('p1');
    const [scores, setScores] = useState({ p1: 0, p2: 0 });
    const [combo, setCombo] = useState(1);
    
    // --- Refs for circular functions ---
    const revealCardRef = useRef<(index: number) => void>(() => {});
    const checkForMatchRef = useRef<(idx1: number, idx2: number) => void>(() => {});
    const makeCpuMoveRef = useRef<() => Promise<void>>(async () => {});
    const switchTurnRef = useRef<() => void>(() => {});

    // --- AI Brain ---
    // Stores { cardIndex: pairId } for cards the AI has "seen"
    const aiMemory = useRef<Map<number, number>>(new Map());

    // Layout
    const totalPairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
    
    // --- Game Logic: Start ---
    const startGame = async () => {
        setGameState('loading');
        setScores({ p1: 0, p2: 0 });
        setTurn('p1');
        setCombo(1);
        setFlippedIndices([]);
        aiMemory.current.clear();

        try {
            // Find subject name for prompt
            const subName = SUBJECTS.find(s => s.id === subjectFocus)?.name || "General Knowledge";
            
            const prompt = `
                Generate ${totalPairs} matching pairs for a memory card game.
                Target Audience: Grade ${userGrade} Student.
                Subject: ${subName}.
                
                If the topic "${topic.title}" is relevant to ${subName}, use it as the specific theme. 
                Otherwise, ignore the topic and generate core concepts/definitions for ${subName} at a Grade ${userGrade} level.
                
                Requirements:
                - One side is a Term/Concept.
                - Other side is a SHORT definition (max 6 words).
                - Ensure pairs are distinct and easy to match for this age group.
                - Ensure the topics are different from previous pairs: ${askedQuestions.join(', ')}
                
                Return JSON: [{ "term": "...", "definition": "..." }]
            `;

            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            const data = safeJsonParse<{term: string, definition: string}[]>(response.text);
            const pairs = data && data.length > 0 ? data.slice(0, totalPairs) : [];

            if (pairs.length === 0) {
                // Fallback
                const fallback = Array.from({length: totalPairs}).map((_, i) => ({
                    term: `Concept ${i+1}`, 
                    definition: `Def ${i+1}`
                }));
                setupBoard(fallback);
            } else {
                setupBoard(pairs);
                setAskedQuestions(prev => [...prev, ...pairs.map(p => p.term)]);
            }
        } catch (e) {
            // Fallback on error
            const fallback = Array.from({length: totalPairs}).map((_, i) => ({
                term: `Concept ${i+1}`, 
                definition: `Def ${i+1}`
            }));
            setupBoard(fallback);
        }
    };

    const setupBoard = (pairs: {term: string, definition: string}[]) => {
        const gameCards: Card[] = [];
        pairs.forEach((pair, index) => {
            gameCards.push({ id: index * 2, content: pair.term, type: 'term', pairId: index, isFlipped: false, isMatched: false });
            gameCards.push({ id: index * 2 + 1, content: pair.definition, type: 'definition', pairId: index, isFlipped: false, isMatched: false });
        });
        
        // Fisher-Yates Shuffle
        for (let i = gameCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
        }
        
        setCards(gameCards);
        setGameState('playing');
    };

    // --- Game Logic: Moves ---

    const handleCardClick = (index: number) => {
        // Prevent interaction if locked, matched, already flipped, or if CPU turn
        if (isBoardLocked || cards[index].isMatched || cards[index].isFlipped) return;
        if (gameMode === 'cpu' && turn === 'p2') return; 

        revealCardRef.current(index);
    };

    const revealCard = React.useCallback((index: number) => {
        // 1. Visually Flip
        setCards(prev => {
            const newCards = [...prev];
            newCards[index].isFlipped = true;
            return newCards;
        });

        // 2. Add to AI Memory (The AI sees everything flipped)
        aiMemory.current.set(index, cards[index].pairId);

        setFlippedIndices(prev => {
            const newFlipped = [...prev, index];
            // 3. Check for Pair
            if (newFlipped.length === 2) {
                setIsBoardLocked(true);
                checkForMatchRef.current(newFlipped[0], newFlipped[1]);
            }
            return newFlipped;
        });
    }, [cards]);

    const checkForMatch = React.useCallback((idx1: number, idx2: number) => {
        const isMatch = cards[idx1].pairId === cards[idx2].pairId;

        setTimeout(() => {
            if (isMatch) {
                // Match Found
                setCards(prev => prev.map((c, i) => 
                    i === idx1 || i === idx2 ? { ...c, isMatched: true, isFlipped: true } : c
                ));
                
                // Scoring
                const points = 100 * (turn === 'p1' && gameMode === 'solo' ? combo : 1);
                setScores(prev => ({ ...prev, [turn]: prev[turn] + points }));
                if (gameMode === 'solo') setCombo(c => Math.min(c + 0.5, 4));

                // Clean Memory
                aiMemory.current.delete(idx1);
                aiMemory.current.delete(idx2);

                // Check Win
                const allMatched = cards.every(c => c.isMatched || c.id === cards[idx1].id || c.id === cards[idx2].id);
                if (allMatched) {
                    setGameState('finished');
                } else {
                    // Turn Logic: In typical memory, if you match, you go again.
                    // For flow speed, let's keep turn unless solo.
                    setIsBoardLocked(false);
                    // Optional: If we want to switch turn even on match for difficulty
                    // switchTurn(); 
                    if (gameMode !== 'solo') {
                         // Keep turn if match? Or switch? Let's keep turn for reward.
                         setIsBoardLocked(false);
                         // If it's CPU turn and they matched, trigger CPU again
                         if (gameMode === 'cpu' && turn === 'p2') {
                             setTimeout(makeCpuMoveRef.current, 1000);
                         }
                    }
                }
            } else {
                // No Match
                setCards(prev => prev.map((c, i) => 
                    i === idx1 || i === idx2 ? { ...c, isFlipped: false } : c
                ));
                if (gameMode === 'solo') setCombo(1);
                switchTurnRef.current();
            }
            
            setFlippedIndices([]);
        }, 1000);
    }, [cards, turn, gameMode, combo]);

    const switchTurn = React.useCallback(() => {
        setTurn(prev => prev === 'p1' ? 'p2' : 'p1');
        setIsBoardLocked(false);
    }, []);

    // --- AI Logic ---
    const makeCpuMove = async () => {
        setIsBoardLocked(true);
        
        const memory = aiMemory.current;
        const availableIndices = cards.map((c, i) => !c.isMatched && !c.isFlipped ? i : -1).filter(i => i !== -1);
        
        if (availableIndices.length === 0) return;

        let firstMove = -1;
        let secondMove = -1;

        // Strategy 1: Check Memory for a known pair
        const knownPairs: {[key: number]: number[]} = {};
        memory.forEach((pairId, idx) => {
            if (cards[idx].isMatched) return;
            if (!knownPairs[pairId]) knownPairs[pairId] = [];
            knownPairs[pairId].push(idx);
        });

        const actionablePairId = Object.keys(knownPairs).find(pid => knownPairs[parseInt(pid)].length === 2);

        if (actionablePairId) {
            // AI knows a pair!
            [firstMove, secondMove] = knownPairs[parseInt(actionablePairId)];
        } else {
            // Strategy 2: Pick random, check if match is in memory
            firstMove = availableIndices[getRandomIndex(availableIndices.length)];
            
            const card1PairId = cards[firstMove].pairId;
            let knownPartnerIdx = -1;
            
            memory.forEach((pairId, idx) => {
                if (!cards[idx].isMatched && idx !== firstMove && pairId === card1PairId) {
                    knownPartnerIdx = idx;
                }
            });
 
            if (knownPartnerIdx !== -1) {
                // AI found match in memory after picking first card
                secondMove = knownPartnerIdx;
            } else {
                // Random second guess
                const remaining = availableIndices.filter(i => i !== firstMove);
                if (remaining.length > 0) {
                     secondMove = remaining[getRandomIndex(remaining.length)];
                } else {
                     secondMove = firstMove; // Should not happen given game logic
                }
            }
        }

        // Execute
        revealCardRef.current(firstMove);
        await new Promise(r => setTimeout(r, 800));
        revealCardRef.current(secondMove);
    };

    React.useEffect(() => {
        makeCpuMoveRef.current = makeCpuMove;
    });

    useEffect(() => {
        revealCardRef.current = revealCard;
        checkForMatchRef.current = checkForMatch;
        switchTurnRef.current = switchTurn;
    }, [revealCard, checkForMatch, switchTurn]);

    useEffect(() => {
        if (gameState === 'playing' && gameMode === 'cpu' && turn === 'p2' && !isBoardLocked) {
            const timer = setTimeout(() => makeCpuMoveRef.current(), 1000);
            return () => clearTimeout(timer);
        }
    }, [turn, gameState, isBoardLocked, gameMode]);

    // --- RENDERERS ---

    // 1. SETUP SCREEN
    if (gameState === 'setup') {
        return (
            <div className="absolute inset-0 z-50 bg-[#0B1026] flex items-center justify-center p-6 text-white font-sans">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in-95">
                    <div className="text-center mb-8">
                        <Brain size={48} className="text-[#2b8cee] mx-auto mb-4" />
                        <h1 className="text-3xl font-black uppercase tracking-tight">Memory Archives</h1>
                        <p className="text-blue-200 text-sm font-bold mt-2">Reconstruct the data fragments.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Subject Selection */}
                        <div>
                            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest block mb-2">Data Source</label>
                            <div className="grid grid-cols-2 gap-2">
                                {SUBJECTS.map(s => (
                                    <button 
                                        key={s.id}
                                        onClick={() => setSubjectFocus(s.id)}
                                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${subjectFocus === s.id ? 'bg-blue-600 border-blue-400 shadow-lg' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                                    >
                                        <div className={`p-1.5 rounded-lg ${s.color} text-white shrink-0`}>{s.icon}</div>
                                        <span className="text-[10px] font-bold truncate">{s.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Protocol</label>
                            <div className="flex bg-slate-800 p-1 rounded-xl">
                                <button onClick={() => setGameMode('solo')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'solo' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <User size={14}/> Solo
                                </button>
                                <button onClick={() => setGameMode('cpu')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'cpu' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <Cpu size={14}/> Vs AI
                                </button>
                                <button onClick={() => setGameMode('human')} className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'human' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                                    <Users size={14}/> 1v1
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={startGame}
                            className="w-full bg-[#2b8cee] hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Play fill="currentColor" /> Initialize
                        </button>
                        
                         <button onClick={onBack} className="w-full py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                            Abort
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. LOADING
    if (gameState === 'loading') {
        return (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f6f7f8] dark:bg-[#101922]">
                <Loader2 className="animate-spin text-[#2b8cee] mb-4" size={48} />
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest animate-pulse">Decrypting Archives...</p>
            </div>
        );
    }

    // 3. FINISHED
    if (gameState === 'finished') {
        const p1Win = scores.p1 >= scores.p2;
        return (
            <div className="flex flex-col items-center justify-center h-full bg-[#f6f7f8] dark:bg-[#101922] p-6 text-center animate-in zoom-in-95">
                 <div className="relative mb-6">
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="size-28 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center shadow-xl relative z-10 border-4 border-white dark:border-slate-800">
                        <Trophy size={50} className="text-white drop-shadow-md" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-black text-[#111418] dark:text-white mb-2">
                    {gameMode === 'solo' ? 'Archive Restored!' : (p1Win ? 'Player 1 Wins!' : 'Player 2 Wins!')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium">
                    {gameMode === 'solo' ? `Final Score: ${scores.p1}` : `${scores.p1} - ${scores.p2}`}
                </p>
                
                <div className="flex gap-3 w-full max-w-xs">
                    <button onClick={onBack} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-sm">Exit</button>
                    <button onClick={() => onComplete(scores.p1)} className="flex-1 py-3 bg-[#2b8cee] text-white font-bold rounded-xl shadow-lg text-sm">Finish</button>
                </div>
            </div>
        );
    }

    // 4. GAME BOARD
    return (
        <div className="flex flex-col h-[100dvh] bg-[#f6f7f8] dark:bg-[#101922] font-display overflow-hidden select-none relative">
            <style>{`
                .iridescent-tile { background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%); }
                .dark .iridescent-tile { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .active-player-glow { box-shadow: 0 0 0 2px #2b8cee, 0 0 15px rgba(43, 140, 238, 0.4); }
                .p2-glow { box-shadow: 0 0 0 2px #f59e0b, 0 0 15px rgba(245, 158, 11, 0.4); }
            `}</style>

            {/* Header */}
            <header className="px-4 py-3 flex items-center justify-between shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 z-20">
                <button onClick={onBack} className="size-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300">
                    <ArrowLeft size={18} />
                </button>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                     {gameMode === 'solo' ? <User size={14} className="text-slate-500"/> : gameMode === 'cpu' ? <Bot size={14} className="text-slate-500"/> : <Users size={14} className="text-slate-500"/>}
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{gameMode === 'solo' ? 'Solo' : gameMode === 'cpu' ? 'Vs AI' : '2 Player'}</span>
                </div>
                <div className="size-9"></div> {/* Spacer */}
            </header>

            {/* Grid */}
            <main className="flex-1 flex flex-col p-2 min-h-0 relative z-10 items-center justify-center">
                <div className="grid gap-2 w-full max-w-lg aspect-[3/4] sm:aspect-square" 
                     style={{ gridTemplateColumns: `repeat(4, 1fr)`, gridTemplateRows: `repeat(${Math.ceil((totalPairs * 2)/4)}, 1fr)` }}>
                    {cards.map((card, index) => (
                        <div 
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className="relative w-full h-full perspective-1000 cursor-pointer group"
                        >
                            <div className={`w-full h-full transition-all duration-500 preserve-3d relative ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden iridescent-tile rounded-xl border border-white/60 dark:border-slate-700 shadow-sm flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                                    <Brain size={20} className="text-[#2b8cee]/20 dark:text-white/10" />
                                </div>
                                {/* Back */}
                                <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-slate-700 rounded-xl flex flex-col items-center justify-center p-1 text-center shadow-md border-2 overflow-hidden ${card.isMatched ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-[#2b8cee] dark:border-blue-500'}`}>
                                    <p className={`font-bold leading-tight select-none break-words w-full px-1 ${card.content.length > 20 ? 'text-[9px]' : 'text-[10px]'} ${card.isMatched ? 'text-green-700 dark:text-green-300' : 'text-[#2b8cee] dark:text-blue-300'}`}>
                                        {card.content}
                                    </p>
                                    {card.isMatched && (
                                        <div className="absolute top-1 right-1 text-green-500 animate-in zoom-in duration-300">
                                            <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Score Bar */}
            <div className="p-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3 max-w-lg mx-auto">
                    {/* Player 1 */}
                    <div className={`flex-1 rounded-2xl p-2.5 flex items-center justify-between transition-all duration-300 ${turn === 'p1' ? 'bg-[#2b8cee] text-white active-player-glow' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 opacity-60'}`}>
                        <div className="flex items-center gap-2">
                            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${turn === 'p1' ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>P1</div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{gameMode === 'solo' ? 'Score' : 'Player 1'}</span>
                                <span className="text-lg font-black leading-none">{scores.p1}</span>
                            </div>
                        </div>
                    </div>

                    {/* Player 2 / CPU */}
                    {gameMode !== 'solo' && (
                         <div className={`flex-1 rounded-2xl p-2.5 flex items-center justify-between transition-all duration-300 ${turn === 'p2' ? 'bg-[#f59e0b] text-white p2-glow' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 opacity-60'}`}>
                            <div className="flex items-center gap-2">
                                <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${turn === 'p2' ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    {gameMode === 'cpu' ? <Bot size={14}/> : 'P2'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{gameMode === 'cpu' ? 'AI Bot' : 'Player 2'}</span>
                                    <span className="text-lg font-black leading-none">{scores.p2}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Solo Combo */}
                    {gameMode === 'solo' && (
                        <div className="w-24 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-2.5 flex flex-col items-center justify-center">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Combo</span>
                            <span className="text-lg font-black text-slate-700 dark:text-white">{combo}x</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoryArchives;
