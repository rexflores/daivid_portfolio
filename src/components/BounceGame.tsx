"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 400;
const TILE_SIZE = 20;
const COLUMNS = CANVAS_SIZE / TILE_SIZE;
const ROWS = CANVAS_SIZE / TILE_SIZE;

// 0: Empty, 1: Wall, 2: Spike, 3: Hoop, 4: Door
const LEVEL_1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,4,0,1],
  [1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,1,1,1,0,0,0,2,2,2,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const LEVEL_2 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,3,0,1],
  [1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
  [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,4,0,1],
  [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,1,1,1,1,1,0,0,2,2,2,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const LEVEL_3 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
  [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [1,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,4,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const ALL_LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3];

// Physics Constants
const GRAVITY = 0.4;
const FRICTION = 0.85;
const ACCELERATION = 0.8;
const MAX_SPEED = 5;
const BOUNCE_DAMPING = 0.7; // How much energy is kept after bounce
const JUMP_FORCE = -8;

export function BounceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
  const [hoopsCollected, setHoopsCollected] = useState(0);
  const [totalHoops, setTotalHoops] = useState(2);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  
  // Need refs for physics loop to avoid dependency cycles
  const ballRef = useRef({ x: 40, y: 40, vx: 0, vy: 0, radius: 8 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const levelRef = useRef<number[][]>(JSON.parse(JSON.stringify(LEVEL_1)));

  const startGame = () => {
    // Pick a random level
    const randomIdx = Math.floor(Math.random() * ALL_LEVELS.length);
    const selectedLevel = ALL_LEVELS[randomIdx];
    
    // Count hoops in this level
    let hoopsCount = 0;
    selectedLevel.forEach(row => row.forEach(tile => {
      if (tile === 3) hoopsCount++;
    }));

    setCurrentLevelIndex(randomIdx + 1);
    setTotalHoops(hoopsCount);
    levelRef.current = JSON.parse(JSON.stringify(selectedLevel));
    ballRef.current = { x: 40, y: 40, vx: 0, vy: 0, radius: 8 };
    setHoopsCollected(0);
    setGameState('playing');
  };

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      keysRef.current[e.key] = true;
      
      if (gameState !== 'playing' && (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w')) {
        startGame();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animationFrameId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    const updatePhysics = () => {
      const ball = ballRef.current;
      const keys = keysRef.current;
      const level = levelRef.current;

      // Horizontal movement
      if (keys['ArrowLeft'] || keys['a']) ball.vx -= ACCELERATION;
      if (keys['ArrowRight'] || keys['d']) ball.vx += ACCELERATION;
      
      // Friction and Gravity
      ball.vx *= FRICTION;
      ball.vy += GRAVITY;

      // Speed limit
      if (ball.vx > MAX_SPEED) ball.vx = MAX_SPEED;
      if (ball.vx < -MAX_SPEED) ball.vx = -MAX_SPEED;

      // Jumping (Forgiving floor check with "coyote time")
      if (keys['ArrowUp'] || keys['w'] || keys[' ']) {
        // Look 3 pixels below the ball to allow jumping just before or exactly as hitting the ground
        const bottomY = ball.y + ball.radius + 3; 
        
        // Check left and right edges of the ball to allow jumping when hanging off an edge
        const leftGridX = Math.floor((ball.x - ball.radius + 2) / TILE_SIZE);
        const rightGridX = Math.floor((ball.x + ball.radius - 2) / TILE_SIZE);
        const gridY = Math.floor(bottomY / TILE_SIZE);
        
        const isTouchingFloor = 
          level[gridY]?.[leftGridX] === 1 || level[gridY]?.[rightGridX] === 1 ||
          level[gridY]?.[leftGridX] === 4 || level[gridY]?.[rightGridX] === 4;

        // Only jump if touching floor and not already flying up fast
        if (isTouchingFloor && ball.vy >= -2) {
          ball.vy = JUMP_FORCE;
        }
      }

      // -----------------------------
      // COLLISION DETECTION (X-AXIS)
      // -----------------------------
      ball.x += ball.vx;
      
      let gridX = Math.floor(ball.x / TILE_SIZE);
      let gridY = Math.floor(ball.y / TILE_SIZE);
      
      // Check surrounding tiles
      for (let y = Math.max(0, gridY - 1); y <= Math.min(ROWS - 1, gridY + 1); y++) {
        for (let x = Math.max(0, gridX - 1); x <= Math.min(COLUMNS - 1, gridX + 1); x++) {
          const tile = level[y][x];
          if (tile === 0) continue;

          const tileRect = { left: x * TILE_SIZE, right: x * TILE_SIZE + TILE_SIZE, top: y * TILE_SIZE, bottom: y * TILE_SIZE + TILE_SIZE };
          
          // Simple AABB collision for X
          if (
            ball.x + ball.radius > tileRect.left &&
            ball.x - ball.radius < tileRect.right &&
            ball.y + ball.radius > tileRect.top &&
            ball.y - ball.radius < tileRect.bottom
          ) {
            if (tile === 1 || tile === 4) { // Wall or Door
              if (tile === 4 && hoopsCollected === totalHoops) {
                setGameState('won');
                return;
              } else if (tile === 4) {
                // Solid door
              }
              
              if (ball.vx > 0) {
                ball.x = tileRect.left - ball.radius;
              } else if (ball.vx < 0) {
                ball.x = tileRect.right + ball.radius;
              }
              ball.vx = -ball.vx * BOUNCE_DAMPING;
            } else if (tile === 2) { // Spike
               setGameState('gameover');
               return;
            } else if (tile === 3) { // Hoop
               level[y][x] = 0; // Collect
               setHoopsCollected(prev => prev + 1);
            }
          }
        }
      }

      // -----------------------------
      // COLLISION DETECTION (Y-AXIS)
      // -----------------------------
      ball.y += ball.vy;
      gridX = Math.floor(ball.x / TILE_SIZE);
      gridY = Math.floor(ball.y / TILE_SIZE);

      for (let y = Math.max(0, gridY - 1); y <= Math.min(ROWS - 1, gridY + 1); y++) {
        for (let x = Math.max(0, gridX - 1); x <= Math.min(COLUMNS - 1, gridX + 1); x++) {
          const tile = level[y][x];
          if (tile === 0) continue;

          const tileRect = { left: x * TILE_SIZE, right: x * TILE_SIZE + TILE_SIZE, top: y * TILE_SIZE, bottom: y * TILE_SIZE + TILE_SIZE };
          
          if (
            ball.x + ball.radius > tileRect.left &&
            ball.x - ball.radius < tileRect.right &&
            ball.y + ball.radius > tileRect.top &&
            ball.y - ball.radius < tileRect.bottom
          ) {
            if (tile === 1 || tile === 4) { // Wall or Door
              if (tile === 4 && hoopsCollected === totalHoops) {
                setGameState('won');
                return;
              }
              if (ball.vy > 0) {
                ball.y = tileRect.top - ball.radius;
              } else if (ball.vy < 0) {
                ball.y = tileRect.bottom + ball.radius;
              }
              // Bounce!
              ball.vy = -ball.vy * BOUNCE_DAMPING;
              
              // Prevent jittering
              if (Math.abs(ball.vy) < 1) ball.vy = 0;
              
            } else if (tile === 2) { // Spike
               setGameState('gameover');
               return;
            } else if (tile === 3) { // Hoop
               level[y][x] = 0; // Collect
               setHoopsCollected(prev => prev + 1);
            }
          }
        }
      }
    };

    const draw = () => {
      if (!ctx) return;
      const level = levelRef.current;
      const ball = ballRef.current;

      // Background
      ctx.fillStyle = '#161616'; // bg-secondary
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw level
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLUMNS; x++) {
          const tile = level[y][x];
          if (tile === 1) { // Wall
            ctx.fillStyle = '#222';
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#333';
            ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else if (tile === 2) { // Spike
            ctx.fillStyle = '#EF4444'; // Red-ish spikes
            ctx.beginPath();
            ctx.moveTo(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + 4);
            ctx.lineTo(x * TILE_SIZE + TILE_SIZE - 2, y * TILE_SIZE + TILE_SIZE);
            ctx.lineTo(x * TILE_SIZE + 2, y * TILE_SIZE + TILE_SIZE);
            ctx.fill();
          } else if (tile === 3) { // Hoop
            ctx.strokeStyle = '#E2A039';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.lineWidth = 1;
          } else if (tile === 4) { // Door
            ctx.fillStyle = hoopsCollected === totalHoops ? '#4ADE80' : '#444'; // Green if open
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }

      // Draw Ball
      ctx.fillStyle = '#EF4444'; // Nokia red ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Ball gloss
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(ball.x - 2, ball.y - 2, ball.radius / 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      updatePhysics();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, hoopsCollected, totalHoops]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[400px] mb-4 px-2 font-mono text-text-secondary">
        <span>Level {currentLevelIndex || '?'}</span>
        <span>Hoops: <span className="text-accent font-bold">{hoopsCollected} / {totalHoops}</span></span>
      </div>
      
      <div className="relative border-2 border-border-hover rounded-lg overflow-hidden shadow-[0_0_30px_rgba(226,160,57,0.1)] w-full max-w-[400px] aspect-square">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="bg-bg-secondary w-full h-full"
        />
        
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-heading text-2xl font-bold mb-2 text-text-primary">Nokia Bounce</h3>
            <p className="font-mono text-text-secondary text-sm mb-6">Collect all hoops and reach the door.<br/>Watch out for spikes!</p>
            <button onClick={startGame} className="px-6 py-2 bg-accent text-[#0D0D0D] font-mono font-bold rounded-full hover:bg-[#F2B655] transition-colors">Start (Space)</button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-heading text-3xl font-bold mb-4 text-red-500">Popped!</h3>
            <button onClick={startGame} className="px-6 py-2 bg-accent text-[#0D0D0D] font-mono font-bold rounded-full hover:bg-[#F2B655] transition-colors">Try Again</button>
          </div>
        )}

        {gameState === 'won' && (
          <div className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-heading text-3xl font-bold mb-2 text-[#4ADE80]">Level Cleared!</h3>
            <p className="font-mono text-text-secondary text-sm mb-6">You are a true Nokia legend.</p>
            <button onClick={startGame} className="px-6 py-2 bg-accent text-[#0D0D0D] font-mono font-bold rounded-full hover:bg-[#F2B655] transition-colors">Play Again</button>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        {/* Mobile controls */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div />
          <button onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowUp'] = true; }} onTouchEnd={() => keysRef.current['ArrowUp'] = false} onMouseDown={() => keysRef.current['ArrowUp'] = true} onMouseUp={() => keysRef.current['ArrowUp'] = false} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">↑</button>
          <div />
          <button onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowLeft'] = true; }} onTouchEnd={() => keysRef.current['ArrowLeft'] = false} onMouseDown={() => keysRef.current['ArrowLeft'] = true} onMouseUp={() => keysRef.current['ArrowLeft'] = false} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">←</button>
          <button onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowDown'] = true; }} onTouchEnd={() => keysRef.current['ArrowDown'] = false} onMouseDown={() => keysRef.current['ArrowDown'] = true} onMouseUp={() => keysRef.current['ArrowDown'] = false} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">↓</button>
          <button onTouchStart={(e) => { e.preventDefault(); keysRef.current['ArrowRight'] = true; }} onTouchEnd={() => keysRef.current['ArrowRight'] = false} onMouseDown={() => keysRef.current['ArrowRight'] = true} onMouseUp={() => keysRef.current['ArrowRight'] = false} className="w-12 h-12 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center active:bg-accent-dim text-xl">→</button>
        </div>
      </div>
    </div>
  );
}
