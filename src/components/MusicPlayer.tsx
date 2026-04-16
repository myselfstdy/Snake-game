import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DUMMY_TRACKS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleTrackEnd = () => {
    skipForward();
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 flex flex-col gap-8 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex gap-6 items-center">
        <div className="relative w-28 h-28 shrink-0">
          <motion.img
            key={currentTrack.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover rounded-2xl neon-border-pink"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-2xl font-bold truncate neon-text-pink mb-1">{currentTrack.title}</h3>
          <p className="text-white/60 text-sm font-mono uppercase tracking-[0.2em] mb-3">{currentTrack.artist}</p>
          <div className="flex items-center gap-2 text-pink-400/60">
            <Music2 size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">AI Generated Stream</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
          <span>{audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}</span>
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <button onClick={skipBack} className="text-white/60 hover:text-white transition-colors">
          <SkipBack size={28} />
        </button>
        
        <button
          onClick={togglePlay}
          className="w-20 h-20 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={skipForward} className="text-white/60 hover:text-white transition-colors">
          <SkipForward size={28} />
        </button>
      </div>

      <div className="flex items-center gap-4 px-2 text-white/40">
        <Volume2 size={18} />
        <div className="h-1 flex-1 bg-white/10 rounded-full relative">
          <div className="absolute left-0 top-0 h-full w-3/4 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default MusicPlayer;
