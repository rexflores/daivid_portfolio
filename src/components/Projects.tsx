"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GithubModal } from "./GithubModal";

export function Projects() {
  const [activeRepo, setActiveRepo] = useState<string | null>(null);

  const featuredProjects = [
    {
      title: "PDFRecordManager",
      description: "A Windows desktop app for organizing, merging, and reviewing PDF employee records. It provides fast search, guided save/merge workflows, and batch processing tools with a modernized Tkinter UI.",
      techStack: ["Python", "Tkinter", "Windows"],
      githubUrl: "https://github.com/rexflores/PDFRecordManager",
      liveUrl: "",
      image: "/images/projects/pdf-manager.png",
      featured: true,
    },
    {
      title: "Window Scroll Capture",
      description: "A Python utility for capturing scrolling window content. Automates screenshot stitching for full-page captures. Features a seamless method for acquiring and processing continuous scroll captures.",
      techStack: ["Python", "Automation", "Windows"],
      githubUrl: "https://github.com/rexflores/window_scroll_capture",
      liveUrl: "",
      image: "/images/projects/window-scroll-capture.png",
      featured: false,
    },
    {
      title: "Resume Generator",
      description: "A web application that helps users easily create professional resumes. Users can input their details into a clean interface and export the final product as a perfectly formatted PDF. Includes multiple templates and live preview.",
      techStack: ["HTML5", "CSS3", "JavaScript", "jspdf"],
      githubUrl: "https://github.com/rexflores/Resume-Generator-no_img",
      liveUrl: "https://resume-generator-no-img.vercel.app/",
      image: "/images/projects/resume-generator.png",
      featured: false,
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-[120px] max-w-[1100px] mx-auto px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-[0.85rem] text-accent tracking-widest">02.</span>
        <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-text-primary tracking-tight">Some Things I&apos;ve Built</h2>
        <div className="h-[1px] flex-1 bg-border-primary max-w-[300px]"></div>
      </motion.div>
      
      <div className="flex flex-col gap-12 md:gap-[100px]">
        {featuredProjects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col md:grid md:gap-2 md:grid-cols-12 md:items-center ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}
          >
            {/* Project Image Mockup */}
            <div 
              onClick={() => {
                if (project.githubUrl) {
                  setActiveRepo(project.githubUrl.replace('https://github.com/', ''));
                }
              }}
              className={`relative w-full h-[250px] md:h-full md:min-h-[300px] rounded border border-border-primary overflow-hidden shadow-lg bg-bg-secondary group ${project.githubUrl ? 'cursor-pointer' : ''}
              ${i % 2 !== 0 ? 'md:col-start-6 md:col-end-13' : 'md:col-start-1 md:col-end-8'}
              md:row-start-1 md:row-end-2 mb-6 md:mb-0`}
            >
              {/* Image & Overlay */}
              <div className="absolute inset-0 bg-accent/20 mix-blend-screen transition-opacity duration-300 group-hover:opacity-0 z-10" />
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Click indicator overlay */}
              {project.githubUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-bg-primary/40 backdrop-blur-[2px]">
                  <div className="bg-bg-card px-4 py-2 rounded-full border border-border-primary flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Code className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-text-primary">View Live Repo</span>
                  </div>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className={`relative z-10 flex flex-col justify-center w-full
              ${i % 2 !== 0 ? 'md:col-start-1 md:col-end-7 md:items-start' : 'md:col-start-7 md:col-end-13 md:items-end'}
              md:row-start-1 md:row-end-2`}
            >
              <p className="font-mono text-[0.8rem] text-accent mb-2">Featured Project</p>
              <h3 className="font-heading text-[clamp(1.5rem,3vw,1.75rem)] font-bold text-text-primary mb-5">{project.title}</h3>
              
              <div className={`bg-transparent md:bg-bg-card md:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] md:border border-border-hover p-0 md:p-6 rounded text-text-secondary text-[0.95rem] md:text-[1rem] leading-[1.6] mb-5 transition-transform md:hover:-translate-y-1 z-20 md:text-left
                ${i % 2 !== 0 ? 'md:-mr-10' : 'md:-ml-10'}`}
              >
                <p>{project.description}</p>
              </div>
              
              <ul className={`flex flex-wrap gap-4 font-mono text-[0.8rem] text-text-muted mb-5 list-none z-20
                ${i % 2 !== 0 ? 'justify-start' : 'md:justify-end justify-start'}`}
              >
                {project.techStack.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              
              <div className={`flex items-center gap-4 text-text-primary z-20
                ${i % 2 !== 0 ? 'justify-start' : 'md:justify-end justify-start'}`}
              >
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors p-2 -m-2" aria-label="GitHub Link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors p-2 -m-2" aria-label="External Link">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <GithubModal 
        isOpen={!!activeRepo} 
        repoName={activeRepo || ""} 
        onClose={() => setActiveRepo(null)} 
      />
    </section>
  );
}
