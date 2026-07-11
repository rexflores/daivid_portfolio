"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { SnakeGame } from "./SnakeGame";
import { BounceGame } from "./BounceGame";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameModal({ isOpen, onClose }: GameModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [selectedGame, setSelectedGame] = useState<'menu' | 'snake' | 'bounce'>('menu');

  // Reset to menu when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSelectedGame('menu'), 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-bg-card border border-border-primary rounded-2xl p-6 shadow-2xl w-full max-w-[500px]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-accent bg-bg-secondary hover:bg-accent-dim rounded-full transition-colors"
              aria-label="Close game"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6 flex justify-between items-center">
              <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
                {selectedGame !== 'menu' && (
                  <button onClick={() => setSelectedGame('menu')} className="mr-2 text-text-secondary hover:text-accent transition-colors" aria-label="Back to menu">
                    <ChevronLeft size={24} />
                  </button>
                )}
                <span className="text-accent">daivid</span><span className="text-text-muted">.dev</span>
                <span className="text-text-primary">Arcade</span>
              </h2>
            </div>

            {selectedGame === 'menu' && (
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setSelectedGame('snake')}
                  className="flex flex-col items-start p-6 border border-border-primary rounded-xl bg-bg-secondary hover:border-accent hover:shadow-[0_0_20px_rgba(226,160,57,0.1)] transition-all duration-300 group"
                >
                  <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">Snake</h3>
                  <p className="font-mono text-sm text-text-secondary mt-2 text-left">The classic Nokia 3310 experience. Eat the golden squares, don&apos;t hit the walls.</p>
                </button>
                
                <button 
                  onClick={() => setSelectedGame('bounce')}
                  className="flex flex-col items-start p-6 border border-border-primary rounded-xl bg-bg-secondary hover:border-accent hover:shadow-[0_0_20px_rgba(226,160,57,0.1)] transition-all duration-300 group"
                >
                  <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">Nokia Bounce</h3>
                  <p className="font-mono text-sm text-text-secondary mt-2 text-left">A custom-built 2D physics engine. Bounce the red ball, collect hoops, and avoid spikes!</p>
                </button>
              </div>
            )}

            {selectedGame === 'snake' && <SnakeGame />}
            {selectedGame === 'bounce' && <BounceGame />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
