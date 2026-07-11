"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <>
      <section id="contact" className="py-20 md:py-[120px] max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[0.85rem] text-accent tracking-widest mb-4 block">05. What&apos;s Next?</span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-text-primary tracking-tight mb-6">Get In Touch</h2>
          
          <p className="text-text-secondary leading-[1.8] font-body text-[1.05rem] mb-12">
            Although I&apos;m not currently looking for any new opportunities, my inbox is always open. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <a 
            href="mailto:rexluci.flores@gmail.com" 
            className="font-mono text-[0.9rem] px-8 py-4 rounded bg-transparent border border-accent text-accent tracking-wide transition-all duration-300 hover:bg-accent-dim hover:shadow-[0_0_20px_var(--color-accent-dim)] hover:-translate-y-[2px] inline-block"
          >
            Say Hello
          </a>
        </motion.div>
      </section>

      <footer className="py-6 text-center font-mono text-[0.8rem] text-text-muted mt-auto border-t border-border-primary/30">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Daivid. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://github.com/rexflores" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/rexflores" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
