
import React, { useEffect } from 'react';
import { useVoiceAccess } from '../../contexts/VoiceAccessContext';
import { Mic, BarChart3, Radio, Wifi, BatteryCharging } from 'lucide-react';

const VoiceDashboard: React.FC = () => {
    const { voiceState, aiMessage } = useVoiceAccess();

    // Sound effect on mount to indicate screen change
    useEffect(() => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(() => {});
    }, []);

    const getStatusColor = () => {
        switch(voiceState) {
            case 'listening': return 'text-red-500 border-red-500';
            case 'speaking': return 'text-green-400 border-green-400';
            case 'processing': return 'text-blue-400 border-blue-400';
            default: return 'text-yellow-400 border-yellow-400';
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-between p-6 bg-[#101822] text-white font-sans overflow-hidden">
            {/* Top Status Bar */}
            <header className="w-full flex justify-between items-center py-4 opacity-50">
                <div className="flex items-center gap-2">
                    <Wifi size={16} />
                    <span className="text-xs font-mono">ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono">100%</span>
                    <BatteryCharging size={16} />
                </div>
            </header>

            {/* Main Visualizer */}
            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0 gap-8">
                
                {/* Dynamic State Icon */}
                <div className={`relative flex items-center justify-center size-64 rounded-full border-[3px] ${getStatusColor()} transition-all duration-300 ${voiceState === 'speaking' ? 'scale-110' : 'scale-100'}`}>
                    <div className={`absolute inset-0 rounded-full border border-current opacity-20 ${voiceState === 'listening' ? 'animate-ping' : ''}`}></div>
                    <div className={`absolute inset-4 rounded-full border border-current opacity-40 ${voiceState === 'processing' ? 'animate-pulse' : ''}`}></div>
                    
                    {voiceState === 'listening' ? (
                        <Mic size={80} className="animate-pulse" />
                    ) : voiceState === 'processing' ? (
                        <Radio size={80} className="animate-spin" />
                    ) : (
                        <BarChart3 size={80} />
                    )}
                </div>

                {/* Main Text Display - High Legibility */}
                <div className="text-center space-y-4 max-w-lg">
                    <h2 className={`text-2xl font-black uppercase tracking-[0.2em] ${getStatusColor()}`}>
                        {voiceState}
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold leading-tight text-white">
                        "{aiMessage}"
                    </p>
                </div>
            </div>

            {/* Footer / Instructions */}
            <footer className="w-full pb-8 pt-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-1 w-24 bg-white/20 rounded-full"></div>
                    <p className="text-xl font-medium text-gray-400">
                        Tap anywhere to speak
                    </p>
                    <div className="flex gap-8 mt-4">
                        <div className="text-center">
                            <p className="text-white font-black text-lg">"JOURNEY"</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Lessons</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-black text-lg">"BATTLE"</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Quiz</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VoiceDashboard;
