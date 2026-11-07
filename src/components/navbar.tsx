"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navbar Component
 * A responsive navigation bar with:
 * - Logo
 * - Navigation links with smooth scroll & active highlighting
 * - "Let's Talk" CTA button
 * - Mobile hamburger menu
 * - Dark glassmorphism background with gradient border
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Track scroll position for sticky backdrop effect & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Determine active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active when its top is near the top of viewport (offset for navbar height)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links with section IDs for smooth scrolling
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // Handle smooth scrolling to sections
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  // Check if a link is active
  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Always have glassmorphism background, enhanced when scrolled
        "bg-background/60 backdrop-blur-xl border-b border-blue-500/10",
        isScrolled &&
          "bg-background/85 shadow-[0_4px_20px_-4px_rgb(59,130,246/0.15)] border-blue-500/20"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Subtle gradient border line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - More prominent with subtle glow */}
          <Link
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgb(139,92,246/0.4)]"
            aria-label="Go to homepage"
            onClick={(e) => handleSmoothScroll(e, "#home")}
          >
            MIRAZ.
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-200",
                    active
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground/90"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {/* Animated underline - always visible for active, on hover for others */}
                  <span
                    className={cn(
                      "absolute bottom-[-6px] left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300",
                      active ? "w-full opacity-100" : "w-0 opacity-0 hover:w-full hover:opacity-100"
                    )}
                    aria-hidden="true"
                  />
                  {/* Active indicator dot */}
                  {active && (
                    <span
                      className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* "Let's Talk" Button - Desktop - Enhanced gradient with glow */}
            <Button
              className={cn(
                "hidden lg:inline-flex font-medium px-6 py-2.5",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
                "text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
                "transition-all duration-300",
                "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-pink-400 before:opacity-0 before:transition-opacity hover:before:opacity-20"
              )}
              onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              <span className="relative z-10">Let&apos;s Talk</span>
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Improved glassmorphism design */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div
            className="flex flex-col gap-2 pt-4 pb-2 px-2"
            style={{
              background: "linear-gradient(180deg, rgba(15,15,25,0.95) 0%, rgba(10,10,20,0.9) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: "1rem",
              border: "1px solid rgba(59,130,246,0.15)",
              boxShadow: "0 8px 32px -8px rgba(59,130,246,0.15)",
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200",
                    active
                      ? "bg-blue-500/15 text-blue-300 border-l-4 border-blue-400"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <span
                      className="ml-auto w-2 h-2 rounded-full bg-blue-400"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            {/* Mobile CTA Button */}
            <Button
              className={cn(
                "w-full justify-center font-medium px-6 py-3 mt-2",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
                "text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
                "transition-all duration-300"
              )}
              onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}