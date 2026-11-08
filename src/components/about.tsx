"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

/**
 * About Me Section
 *
 * Layout matches the reference screenshot:
 *   • Full-width dark section
 *   • Rounded pill badge with a user icon and "Something About Me"
 *   • Large "Who I Am" heading with gradient on "I Am"
 *   • Left thin gradient vertical border around the content
 *   • Three left-aligned paragraphs
 *
 * Uses the existing Dark Premium + Blue-Purple theme.
 */
export function About() {
  // Controls the scroll-reveal animation (fade-in + slide-up).
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Fade the section in when it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="relative w-full bg-background py-14 sm:py-15 lg:py-15"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* ---------- BADGE ---------- */}
        <div
          className={`inline-flex rounded-full p-[1px] bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-blue-500/60 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-background/90 backdrop-blur-sm px-4 py-2 sm:px-5">
            {/* Icon circle with matching blue-purple gradient */}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <User className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Something About Me
            </span>
          </div>
        </div>

        {/* ---------- HEADING ---------- */}
        <h2
          className={`mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="text-white">Who </span>
          {/* Highlighted "I Am" using the existing Blue-Purple gradient */}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            I Am
          </span>
        </h2>

        {/* ---------- CONTENT WITH LEFT GRADIENT BORDER ---------- */}
        <div
          className={`relative mt-8 sm:mt-10 pl-5 sm:pl-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Thin vertical gradient line on the left */}
          <span
            className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
            aria-hidden="true"
          />

          {/* Paragraphs */}
          <div className="space-y-6">
            <p className="text-left text-base sm:text-lg leading-relaxed text-zinc-300">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                I am
              </span>{" "}
              Md. Miraz, an aspiring Full Stack Web Developer with a strong interest in creating
              modern, responsive, and user-friendly web applications.
            </p>

            <p className="text-left text-base sm:text-lg leading-relaxed text-zinc-300">
              I have hands-on experience building web applications using Next.js, React.js,
              JavaScript, TypeScript, Node.js, MongoDB, and Tailwind CSS.
            </p>

            <p className="text-left text-base sm:text-lg leading-relaxed text-zinc-300">
              I enjoy solving problems, learning new technologies, and continuously improving my
              development skills through real-world projects. My goal is to become a skilled Full
              Stack Developer where I can contribute, learn from experienced developers, and grow
              professionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}