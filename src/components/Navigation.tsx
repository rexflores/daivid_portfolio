"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Determine active section
      const sections = document.querySelectorAll("section[id], .hero[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "about", href: "#about" },
    { name: "projects", href: "#projects" },
    { name: "skills", href: "#skills" },
    { name: "background", href: "#education" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-between transition-all duration-400 ease-in-out border rounded-full backdrop-blur-xl bg-nav-bg
          ${
            scrolled
              ? "top-2 py-1.5 px-5 w-[min(88vw,760px)] border-accent-dim shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
              : "top-4 py-2.5 px-6 w-[min(92vw,900px)] border-border-primary"
          }
        `}
      >
        <div className="font-mono font-bold text-[0.95rem] text-accent tracking-tight whitespace-nowrap">
          daivid<span className="text-text-muted">.dev</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-1 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all duration-250 lowercase tracking-wide
                  ${
                    activeSection === link.href.substring(1)
                      ? "text-accent bg-accent-dim"
                      : "text-text-secondary hover:text-accent hover:bg-accent-dim"
                  }
                `}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 border-none bg-transparent cursor-pointer flex items-center justify-center rounded-full transition-colors hover:bg-accent-dim text-accent relative"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon size={20} className="transition-transform duration-500" />
            ) : (
              <Sun size={20} className="transition-transform duration-500 rotate-180" />
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1 text-text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[75px] left-2 right-2 bg-nav-bg backdrop-blur-xl border border-border-primary rounded-2xl p-3 flex flex-col gap-1 z-[9998]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm px-4 py-2.5 rounded-xl text-text-secondary hover:text-accent hover:bg-accent-dim lowercase"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
