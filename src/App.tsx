import React from 'react';
import { motion } from 'motion/react';
import { Music, Gamepad2, Github, Terminal } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import Visualizer from './components/Visualizer';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Visualizer />
      
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.4)]">
            <Terminal size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tighter uppercase font-mono">
            Neon<span className="text-pink-500">Beats</span>.OS
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            System Online
          </div>
          <div className="flex items-center gap-2">
            <Music size={12} />
            Audio Engine: Active
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 size={12} />
            Game Core: Ready
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Github size={20} className="text-white/60" />
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pt-20">
        {/* Left Sidebar - Music Player */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-auto order-2 lg:order-1"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_#ff00ff]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">Music Module</span>
            </div>
            <MusicPlayer />
            
            {/* Extra Info Card */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">System Log</h4>
              <div className="space-y-2 font-mono text-[10px] text-white/30">
                <p className="flex justify-between"><span>[01:39:48]</span> <span className="text-green-500/60">Audio Buffer Initialized</span></p>
                <p className="flex justify-between"><span>[01:39:50]</span> <span className="text-cyan-500/60">Neural Synth Connected</span></p>
                <p className="flex justify-between"><span>[01:39:52]</span> <span className="text-pink-500/60">Neon Grid Rendered</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center - Game Area */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="order-1 lg:order-2"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#00ffff]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">Game Module</span>
            </div>
            <SnakeGame />
          </div>
        </motion.div>

        {/* Right Sidebar - Stats/Leaderboard (Mock) */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden xl:flex flex-col gap-4 w-72 order-3"
        >
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#39ff14]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/60">Global Rankings</span>
          </div>
          
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-8 shadow-2xl flex flex-col gap-6">
            {[
              { name: 'CYBER_PUNK', score: 1240 },
              { name: 'NEON_WAVE', score: 980 },
              { name: 'BIT_RUNNER', score: 850 },
              { name: 'SYNTH_LORD', score: 720 },
              { name: 'GRID_WALKER', score: 540 },
            ].map((user, i) => (
              <div key={i} className="flex justify-between items-center font-mono text-xs tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-white/20">0{i+1}</span>
                  <span className="text-white/80">{user.name}</span>
                </div>
                <span className="neon-text-green font-bold">{user.score}</span>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-center">
              <button className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                View All Rankings
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 text-[10px] font-mono uppercase tracking-widest text-white/20">
        &copy; 2026 NEON_BEATS_OS • BUILT WITH GOOGLE AI STUDIO
      </footer>
    </div>
  );
}
