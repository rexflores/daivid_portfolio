"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function LiveViewers() {
  const [viewers, setViewers] = useState<number | null>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    // Generate an anonymous session ID for this visitor on first load
    if (!sessionIdRef.current) {
      sessionIdRef.current = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const fetchViewers = async () => {
      try {
        const response = await fetch("/api/viewers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setViewers(data.count);
        }
      } catch (error) {
        console.error("Failed to ping live viewers", error);
      }
    };

    // Ping immediately on load
    fetchViewers();

    // Ping every 15 seconds to stay alive in the Redis database
    const interval = setInterval(fetchViewers, 15000);
    return () => clearInterval(interval);
  }, []);

  // Don't show the pill until we have real data from the database
  if (viewers === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border-primary bg-bg-secondary/40 backdrop-blur-md mb-6 shadow-sm"
    >
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <span className="font-mono text-[0.7rem] sm:text-xs text-text-secondary tracking-wide lowercase">
        <strong className="text-text-primary font-bold">{viewers}</strong> {viewers === 1 ? 'person' : 'people'} viewing right now
      </span>
    </motion.div>
  );
}
