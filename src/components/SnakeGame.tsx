import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';
import { GameState } from '../types';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    score: 0,
    isGameOver: false,
    isPaused: true,
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const lastUpdate = useRef(0);

  const generateFood = useCallback((snake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: generateFood([{ x: 10, y: 10 }]),
      direction: { x: 1, y: 0 },
      score: 0,
      isGameOver: false,
      isPaused: false,
    });
    setSpeed(INITIAL_SPEED);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setGameState(prev => prev.direction.y === 1 ? prev : { ...prev, direction: { x: 0, y: -1 } });
        break;
      case 'ArrowDown':
        setGameState(prev => prev.direction.y === -1 ? prev : { ...prev, direction: { x: 0, y: 1 } });
        break;
      case 'ArrowLeft':
        setGameState(prev => prev.direction.x === 1 ? prev : { ...prev, direction: { x: -1, y: 0 } });
        break;
      case 'ArrowRight':
        setGameState(prev => prev.direction.x === -1 ? prev : { ...prev, direction: { x: 1, y: 0 } });
        break;
      case ' ':
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const update = useCallback((time: number) => {
    if (gameState.isPaused || gameState.isGameOver) return;

    if (time - lastUpdate.current > speed) {
      lastUpdate.current = time;

      setGameState(prev => {
        const newHead = {
          x: prev.snake[0].x + prev.direction.x,
          y: prev.snake[0].y + prev.direction.y,
        };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          return { ...prev, isGameOver: true };
        }

        // Self collision
        if (prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          return { ...prev, isGameOver: true };
        }

        const newSnake = [newHead, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        // Food collision
        if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
          newFood = generateFood(newSnake);
          newScore += 10;
          setSpeed(s => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
        } else {
          newSnake.pop();
        }

        return { ...prev, snake: newSnake, food: newFood, score: newScore };
      });
    }

    requestAnimationFrame(update);
  }, [gameState.isPaused, gameState.isGameOver, speed, generateFood]);

  useEffect(() => {
    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid (subtle)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(
      gameState.food.x * cellSize + cellSize / 2,
      gameState.food.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    gameState.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ffff' : '#39ff14';
      ctx.shadowBlur = index === 0 ? 10 : 5;
      ctx.shadowColor = index === 0 ? '#00ffff' : '#39ff14';
      
      const padding = 2;
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2
      );
    });
    ctx.shadowBlur = 0;

  }, [gameState]);

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between w-full px-4 mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Score</span>
          <span className="text-5xl font-mono neon-text-cyan leading-none">{gameState.score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Status</span>
          <span className={`text-2xl font-mono leading-none ${gameState.isGameOver ? 'neon-text-green' : gameState.isPaused ? 'text-yellow-400' : 'neon-text-green'}`}>
            {gameState.isGameOver ? 'GAME OVER' : gameState.isPaused ? 'PAUSED' : 'PLAYING'}
          </span>
        </div>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="rounded-xl neon-border-cyan bg-black cursor-none"
        />
        
        <AnimatePresence>
          {(gameState.isPaused || gameState.isGameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-xl backdrop-blur-sm"
            >
              {gameState.isGameOver ? (
                <>
                  <div className="mb-6 px-4 py-1 border border-cyan-500/50 bg-cyan-500/10 rounded-sm">
                    <span className="text-cyan-400 text-sm font-mono tracking-widest">Snake game</span>
                  </div>
                  <h2 className="text-6xl font-mono neon-text-pink mb-10 tracking-tighter">GAME OVER</h2>
                  <button
                    onClick={resetGame}
                    className="px-10 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95 text-sm tracking-widest uppercase"
                  >
                    RETRY
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-mono neon-text-cyan mb-8">READY?</h2>
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, isPaused: false }))}
                    className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all active:scale-95"
                  >
                    START GAME
                  </button>
                  <p className="mt-4 text-white/40 text-sm font-mono">Press SPACE to Pause/Resume</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-white/30 font-mono uppercase tracking-tighter">
        Use Arrow Keys to Move • Space to Pause
      </div>
    </div>
  );
};

export default SnakeGame;
