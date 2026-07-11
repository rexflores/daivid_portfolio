"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      type: "work",
      title: "Admin Staff",
      organization: "Asian Development Bank (ADB)",
      date: "Feb 2025 — July 2026",
      description: "Assisted in administrative tasks, maintained internal records, and provided technical support for office operations. Streamlined document management processes leading to improved efficiency in data retrieval.",
      icon: Briefcase
    },
    {
      type: "education",
      title: "Bachelor of Engineering Technology in Computer Engineering Technology",
      organization: "Technological University of the Philippines - Manila",
      date: "2021 — 2025",
      description: "Relevant Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, Software Engineering, Internet of Things (IoT).",
      icon: GraduationCap
    }
  ];

  return (
    <section id="education" className="py-20 md:py-[120px] max-w-[1100px] mx-auto px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-[0.85rem] text-accent tracking-widest">04.</span>
        <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-text-primary tracking-tight">Experience & Education</h2>
        <div className="h-[1px] flex-1 bg-border-primary max-w-[300px]"></div>
      </motion.div>
      
      <div className="relative max-w-[800px] mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-[20px] md:left-[50%] top-0 bottom-0 w-[2px] bg-border-primary transform md:-translate-x-1/2 rounded"></div>
        
        <div className="flex flex-col gap-12 pt-6">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            const isEven = i % 2 === 0;
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full
                  ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {/* Center Icon */}
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-bg-secondary border-[3px] border-accent z-10 text-accent">
                  <Icon size={18} />
                </div>
                
                {/* Content Card */}
                <div className={`ml-[60px] md:ml-0 md:w-[calc(50%-40px)] bg-bg-card p-6 rounded border border-border-primary shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 hover:border-accent
                  ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className="font-mono text-[0.85rem] text-accent mb-2">{exp.date}</div>
                  <h3 className="font-heading text-[1.25rem] font-bold text-text-primary mb-1">{exp.title}</h3>
                  <div className="text-[0.95rem] font-medium text-text-secondary mb-4">{exp.organization}</div>
                  <p className="text-[0.95rem] text-text-muted leading-[1.6]">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
