"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export function Hero() {
  const [manilaTime, setManilaTime] = useState("--:--:-- --");
  const [typedText, setTypedText] = useState("");
  
  // Typewriter effect logic
  useEffect(() => {
    const phrases = [
      "A web developer who builds practical tools and modern web applications.",
      "Based in the Philippines. Focused on clean code and great UX.",
      "Turning caffeine into functional software since day one."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 45;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2500; // Pause at end
        } else {
          typingSpeed = 35 + Math.random() * 40; // Natural variation
        }
      } else {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 400; // Pause before next phrase
        } else {
          typingSpeed = 20;
        }
      }

      timeoutId = setTimeout(typeWriter, typingSpeed);
    };

    timeoutId = setTimeout(typeWriter, 1200);
    return () => clearTimeout(timeoutId);
  }, []);

  // Manila Time logic
  useEffect(() => {
    const updateManilaTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setManilaTime(now.toLocaleTimeString("en-US", options));
    };
    
    updateManilaTime();
    const intervalId = setInterval(updateManilaTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center max-w-[1100px] mx-auto px-6 pt-[100px] md:pt-[120px] pb-20 relative overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute top-0 -right-[100px] w-[500px] h-[500px] opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-border-primary) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)"
        }}
      />
      
      <div className="flex-1 max-w-[720px] z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.85rem] text-accent mb-4 flex items-center gap-2"
        >
          <span className="text-text-muted animate-[blink-caret_1s_step-end_infinite]">&gt;</span>
          <span>hello, world</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-[clamp(2.8rem,7vw,5rem)] font-bold tracking-tight leading-[1.05] mb-5 max-md:text-[clamp(2.2rem,10vw,3.2rem)]"
        >
          I&apos;m <span className="text-accent">Daivid</span><span className="text-text-muted">.</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-[clamp(0.85rem,2vw,1.05rem)] text-text-secondary min-h-[3.4em] leading-[1.7] mb-8 relative"
        >
          <span>{typedText}</span>
          <span className="inline-block w-[2px] h-[1.1em] bg-accent align-text-bottom ml-[2px] animate-[blink-caret_0.8s_step-end_infinite]"></span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3 flex-wrap mb-10"
        >
          <a href="#projects" className="font-mono text-[0.8rem] px-7 py-3 rounded-full border border-accent bg-accent text-[#0D0D0D] font-semibold tracking-wide transition-all duration-300 hover:bg-[#F0B050] hover:border-[#F0B050] hover:shadow-[0_0_30px_var(--color-accent-glow)] hover:-translate-y-[1px] inline-flex items-center gap-2">
            view my work →
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.8rem] px-7 py-3 rounded-full border border-border-primary bg-transparent text-text-primary tracking-wide transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_var(--color-accent-dim)] hover:-translate-y-[1px] inline-flex items-center gap-2">
            <Download size={16} />
            Resume
          </a>
          <a href="https://github.com/rexflores" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.8rem] px-7 py-3 rounded-full border border-border-primary bg-transparent text-text-primary tracking-wide transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_var(--color-accent-dim)] hover:-translate-y-[1px] inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex flex-col gap-2 p-4 px-5 bg-bg-secondary border border-border-primary rounded-xl font-mono text-[0.75rem] text-text-secondary max-w-[320px]"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-[pulse-dot_2s_ease-in-out_infinite]"></div>
            <span className="text-text-muted">Manila, PH —</span>
            <span className="text-text-primary font-medium">{manilaTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted">Currently:</span>
            <span className="text-text-primary font-medium">Building cool stuff ✦</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
