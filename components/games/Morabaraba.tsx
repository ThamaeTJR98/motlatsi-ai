
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Trophy, AlertCircle, Loader2, Target, ShieldAlert, Users, Brain, Briefcase, Globe, Calculator, FlaskConical, User, Cpu, Check, X, Lock, Footprints, Plane, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';
import { Topic } from '../../types';
import { aiClient } from '../../src/utils/aiClient';
import { safeJsonParse } from '../../utils/aiHelpers';
import { allGrades } from '../../curriculum';

interface MorabarabaProps {
    topic: Topic;
    onBack: () => void;
    onComplete: (score: number) => void;
    difficulty: 'easy' | 'medium' | 'hard';
    userGrade?: string;
}

type Player = 'player' | 'opponent';
type Phase = 'placing' | 'moving' | 'flying';
type BoardState = (Player | null)[];
type MoveType = 'attack' | 'defense' | 'standard' | 'flying_attack';
type GameMode = 'pve' | 'pvp';

interface PendingMove {
    targetIndex: number; 
    sourceIndex?: number; 
    moveType: MoveType;
}

interface Challenge {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    context?: string; 
    topicTitle?: string;
}

interface MissedConcept {
    topic: string;
    advice: string;
}

const XP_RATES = {
    ROUTINE: 1,
    CORRECT_EASY: 2,
    CORRECT_MED: 3,
    CORRECT_HARD: 5,
    FORM_MILL: 5,
    WIN: 20,
    LEARNED: 1 // Consolation for reading explanation
};

// 25 Positions Adjacency Graph
const ADJACENCY = [
    // Outer (0-7)
    [1, 7], [0, 2, 9], [1, 3], [2, 4, 11], [3, 5], [4, 6, 13], [5, 7], [0, 6, 8], 
    // Middle (8-15)
    [7, 9, 15], [1, 8, 10, 17], [9, 11], [3, 10, 12, 19], [11, 13], [5, 12, 14, 21], [13, 15], [8, 14], 
    // Inner (16-23)
    [17, 23], 
    [9, 16, 18, 24], 
    [17, 19], 
    [11, 18, 20, 24], 
    [19, 21], 
    [13, 20, 22, 24], 
    [21, 23], 
    [15, 16, 22, 24], 
    // Center (24)
    [17, 19, 21, 23] 
];

// Mill Combinations
const MILLS = [
    [0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 0], 
    [8, 9, 10], [10, 11, 12], [12, 13, 14], [14, 15, 8], 
    [16, 17, 18], [18, 19, 20], [20, 21, 22], [22, 23, 16], 
    [1, 9, 17], [3, 11, 19], [5, 13, 21], [7, 15, 23], 
    [17, 24, 21], [23, 24, 19] 
];

// Visual Coordinates (0-100%)
const COORDS = [
    {x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 0}, 
    {x: 100, y: 50}, {x: 100, y: 100}, {x: 50, y: 100}, 
    {x: 0, y: 100}, {x: 0, y: 50},                 
    {x: 16.6, y: 16.6}, {x: 50, y: 16.6}, {x: 83.4, y: 16.6}, 
    {x: 83.4, y: 50}, {x: 83.4, y: 83.4}, {x: 50, y: 83.4},   
    {x: 16.6, y: 83.4}, {x: 16.6, y: 50},                     
    {x: 33.3, y: 33.3}, {x: 50, y: 33.3}, {x: 66.6, y: 33.3}, 
    {x: 66.6, y: 50}, {x: 66.6, y: 66.6}, {x: 50, y: 66.6},   
    {x: 33.3, y: 66.6}, {x: 33.3, y: 50},
    {x: 50, y: 50} 
];

const SUBJECTS = [
    { id: 'math', name: 'Mathematics', icon: <Calculator size={20}/>, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', icon: <FlaskConical size={20}/>, color: 'bg-green-500' },
    { id: 'geo', name: 'Geography', icon: <Globe size={20}/>, color: 'bg-orange-500' },
    { id: 'acc', name: 'Accounting', icon: <Briefcase size={20}/>, color: 'bg-purple-500' },
];

const Morabaraba: React.FC<MorabarabaProps> = ({ topic, onBack, onComplete, difficulty, userGrade = '6' }) => {
    // --- Config State ---
    const [gameMode, setGameMode] = useState<GameMode>('pve');
    const [subjectFocus, setSubjectFocus] = useState<string | null>(null);
    const [showSetupModal, setShowSetupModal] = useState(true);

    // --- Gameplay State ---
    const [board, setBoard] = useState<BoardState>(Array(25).fill(null));
    const [turn, setTurn] = useState<Player>('player'); 
    const [phase, setPhase] = useState<Phase>('placing');
    
    // Inventory
    const [playerCowsHand, setPlayerCowsHand] = useState(12);
    const [opponentCowsHand, setOpponentCowsHand] = useState(12);
    const [playerCowsCaptured, setPlayerCowsCaptured] = useState(0);
    const [opponentCowsCaptured, setOpponentCowsCaptured] = useState(0);
    
    // UI Interaction
    const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
    const [removeMode, setRemoveMode] = useState(false);
    const [blockedNodes, setBlockedNodes] = useState<number[]>([]); // The "Strategic Block"
    
    // Outcomes
    const [winner, setWinner] = useState<Player | null>(null);
    const [totalXP, setTotalXP] = useState(0);
    const [message, setMessage] = useState("Place your cows to begin.");

    // --- Educational Layer ---
    const [pendingMove, setPendingMove] = useState<PendingMove | null>(null);
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [showChallenge, setShowChallenge] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false); // Teachable moment modal
    const [isGenerating, setIsGenerating] = useState(false);
    const [userSelectedIndex, setUserSelectedIndex] = useState<number | null>(null);
    const [missedConcepts, setMissedConcepts] = useState<MissedConcept[]>([]);
    const [askedQuestions, setAskedQuestions] = useState<string[]>([]);

    // Derived State
    const playerCowsBoard = board.filter(c => c === 'player').length;
    const opponentCowsBoard = board.filter(c => c === 'opponent').length;

    // Reset blocked nodes on turn change
    useEffect(() => {
        setBlockedNodes([]);
    }, [turn]);

    // Check Phase Transition
    useEffect(() => {
        if (playerCowsHand === 0 && opponentCowsHand === 0 && phase === 'placing') {
            setPhase('moving');
            setMessage("Deployment complete. Move cows to adjacent spots.");
        }
        
        // Check for Flying Phase
        if (phase === 'moving') {
             if (turn === 'player' && playerCowsBoard <= 3) setMessage("You are down to 3 cows! You can now FLY to any spot.");
             if (turn === 'opponent' && opponentCowsBoard <= 3) setMessage("Opponent can now FLY.");
        }
    }, [playerCowsHand, opponentCowsHand, playerCowsBoard, opponentCowsBoard, turn, phase]);


    // --- CORE GAMEPLAY FUNCTIONS ---

    const startGame = (subjectId: string, mode: GameMode) => {
        setSubjectFocus(subjectId);
        setGameMode(mode);
        setShowSetupModal(false);
    };

    const checkMill = (index: number, player: Player, currentBoard: BoardState): boolean => {
        const relevantMills = MILLS.filter(m => m.includes(index));
        return relevantMills.some(mill => mill.every(pos => currentBoard[pos] === player));
    };

    // Does the current player have any valid moves?
    const hasValidMoves = (player: Player): boolean => {
        const boardCount = player === 'player' ? playerCowsBoard : opponentCowsBoard;
        const handCount = player === 'player' ? playerCowsHand : opponentCowsHand;
        
        // If placing, always yes unless board full (unlikely)
        if (handCount > 0) return true;

        // If flying, can move to any empty spot
        if (boardCount <= 3) {
            return board.some(cell => cell === null);
        }

        // If moving, check adjacency
        for (let i = 0; i < 25; i++) {
            if (board[i] === player) {
                const neighbors = ADJACENCY[i];
                if (neighbors.some(n => board[n] === null)) return true;
            }
        }
        return false;
    };

    const switchTurn = () => {
        setTurn(prev => prev === 'player' ? 'opponent' : 'player');
    };

    // Is this a Critical Move? (Attack or Defense)
    const analyzeMoveType = (targetIndex: number, player: Player, sourceIndex?: number): MoveType => {
        const boardAfterMove = [...board];
        if (sourceIndex !== undefined) boardAfterMove[sourceIndex] = null;
        boardAfterMove[targetIndex] = player;
        
        // 1. Attack: Does this move form a mill?
        if (checkMill(targetIndex, player, boardAfterMove)) return 'attack';

        // 2. Defense: Would the opponent have formed a mill here?
        const opponent = player === 'player' ? 'opponent' : 'player';
        const boardIfOpponentPlayed = [...board];
        boardIfOpponentPlayed[targetIndex] = opponent; // Hypothetical opponent move
        if (checkMill(targetIndex, opponent, boardIfOpponentPlayed)) return 'defense';

        return 'standard';
    };

    // Execute Move & Handle Consequences
    const executeMove = (move: PendingMove) => {
        const newBoard = [...board];
        const currentPlayer = turn;

        // 1. Update Board
        if (phase === 'placing') {
            newBoard[move.targetIndex] = currentPlayer;
            if (currentPlayer === 'player') setPlayerCowsHand(h => h - 1);
            else setOpponentCowsHand(h => h - 1);
        } else {
            if (move.sourceIndex !== undefined) newBoard[move.sourceIndex] = null;
            newBoard[move.targetIndex] = currentPlayer;
            setSelectedPiece(null);
        }

        const formedMill = checkMill(move.targetIndex, currentPlayer, newBoard);
        setBoard(newBoard);

        // 2. Award XP
        if (currentPlayer === 'player') {
             if (move.moveType === 'standard') setTotalXP(x => x + XP_RATES.ROUTINE);
             if (formedMill) setTotalXP(x => x + XP_RATES.FORM_MILL);
        }

        // 3. Handle Mill Capture or Turn End
        if (formedMill) {
            const opponent = currentPlayer === 'player' ? 'opponent' : 'player';
            // Valid targets: Opponent pieces NOT in a mill (unless all are in mills)
            const oppPieces = newBoard.map((c, i) => c === opponent ? i : -1).filter(i => i !== -1);
            const nonMillPieces = oppPieces.filter(idx => !checkMill(idx, opponent, newBoard));
            const canRemove = nonMillPieces.length > 0 || (oppPieces.length > 0 && oppPieces.every(idx => checkMill(idx, opponent, newBoard)));

            if (canRemove) {
                setRemoveMode(true);
                setMessage("Mill Formed! SHOOT an opponent's cow.");
                return; // Wait for click
            } else {
                setMessage("Mill formed, but all opponent cows are safe.");
            }
        }
        
        switchTurn();
    };

    // --- INTERACTION HANDLER ---

    const handleSpotClick = (index: number) => {
        if (winner || showChallenge || isGenerating) return;
        if (gameMode === 'pve' && turn === 'opponent') return; // Wait for AI

        // 1. BLOCKED SPOT CHECK
        if (blockedNodes.includes(index)) {
            setMessage("This spot is blocked this turn.");
            return;
        }

        // 2. REMOVE MODE
        if (removeMode) {
            const target = turn === 'player' ? 'opponent' : 'player';
            if (board[index] === target) {
                // Rule: Can't take from mill unless all are in mills
                const isMill = checkMill(index, target, board);
                const allOppPieces = board.map((c, i) => c === target ? i : -1).filter(i => i !== -1);
                const allInMills = allOppPieces.every(p => checkMill(p, target, board));

                if (!isMill || allInMills) {
                    const newBoard = [...board];
                    newBoard[index] = null;
                    setBoard(newBoard);
                    setRemoveMode(false);
                    
                    if (turn === 'player') {
                        setPlayerCowsCaptured(c => c + 1);
                        setTotalXP(x => x + XP_RATES.ROUTINE); // XP for capture
                    } else {
                        setOpponentCowsCaptured(c => c + 1);
                    }

                    checkWinCondition(newBoard);
                } else {
                    setMessage("Cannot shoot a cow inside a mill!");
                }
            }
            return;
        }

        // 3. MOVE LOGIC
        const currentPlayer = turn;
        const currentHand = currentPlayer === 'player' ? playerCowsHand : opponentCowsHand;
        const currentBoardCount = currentPlayer === 'player' ? playerCowsBoard : opponentCowsBoard;
        const isFlying = currentBoardCount <= 3 && currentHand === 0;

        // Phase: Placing
        if (phase === 'placing' && currentHand > 0) {
            if (board[index] === null) {
                const moveType = analyzeMoveType(index, currentPlayer);
                const move: PendingMove = { targetIndex: index, moveType };
                
                if (currentPlayer === 'player' && moveType !== 'standard') {
                    // Critical Move -> Trigger Question
                    setPendingMove(move);
                    generateChallenge(moveType);
                } else {
                    executeMove(move);
                }
            }
        } 
        // Phase: Moving / Flying
        else {
            if (board[index] === currentPlayer) {
                setSelectedPiece(index); // Select source
            } else if (board[index] === null && selectedPiece !== null) {
                // Validate Move
                const isValid = isFlying || ADJACENCY[selectedPiece].includes(index);
                
                if (isValid) {
                    const moveType = analyzeMoveType(index, currentPlayer, selectedPiece);
                    const move: PendingMove = { targetIndex: index, sourceIndex: selectedPiece, moveType };

                    if (currentPlayer === 'player') {
                        // Trigger question for Attack/Defense OR Flying into a Mill
                        if (moveType !== 'standard' || (isFlying && checkMill(index, currentPlayer, [...board]))) {
                            setPendingMove(move);
                            generateChallenge(moveType);
                        } else {
                            executeMove(move);
                        }
                    } else {
                        executeMove(move);
                    }
                } else {
                    setMessage("Invalid move. Must be adjacent.");
                }
            }
        }
    };

    const checkWinCondition = (currentBoard: BoardState) => {
        const oppPieces = currentBoard.filter(c => c === (turn === 'player' ? 'opponent' : 'player')).length;
        const oppHand = turn === 'player' ? opponentCowsHand : playerCowsHand;
        
        // Loss if < 3 pieces and no hand left
        if (oppHand === 0 && oppPieces < 3) {
            setWinner(turn);
            if (turn === 'player') setTotalXP(x => x + XP_RATES.WIN);
        } else {
            // Check for trapped (no moves)
            const opponent = turn === 'player' ? 'opponent' : 'player';
            // We need to pass the opponent directly because state might be stale
            // Simple check: iterate all opponent pieces, see if any adj is null. 
            // Note: If opponent is flying, they are never trapped unless board full.
            const isOppFlying = oppPieces <= 3 && oppHand === 0;
            let canMove = isOppFlying && currentBoard.includes(null);
            
            if (!canMove && !isOppFlying) {
                // Standard check
                for (let i = 0; i < 25; i++) {
                    if (currentBoard[i] === opponent) {
                        if (ADJACENCY[i].some(n => currentBoard[n] === null)) {
                            canMove = true;
                            break;
                        }
                    }
                }
            }

            if (!canMove && oppHand === 0) {
                setWinner(turn);
                if (turn === 'player') setTotalXP(x => x + XP_RATES.WIN);
            } else {
                switchTurn();
            }
        }
    };


    // --- AI ---
    useEffect(() => {
        if (gameMode === 'pve' && turn === 'opponent' && !winner && !removeMode) {
            const timer = setTimeout(() => makeAiMoveRef.current(), 1000);
            return () => clearTimeout(timer);
        }
    }, [turn, gameMode, winner, removeMode]);

    const makeAiMove = () => {
        // AI Logic:
        // 1. Can I form a mill? (Attack)
        // 2. Must I block a mill? (Defense)
        // 3. Random valid move.
        
        let bestMove: PendingMove | null = null;
        
        // Helper to simulate
        const simulate = (idx: number, from?: number): number => {
            const testBoard = [...board];
            if (from !== undefined) testBoard[from] = null;
            testBoard[idx] = 'opponent';
            if (checkMill(idx, 'opponent', testBoard)) return 100; // Attack
            
            // Defense check
            const defenseBoard = [...board];
            if (from !== undefined) defenseBoard[from] = null;
            defenseBoard[idx] = 'player';
            if (checkMill(idx, 'player', defenseBoard)) return 50; // Block
            
            return 1; // Standard
        };

        if (phase === 'placing' && opponentCowsHand > 0) {
            const empty = board.map((c, i) => c === null ? i : -1).filter(i => i !== -1);
            let bestScore = -1;
            
            empty.forEach(i => {
                const score = simulate(i);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { targetIndex: i, moveType: 'standard' }; // Type doesn't matter for AI
                }
            });
        } else {
            const myPieces = board.map((c, i) => c === 'opponent' ? i : -1).filter(i => i !== -1);
            const isFlying = opponentCowsBoard <= 3;
            let bestScore = -1;

            myPieces.forEach(from => {
                const targets = isFlying 
                    ? board.map((c, i) => c === null ? i : -1).filter(i => i !== -1)
                    : ADJACENCY[from].filter(to => board[to] === null);
                
                targets.forEach(to => {
                    const score = simulate(to, from);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { targetIndex: to, sourceIndex: from, moveType: 'standard' };
                    }
                });
            });
        }

        if (bestMove) {
            executeMove(bestMove);
        } else {
            // No moves? Player wins
            setWinner('player');
        }
    };

    const makeAiMoveRef = React.useRef(makeAiMove);
    const checkWinConditionRef = React.useRef(checkWinCondition);

    React.useEffect(() => {
        makeAiMoveRef.current = makeAiMove;
        checkWinConditionRef.current = checkWinCondition;
    });
    
    // AI Removal (Separate Effect)
    useEffect(() => {
        if (gameMode === 'pve' && turn === 'opponent' && removeMode) {
             const timer = setTimeout(() => {
                 const playerPieces = board.map((c, i) => c === 'player' ? i : -1).filter(i => i !== -1);
                 const validTargets = playerPieces.filter(i => !checkMill(i, 'player', board));
                 // If all in mills, can take any
                 const targets = validTargets.length > 0 ? validTargets : playerPieces;
                 
                 if (targets.length > 0) {
                     const pick = targets[Math.floor(Math.random() * targets.length)];
                     const newBoard = [...board];
                     newBoard[pick] = null;
                     setBoard(newBoard);
                     setRemoveMode(false);
                     setPlayerCowsCaptured(c => c + 1);
                     checkWinConditionRef.current(newBoard);
                 }
             }, 1000);
             return () => clearTimeout(timer);
        }
    }, [removeMode, turn, gameMode, board]);


    // --- EDUCATIONAL COMPONENT ---
    
    const generateChallenge = async (moveType: MoveType) => {
        setIsGenerating(true);
        setShowFeedback(false);
        setUserSelectedIndex(null);
        
        try {
            const subjectData = allGrades.find(g => g.grade === userGrade)?.subjects.find(s => s.name.toLowerCase().includes(subjectFocus || 'math'));
            const subName = subjectData ? subjectData.name : "Logic";
            
            const prompt = `
                Generate 1 multiple-choice question for Grade ${userGrade} ${subName}.
                
                CONTEXT: The student is playing Morabaraba in Lesotho.
                REQUIREMENT 1: Use specific Lesotho cultural context if possible (names like Thabo/Lerato, places like Maseru/Maloti, foods like Papa/Moroho).
                REQUIREMENT 2: Use simple English appropriate for the grade level. Avoid complex jargon unless it is a specific curriculum term.
                REQUIREMENT 3: Keep the question text short and concise (under 25 words).
                REQUIREMENT 4: Ensure the topic is different from previous questions.
                
                PREVIOUS QUESTIONS (DO NOT REPEAT):
                ${askedQuestions.join('\n')}
                
                Move Context: The student is making a ${moveType} move.
                Difficulty: ${moveType === 'attack' ? 'Hard' : 'Medium'}.
                
                Return JSON: {
                    "question": "...",
                    "options": ["A", "B", "C", "D"],
                    "correctIndex": 0,
                    "explanation": "Short, helpful advice explaining the correct answer."
                }
            `;
            
            const response = await aiClient.generate({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            
            const data = safeJsonParse<Challenge>(response.text);
            if (data) {
                setChallenge({ ...data, context: `${moveType.toUpperCase()} Opportunity`, topicTitle: subName });
                setShowChallenge(true);
                setAskedQuestions(prev => [...prev, data.question]);
            }
        } catch (e) {
            // Fallback
             setChallenge({
                question: "Which number completes the pattern: 2, 5, 8, ...?",
                options: ["10", "11", "12", "13"],
                correctIndex: 1,
                explanation: "The pattern adds 3 each time.",
                context: "Strategy Check",
                topicTitle: "Logic"
            });
            setShowChallenge(true);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAnswer = (index: number) => {
        if (!challenge) return;
        setUserSelectedIndex(index);
        
        if (index === challenge.correctIndex) {
            // Correct!
            // Calculate XP Bonus
            let bonus = XP_RATES.CORRECT_MED;
            if (pendingMove?.moveType === 'attack') bonus = XP_RATES.CORRECT_HARD;
            setTotalXP(x => x + bonus);

            // Execute the blocked move
            if (pendingMove) {
                executeMove(pendingMove);
            }
            setShowChallenge(false);
            setPendingMove(null);
        } else {
            // Incorrect -> Show Feedback ("Teachable Moment") & Track Struggle
            const concept: MissedConcept = {
                topic: challenge.topicTitle || "General",
                advice: challenge.explanation
            };
            setMissedConcepts(prev => [...prev, concept]);
            setShowFeedback(true);
        }
    };

    const handleFeedbackDismiss = () => {
        setTotalXP(x => x + XP_RATES.LEARNED); // Consolation point
        
        // STRATEGIC BLOCK LOGIC
        if (pendingMove) {
            // Apply Block
            setBlockedNodes(prev => [...prev, pendingMove.targetIndex]);
            setMessage("Move Blocked! Try a different strategy.");
            
            // Cancel pending move, stay on player turn
            setPendingMove(null);
            setSelectedPiece(null);
        }

        setShowChallenge(false);
        setShowFeedback(false);
        setChallenge(null);
    };

    // --- RENDER ---

    if (showSetupModal) {
        return (
            <div className="absolute inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center p-6 backdrop-blur-md">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-700 animate-in zoom-in-95">
                    <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-6">Battle Setup</h2>
                    
                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Subject Focus</label>
                            <div className="grid grid-cols-2 gap-2">
                                {SUBJECTS.map(s => (
                                    <button 
                                        key={s.id}
                                        onClick={() => setSubjectFocus(s.id)}
                                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${subjectFocus === s.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500' : 'bg-gray-50 dark:bg-slate-700 border-transparent hover:bg-gray-100'}`}
                                    >
                                        <div className={`p-1.5 rounded-lg ${s.color} text-white shrink-0`}>{s.icon}</div>
                                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">{s.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Game Mode</label>
                            <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
                                <button 
                                    onClick={() => setGameMode('pve')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${gameMode === 'pve' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                                >
                                    <Cpu size={14} /> Vs AI
                                </button>
                                <button 
                                    onClick={() => setGameMode('pvp')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${gameMode === 'pvp' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500'}`}
                                >
                                    <Users size={14} /> 2 Player
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => startGame(subjectFocus || 'math', gameMode)}
                        className="w-full py-4 bg-teacherBlue text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
                    >
                        Start Battle
                    </button>
                    <button onClick={onBack} className="w-full py-3 mt-2 text-xs font-bold text-gray-400 hover:text-gray-600">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-display bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white antialiased overflow-hidden min-h-screen flex flex-col relative select-none">
            
            {/* Header */}
            <div className="z-20 px-4 pt-4 pb-2 shrink-0">
                <div className="flex items-center justify-between bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ArrowLeft size={20} className="text-slate-500" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full flex items-center justify-center text-white shadow-lg ${turn === 'player' ? 'bg-[#2b8cee]' : 'bg-[#ff8c42]'}`}>
                            {turn === 'player' ? <User size={20} /> : <Cpu size={20} />}
                        </div>
                        <div className="text-left">
                             <div className="flex items-center gap-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{phase === 'placing' ? 'Phase 1: Deploy' : phase === 'moving' ? 'Phase 2: Battle' : 'Phase 3: Flying'}</p>
                                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 rounded">+{totalXP} XP</span>
                             </div>
                             <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-none">{winner ? (winner === 'player' ? 'Victory!' : 'Defeat') : message}</h2>
                        </div>
                    </div>
                    <div className="w-8"></div>
                </div>
            </div>

            {/* Board */}
            <div className="flex-1 relative flex items-center justify-center p-4">
                <div className="aspect-square w-full max-w-[400px] relative bg-[#fdf8e1] rounded-xl shadow-2xl border-8 border-[#2b2b2b] p-6">
                    {/* SVG Grid */}
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 border-[3px] border-[#0f172a]"></div>
                        <div className="absolute inset-[16.6%] border-[3px] border-[#0f172a]"></div>
                        <div className="absolute inset-[33.3%] border-[3px] border-[#0f172a]"></div>
                        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#0f172a] -translate-y-1/2"></div>
                        <div className="absolute left-1/2 top-0 w-[3px] h-full bg-[#0f172a] -translate-x-1/2"></div>
                        <svg className="absolute inset-0 w-full h-full text-[#0f172a] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <line stroke="currentColor" strokeWidth="0.8" x1="0" x2="16.6" y1="0" y2="16.6"></line>
                            <line stroke="currentColor" strokeWidth="0.8" x1="100" x2="83.4" y1="0" y2="16.6"></line>
                            <line stroke="currentColor" strokeWidth="0.8" x1="0" x2="16.6" y1="100" y2="83.4"></line>
                            <line stroke="currentColor" strokeWidth="0.8" x1="100" x2="83.4" y1="100" y2="83.4"></line>
                        </svg>

                        {/* Valid Moves Highlight */}
                        {phase !== 'placing' && selectedPiece !== null && !removeMode && (
                             COORDS.map((pos, i) => {
                                 const isFlying = board.filter(c => c === 'player').length <= 3;
                                 const isAdjacent = ADJACENCY[selectedPiece].includes(i);
                                 const isValid = board[i] === null && (isFlying || isAdjacent);
                                 
                                 if (isValid) {
                                     return (
                                        <div 
                                            key={`hint-${i}`}
                                            className="absolute size-3 bg-green-400/50 rounded-full animate-pulse pointer-events-none -translate-x-1/2 -translate-y-1/2"
                                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                        />
                                     );
                                 }
                                 return null;
                             })
                        )}

                        {/* Pieces */}
                        {COORDS.map((pos, i) => {
                            const isBlocked = blockedNodes.includes(i);
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSpotClick(i)}
                                    disabled={isGenerating || winner !== null}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-10 shadow-lg flex items-center justify-center
                                        ${board[i] === 'player' 
                                            ? 'size-7 bg-[#2b8cee] border-2 border-white' 
                                            : board[i] === 'opponent' 
                                                ? 'size-7 bg-[#ff8c42] border-2 border-white' 
                                                : 'size-4 bg-slate-900/10 hover:bg-slate-900/30'
                                        }
                                        ${selectedPiece === i ? 'ring-4 ring-[#2b8cee]/40 scale-125' : ''}
                                        ${removeMode && board[i] === (turn === 'player' ? 'opponent' : 'player') ? 'animate-pulse ring-4 ring-red-500 cursor-crosshair' : ''}
                                        ${isBlocked ? 'cursor-not-allowed opacity-50 ring-2 ring-gray-400' : ''}
                                    `}
                                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                >
                                    {isBlocked && <Lock size={12} className="text-gray-600" />}
                                    {phase === 'flying' && board[i] === 'player' && playerCowsBoard <= 3 && <Target size={12} className="text-white opacity-50"/>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="z-20 pb-8 px-6">
                <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Fleet</span>
                        <div className="flex items-center gap-1.5">
                            <div className="bg-[#2b8cee] size-3 rounded-full"></div>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{phase === 'placing' ? playerCowsHand : playerCowsBoard}</span>
                        </div>
                        {playerCowsBoard <= 3 && phase !== 'placing' && (
                            <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 rounded-full animate-pulse">FLYING</span>
                        )}
                    </div>

                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Opponent</span>
                        <div className="flex items-center gap-1.5">
                            <div className="bg-[#ff8c42] size-3 rounded-full"></div>
                            <span className="text-xl font-black text-slate-900 dark:text-white">{phase === 'placing' ? opponentCowsHand : opponentCowsBoard}</span>
                        </div>
                         {opponentCowsBoard <= 3 && phase !== 'placing' && (
                            <span className="text-[8px] font-black bg-orange-100 text-orange-600 px-2 rounded-full">FLYING</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Challenge / Feedback Modal */}
            {showChallenge && challenge && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border-t-4 border-[#2b8cee]">
                         
                         {/* Question View */}
                         {!showFeedback && (
                             <>
                                 <div className="flex items-center gap-3 mb-4">
                                     <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-[#2b8cee]">
                                        {pendingMove?.moveType === 'attack' ? <Target size={24}/> : <ShieldAlert size={24}/>}
                                     </div>
                                     <div>
                                         <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                             {pendingMove?.moveType === 'attack' ? 'Strategic Hit!' : 'Critical Block!'}
                                         </h2>
                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{challenge.context}</p>
                                     </div>
                                 </div>
                                 
                                 <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6">
                                    <p className="text-slate-900 dark:text-white font-medium text-lg leading-relaxed text-center">
                                        {challenge.question}
                                    </p>
                                 </div>

                                 <div className="space-y-3">
                                     {challenge.options.map((opt, i) => (
                                         <button
                                             key={i}
                                             onClick={() => handleAnswer(i)}
                                             className="w-full text-left p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-[#2b8cee] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-base font-bold text-slate-600 dark:text-slate-300"
                                         >
                                             <span className="mr-3 text-slate-400 font-mono">{['A','B','C','D'][i]}.</span>
                                             {opt}
                                         </button>
                                     ))}
                                 </div>
                             </>
                         )}

                         {/* Feedback View (Teachable Moment) */}
                         {showFeedback && (
                             <div className="animate-in slide-in-from-right-4">
                                 <div className="flex items-center gap-3 mb-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                                     <div className="p-2 bg-white dark:bg-slate-800 rounded-full text-red-500 shadow-sm shrink-0">
                                        <X size={24}/>
                                     </div>
                                     <div>
                                         <h2 className="text-lg font-black text-red-600 dark:text-red-400 leading-none">Missed It!</h2>
                                         <p className="text-[10px] font-bold text-red-400 dark:text-red-300 uppercase tracking-wider mt-1">Move Blocked</p>
                                     </div>
                                 </div>

                                 <div className="space-y-4 mb-6">
                                     <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Correct Answer</p>
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 p-3 rounded-lg flex items-start gap-2">
                                            <Check size={16} className="text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                            <p className="text-sm font-bold text-green-800 dark:text-green-300">{challenge.options[challenge.correctIndex]}</p>
                                        </div>
                                     </div>

                                     {challenge.explanation && (
                                         <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Teachable Moment</p>
                                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                {challenge.explanation}
                                            </div>
                                         </div>
                                     )}
                                 </div>

                                 <button 
                                     onClick={handleFeedbackDismiss}
                                     className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
                                 >
                                     Continue
                                 </button>
                             </div>
                         )}
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isGenerating && (
                <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 size={40} className="text-[#2b8cee] animate-spin mb-4" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Consulting Knowledge Base...</p>
                </div>
            )}

            {/* Battle Report (Winner Overlay) */}
            {winner && (
                <div className="absolute inset-0 z-50 bg-white dark:bg-[#101922] flex flex-col p-6 overflow-y-auto animate-in zoom-in-95">
                    <div className="flex flex-col items-center text-center mb-8 pt-8">
                        <Trophy size={80} className={`mb-6 ${winner === 'player' ? 'text-yellow-400' : 'text-gray-400'}`} />
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase italic tracking-tighter">
                            {winner === 'player' ? 'Victory!' : 'Defeated'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Final Score: <span className="text-green-500">{totalXP} XP</span>
                        </p>
                    </div>

                    <div className="flex-1 max-w-sm mx-auto w-full">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                             <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                 <Brain size={18} className="text-[#2b8cee]" />
                                 <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Tutor's Notes</h3>
                             </div>
                             <div className="p-4 space-y-4">
                                 {missedConcepts.length > 0 ? (
                                     missedConcepts.map((item, idx) => (
                                         <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                             <div className="flex items-start gap-2 mb-1">
                                                 <Target size={14} className="text-red-500 mt-0.5" />
                                                 <span className="text-xs font-bold text-slate-900 dark:text-white">{item.topic}</span>
                                             </div>
                                             <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                                                 {item.advice}
                                             </p>
                                         </div>
                                     ))
                                 ) : (
                                     <div className="text-center py-6">
                                         <CheckCircle size={40} className="text-green-500 mx-auto mb-2 opacity-50" />
                                         <p className="text-sm font-bold text-slate-900 dark:text-white">Flawless Strategy!</p>
                                         <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">You demonstrated perfect understanding of the concepts.</p>
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full max-w-sm mx-auto mt-8 pb-4">
                        <button onClick={onBack} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm">Exit Arena</button>
                        <button onClick={() => onComplete(winner === 'player' ? XP_RATES.WIN : 5)} className="flex-1 bg-[#2b8cee] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors text-sm">
                            Finish & Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Morabaraba;
