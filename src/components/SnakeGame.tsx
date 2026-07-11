"use client";

import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 20;
const TILE_COUNT = 20;
const CANVAS_SIZE = GRID_SIZE * TILE_COUNT;
const GAME_SPEED = 100;

type Point = { x: number; y: number };

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  };

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
      }

      if (!isPlaying && e.key !== " " && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        setIsPlaying(true);
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case " ":
          if (gameOver) resetGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isPlaying, gameOver]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= TILE_COUNT ||
          newHead.y < 0 ||
          newHead.y >= TILE_COUNT
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, isPlaying, gameOver, food]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#161616"; // bg-secondary
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = "#2A2A2A"; // border-primary
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = "#E2A039"; // Accent color
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#E2A039";
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#F0F0F0" : "#A0A0A0";
      if (index === 0) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#F0F0F0";
      }
      ctx.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
      ctx.shadowBlur = 0;
    });
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[400px] mb-4 px-2 font-mono text-text-secondary">
        <span>Score: <span className="text-accent font-bold">{score}</span></span>
      </div>
      
      <div className="relative border-2 border-border-hover rounded-lg overflow-hidden shadow-[0_0_30px_rgba(226,160,57,0.1)] w-full max-w-[400px] aspect-square">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-bg-secondary w-full h-full"
        />
        
        {(!isPlaying && !gameOver) && (
          <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-heading text-2xl font-bold mb-2 text-text-primary">Snake Game</h3>
            <p className="font-mono text-text-secondary text-sm mb-6">Use arrow keys or WASD to move.</p>
            <p className="font-mono text-accent text-sm animate-pulse">Press any arrow key to start</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-heading text-3xl font-bold mb-2 text-red-500">Game Over</h3>
            <p className="font-mono text-text-secondary text-sm mb-6">Final Score: <span className="text-accent text-lg">{score}</span></p>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-accent text-[#0D0D0D] font-mono font-bold rounded-full hover:bg-[#F2B655] transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex gap-2">
        {/* Mobile controls */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div />
          <button onClick={() => { setDirection({ x: 0, y: -1 }); setIsPlaying(true); }} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">↑</button>
          <div />
          <button onClick={() => { setDirection({ x: -1, y: 0 }); setIsPlaying(true); }} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">←</button>
          <button onClick={() => { setDirection({ x: 0, y: 1 }); setIsPlaying(true); }} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">↓</button>
          <button onClick={() => { setDirection({ x: 1, y: 0 }); setIsPlaying(true); }} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">→</button>
        </div>
      </div>
    </div>
  );
}
