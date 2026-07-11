"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 md:py-[120px] max-w-[1100px] mx-auto px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-[0.85rem] text-accent tracking-widest">01.</span>
        <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-text-primary tracking-tight">About Me</h2>
        <div className="h-[1px] flex-1 bg-border-primary max-w-[300px]"></div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-[60px] md:gap-[100px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-secondary leading-[1.8] font-body text-[1.05rem]"
        >
          <p className="mb-5">
            Hello! My name is <span className="text-accent font-medium">Rex &quot;Daivid&quot; Flores</span> and my journey with computers started back in the day with our very first family PC — you know, the ones with monitors so huge they looked pregnant at the back! With no internet and zero games installed, my curiosity pushed me to figure out how things worked.
          </p>
          <p className="mb-5">
            I found a workaround by downloading games at a local internet cafe and bringing them home. That simple desire to play OG games like <em>Plants vs. Zombies</em> and, later on, <em>League of Legends</em>, snowballed into me learning how to install operating systems, troubleshoot hardware issues, and fix OS errors on my own.
          </p>
          <p className="mb-5">
            Fast-forward to today, I&apos;ve graduated with a degree in Computer Engineering Technology, turning those childhood hobbies into a true passion. Now, my skills span far beyond getting games to run — I know how computers work inside out, how to set up networks, build custom user tools, design web applications, and even wire circuits.
          </p>
          <div className="mt-12 pl-6 border-l-2 border-accent relative py-2 flex items-center gap-3">
            <span className="font-heading text-[2.5rem] text-accent leading-none h-6 mt-[-15px]">&quot;</span>
            <p className="font-heading text-[1.3rem] text-text-primary italic font-medium leading-[1.5] m-0">
              Debugging life, one line at a time.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[300px] mx-auto md:max-w-none md:mx-0"
        >
          <div className="relative z-10 rounded-[4px] overflow-hidden group">
            <div className="w-full aspect-square min-h-[280px] relative border border-border-hover bg-bg-secondary">
              <div className="absolute inset-0 bg-accent/20 mix-blend-multiply transition-all duration-300 group-hover:opacity-0 z-10 pointer-events-none"></div>
              <Image 
                src="/images/profile.jpg"
                alt="Rex Daivid Flores"
                width={400}
                height={400}
                priority
                className="w-full h-auto aspect-square object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.05]"
              />
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-accent rounded-[4px] translate-x-5 translate-y-5 transition-transform duration-300 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
}
