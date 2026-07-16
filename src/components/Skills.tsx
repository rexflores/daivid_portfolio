"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Database, Wrench, Wifi, UserCheck } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code2 className="w-5 h-5 text-accent" />,
      skills: ["C/C++", "Java", "Python", "SQL", "VBS/VBA", "JavaScript (ES6+)", "TypeScript"]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-5 h-5 text-accent" />,
      skills: ["React", "Next.js", "Node.js", "Express", "HTML5", "CSS3", "Tailwind CSS", "Sass", "Bootstrap", "PHP", "Firebase", "REST APIs", "GraphQL"]
    },
    {
      title: "Databases & Infra",
      icon: <Database className="w-5 h-5 text-accent" />,
      skills: ["MongoDB", "PostgreSQL", "Linux", "Vercel"]
    },
    {
      title: "Tools & Software",
      icon: <Wrench className="w-5 h-5 text-accent" />,
      skills: ["Git", "GitHub", "Maven", "Figma", "VS Code", "Android Studio", "Canva", "Microsoft Office"]
    },
    {
      title: "Networking & IoT",
      icon: <Wifi className="w-5 h-5 text-accent" />,
      skills: ["Routing & Switching", "IP Addressing & Subnetting", "VLANs", "Packet Tracer", "IoT (ESP32)"]
    },
    {
      title: "Support & Soft Skills",
      icon: <UserCheck className="w-5 h-5 text-accent" />,
      skills: ["Hardware/software troubleshooting", "OS installation", "System configuration", "Organization", "Multitasking", "Adaptability", "Attention to detail"]
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-[120px] relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-[0.85rem] text-accent tracking-widest">03.</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] font-bold text-text-primary tracking-tight">Capabilities & Tools</h2>
          <div className="h-[1px] flex-1 bg-border-primary max-w-[300px]"></div>
        </motion.div>
      </div>
      
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-card/50 backdrop-blur-md border border-border-primary rounded-xl p-6 shadow-lg hover:border-accent/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 bg-bg-secondary border border-border-hover rounded-md font-mono text-xs text-text-secondary hover:text-accent hover:border-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </section>
  );
}
