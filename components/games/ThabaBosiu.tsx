
import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../../types';
import { ArrowLeft, Shield, Play, Pause, Heart, Zap, RefreshCw } from 'lucide-react';

interface ThabaBosiuProps {
    topic: Topic; // Used to seed difficulty
    onBack: () => void;
    onComplete: (score: number) => void;
    difficulty?: 'easy' | 'medium' | 'hard';
}

interface Boulder {
    id: number;
    question: string;
    answer: number;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    speed: number;
    active: boolean;
}

const ThabaBosiu: React.FC<ThabaBosiuProps> = ({ topic, onBack, onComplete, difficulty = 'medium' }) => {
    const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'paused' | 'over'>('start');
    const [boulders, setBoulders] = useState<Boulder[]>([]);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    
    // Game Loop Refs
    const requestRef = useRef<number>(0);
    const lastSpawnTime = useRef<number>(0);
    const boulderIdCounter = useRef<number>(0);

    // Difficulty Tuning
    const difficultyMultiplier = difficulty === 'easy' ? 0.8 : difficulty === 'medium' ? 1.0 : 1.5;
    const baseSpawnRate = 3000 / difficultyMultiplier;
    
    const spawnRate = Math.max(800, baseSpawnRate - (level * 200)); 

    const spawnBoulder = () => {
        const id = boulderIdCounter.current++;
        
        // Generate math problem based on level and difficulty
        let q = "", a = 0;
        const maxNum = (level * 5) * difficultyMultiplier;

        if (level === 1 || difficulty === 'easy') {
            const n1 = Math.floor(Math.random() * maxNum) + 1;
            const n2 = Math.floor(Math.random() * maxNum) + 1;
            q = `${n1} + ${n2}`;
            a = n1 + n2;
        } else if (level === 2 || difficulty === 'medium') {
            const n1 = Math.floor(Math.random() * (maxNum * 1.5));
            const n2 = Math.floor(Math.random() * maxNum);
            q = `${n1} - ${n2}`;
            a = n1 - n2;
        } else {
            const n1 = Math.floor(Math.random() * (maxNum / 2)) + 2;
            const n2 = Math.floor(Math.random() * 10) + 2;
            q = `${n1} × ${n2}`;
            a = n1 * n2;
        }

        const newBoulder: Boulder = {
            id,
            question: q,
            answer: a,
            x: 10 + Math.random() * 80, // Random horizontal pos
            y: -10, // Start above screen
            speed: (0.2 + (level * 0.05)) * difficultyMultiplier,
            active: true
        };

        setBoulders(prev => [...prev, newBoulder]);
    };

    const updateGame = (time: number) => {
        if (gameStatus !== 'playing') return;

        // Spawn Logic
        if (time - lastSpawnTime.current > spawnRate) {
            spawnBoulder();
            lastSpawnTime.current = time;
        }

        // Move Boulders
        setBoulders(prev => {
            const nextBoulders = prev.map(b => ({
                ...b,
                y: b.y + b.speed
            }));

            // Check for Hits (bottom of screen)
            const hitVillage = nextBoulders.filter(b => b.y > 90 && b.active);
            if (hitVillage.length > 0) {
                setLives(l => Math.max(0, l - hitVillage.length));
                // Vibrate if on mobile
                if (navigator.vibrate) navigator.vibrate(200);
                return nextBoulders.filter(b => b.y <= 90); // Remove hit boulders
            }

            return nextBoulders;
        });

        if (lives <= 0) {
            setGameStatus('over');
            return;
        }

        requestRef.current = requestAnimationFrame(updateGame);
    };

    const updateGameRef = React.useRef(updateGame);
    React.useEffect(() => {
        updateGameRef.current = updateGame;
    });

    // Start/Stop Loop
    useEffect(() => {
        if (gameStatus === 'playing') {
            requestRef.current = requestAnimationFrame((time) => updateGameRef.current(time));
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameStatus, lives, level, difficulty]);

    const handleInput = (val: string) => {
        setInput(val);
        const num = parseInt(val);
        if (!isNaN(num)) {
            // Check against active boulders
            const hit = boulders.find(b => b.answer === num && b.active);
            if (hit) {
                // Success!
                const points = Math.round((10 + (level * 5)) * difficultyMultiplier);
                setScore(s => s + points);
                setBoulders(prev => prev.filter(b => b.id !== hit.id)); // Destroy boulder
                setInput(''); // Clear input
                
                // Level Up Logic
                if (score > level * 100 * difficultyMultiplier) setLevel(l => l + 1);
            }
        }
    };

    return (
        <div className="absolute inset-0 z-50 bg-slate-900 text-white font-sans flex flex-col overflow-hidden">
            {/* Header / HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
                <button onClick={onBack} className="p-2 bg-black/40 rounded-full pointer-events-auto backdrop-blur-md">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-black text-yellow-400 drop-shadow-md">{score}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Level {level} • {difficulty}</p>
                </div>
                <div className="flex items-center gap-1">
                    {[1,2,3].map(i => (
                        <Heart key={i} size={20} className={i <= lives ? "fill-red-500 text-red-500" : "text-slate-700"} />
                    ))}
                </div>
            </div>

            {/* Game World (Canvas Area) */}
            <div className="flex-1 relative bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6] to-[#86efac] overflow-hidden">
                {/* Mountain Graphic */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#3f6212] clip-path-mountain flex items-end justify-center">
                    {/* The Village */}
                    <div className="w-16 h-16 bg-yellow-100 rounded-t-lg mb-4 opacity-80 shadow-lg relative">
                        <div className="absolute -top-8 left-[-10px] border-l-[40px] border-r-[40px] border-b-[40px] border-l-transparent border-r-transparent border-b-orange-700"></div>
                    </div>
                </div>

                {/* Boulders */}
                {boulders.map(b => (
                    <div 
                        key={b.id}
                        className="absolute size-16 rounded-full bg-stone-600 border-b-4 border-stone-800 shadow-xl flex items-center justify-center transition-transform duration-100"
                        style={{ top: `${b.y}%`, left: `${b.x}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <span className="font-bold text-white text-lg drop-shadow-md">{b.question}</span>
                    </div>
                ))}
            </div>

            {/* Input Area (Keypad) */}
            <div className="h-1/3 bg-slate-900 border-t-4 border-slate-800 p-4 z-20">
                <div className="flex justify-between items-center mb-4">
                    <div className="bg-slate-800 px-4 py-2 rounded-xl text-2xl font-mono tracking-widest text-white w-32 text-center border-2 border-slate-700">
                        {input || "_"}
                    </div>
                    <button 
                        onClick={() => setInput('')}
                        className="p-3 bg-red-500/20 text-red-500 rounded-xl"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                    {[1,2,3,4,5,6,7,8,9,0].map(n => (
                        <button 
                            key={n}
                            onClick={() => handleInput(input + n)}
                            className="bg-slate-800 active:bg-slate-700 text-white font-bold text-xl py-3 rounded-xl shadow-sm border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 transition-all"
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>

            {/* Overlays */}
            {gameStatus === 'start' && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                    <Shield size={64} className="text-yellow-400 mb-6" />
                    <h1 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Thaba-Bosiu Defender</h1>
                    <p className="text-slate-300 mb-8 max-w-xs">Solve the math problems on the falling boulders before they crush the village!</p>
                    <button 
                        onClick={() => setGameStatus('playing')}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-lg shadow-green-500/30 flex items-center gap-3 animate-pulse"
                    >
                        <Play fill="currentColor" /> START
                    </button>
                </div>
            )}

            {gameStatus === 'over' && (
                <div className="absolute inset-0 z-50 bg-red-900/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
                    <h1 className="text-4xl font-black text-white mb-2 uppercase">Defeated!</h1>
                    <p className="text-red-200 mb-2 font-bold">The village has fallen.</p>
                    <p className="text-5xl font-black text-yellow-400 mb-8 drop-shadow-lg">{score}</p>
                    <div className="flex gap-4">
                        <button onClick={onBack} className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold">Exit</button>
                        <button onClick={() => onComplete(score)} className="bg-white text-red-900 px-6 py-3 rounded-xl font-bold">Submit Score</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThabaBosiu;
