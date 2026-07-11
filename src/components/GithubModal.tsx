"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GithubRepoWidget } from "./GithubRepoWidget";
import { useEffect } from "react";

interface GithubModalProps {
  repoName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GithubModal({ repoName, isOpen, onClose }: GithubModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-[#0d1117] rounded-xl shadow-2xl border border-[#30363d] overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#30363d] sticky top-0 bg-[#0d1117]/90 backdrop-blur-md z-10">
              <h2 className="text-sm font-semibold text-[#c9d1d9] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live GitHub Connection
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] transition-colors border border-transparent hover:border-[#30363d]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Widget */}
            <div className="p-0 sm:p-4 bg-[#010409]">
              <GithubRepoWidget repoName={repoName} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
