import React from 'react';
import { motion } from 'motion/react';

const Visualizer: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Animated Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-pink-900/40 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-cyan-900/30 rounded-full blur-[150px]"
      />

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
        />
      ))}
    </div>
  );
};

export default Visualizer;
