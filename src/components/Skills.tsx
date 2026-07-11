"use client";

import { motion } from "framer-motion";

export function Skills() {
  const row1 = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "Express",
    "Java", "Python", "HTML5", "CSS3", "Tailwind CSS", "Sass"
  ];
  
  const row2 = [
    "MongoDB", "Firebase", "PostgreSQL", "Git", "GitHub", "Maven",
    "Figma", "VS Code", "Vercel", "Linux", "REST APIs", "GraphQL"
  ];

  // Helper to render duplicated list for infinite scroll
  const renderMarqueeList = (items: string[], reverse = false) => {
    return (
      <div className={`flex items-center gap-4 ${reverse ? 'animate-[marquee-reverse_30s_linear_infinite]' : 'animate-[marquee_30s_linear_infinite]'}`}>
        {[...items, ...items].map((item, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 bg-bg-card border border-border-primary text-text-secondary px-6 py-3 rounded-full font-mono text-[0.9rem] whitespace-nowrap transition-colors hover:text-accent hover:border-accent"
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 md:py-[120px] relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-[0.85rem] text-accent tracking-widest">03.</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-text-primary tracking-tight">Technologies I Use</h2>
          <div className="h-[1px] flex-1 bg-border-primary max-w-[300px]"></div>
        </motion.div>
      </div>
      
      {/* Marquee Tracks */}
      <div className="relative flex flex-col gap-5 py-5 -rotate-2 scale-105">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 10px)); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(calc(-50% - 10px)); }
            100% { transform: translateX(0); }
          }
        `}} />
        
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-[150px] bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-fit hover:[animation-play-state:paused]">
          {renderMarqueeList(row1, false)}
        </div>
        
        <div className="flex w-fit hover:[animation-play-state:paused]">
          {renderMarqueeList(row2, true)}
        </div>
      </div>
    </section>
  );
}
