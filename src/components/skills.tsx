"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  Atom,
  Braces,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  GitCommit,
  Globe,
  Layers,
  Monitor,
  Palette,
  PenTool,
  Repeat,
  Route,
  Send,
  Server,
  Triangle,
  Wind,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Skill = {
  name: string;
  Icon: ComponentType<{ className?: string }>;
};

type TabId = "all" | "frontend" | "backend" | "tools";

/* ------------------------------------------------------------------ */
/* Skill data (left column pills)                                      */
/* ------------------------------------------------------------------ */

const frontendSkills: Skill[] = [
  { name: "HTML5", Icon: Code2 },
  { name: "CSS3", Icon: Palette },
  { name: "JavaScript", Icon: Braces },
  { name: "TypeScript", Icon: FileCode2 },
  { name: "React.js", Icon: Atom },
  { name: "Next.js", Icon: Layers },
  { name: "Tailwind CSS", Icon: Wind },
];

const backendSkills: Skill[] = [
  { name: "Node.js", Icon: Server },
  { name: "Express.js", Icon: Route },
  { name: "MongoDB", Icon: Database },
  { name: "REST API", Icon: Globe },
];

const toolSkills: Skill[] = [
  { name: "Git", Icon: GitBranch },
  { name: "GitHub", Icon: GitCommit },
  { name: "VS Code", Icon: Monitor },
  { name: "Vercel", Icon: Triangle },
  { name: "Postman", Icon: Send },
];

const allSkills: Skill[] = [...frontendSkills, ...backendSkills, ...toolSkills];

const tabs: { id: TabId; label: string; skills: Skill[] }[] = [
  { id: "all", label: "All", skills: allSkills },
  { id: "frontend", label: "Frontend", skills: frontendSkills },
  { id: "backend", label: "Backend", skills: backendSkills },
  { id: "tools", label: "Tools & Others", skills: toolSkills },
];

/* ------------------------------------------------------------------ */
/* Orbit icon colors                                                   */
/* ------------------------------------------------------------------ */

const orbitAccents = {
  blue: {
    icon: "text-blue-300",
    border: "border-blue-400/25",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.20)]",
  },
  cyan: {
    icon: "text-cyan-300",
    border: "border-cyan-400/25",
    glow: "shadow-[0_0_16px_rgba(34,211,238,0.18)]",
  },
  indigo: {
    icon: "text-indigo-300",
    border: "border-indigo-400/25",
    glow: "shadow-[0_0_16px_rgba(129,140,248,0.20)]",
  },
  purple: {
    icon: "text-purple-300",
    border: "border-purple-400/25",
    glow: "shadow-[0_0_16px_rgba(168,85,247,0.18)]",
  },
  fuchsia: {
    icon: "text-fuchsia-300",
    border: "border-fuchsia-400/25",
    glow: "shadow-[0_0_16px_rgba(217,70,239,0.18)]",
  },
  emerald: {
    icon: "text-emerald-300",
    border: "border-emerald-400/25",
    glow: "shadow-[0_0_16px_rgba(52,211,153,0.18)]",
  },
  amber: {
    icon: "text-amber-300",
    border: "border-amber-400/25",
    glow: "shadow-[0_0_16px_rgba(251,191,36,0.18)]",
  },
  orange: {
    icon: "text-orange-300",
    border: "border-orange-400/25",
    glow: "shadow-[0_0_16px_rgba(251,146,60,0.18)]",
  },
  sky: {
    icon: "text-sky-300",
    border: "border-sky-400/25",
    glow: "shadow-[0_0_16px_rgba(56,189,248,0.18)]",
  },
  zinc: {
    icon: "text-zinc-200",
    border: "border-white/15",
    glow: "shadow-[0_0_16px_rgba(255,255,255,0.08)]",
  },
};

type AccentKey = keyof typeof orbitAccents;

type OrbitSkill = Skill & {
  accent: AccentKey;
};

/* ------------------------------------------------------------------ */
/* Orbit data                                                          */
/* ------------------------------------------------------------------ */

// Inner ring - the core stack shown closest to the center.
const innerOrbitSkills: OrbitSkill[] = [
  { name: "React.js", Icon: Atom, accent: "cyan" },
  { name: "Next.js", Icon: Layers, accent: "indigo" },
  { name: "TypeScript", Icon: FileCode2, accent: "blue" },
  { name: "Node.js", Icon: Server, accent: "emerald" },
  { name: "Express.js", Icon: Route, accent: "zinc" },
  { name: "MongoDB", Icon: Database, accent: "emerald" },
];

// Outer ring - the wider set of tools and supporting technologies.
const outerOrbitSkills: OrbitSkill[] = [
  { name: "HTML5", Icon: Code2, accent: "orange" },
  { name: "CSS3", Icon: Palette, accent: "sky" },
  { name: "JavaScript", Icon: Braces, accent: "amber" },
  { name: "Tailwind CSS", Icon: Wind, accent: "cyan" },
  { name: "Vite", Icon: Zap, accent: "purple" },
  { name: "Figma", Icon: PenTool, accent: "fuchsia" },
  { name: "Redux", Icon: Repeat, accent: "purple" },
  { name: "REST API", Icon: Globe, accent: "sky" },
  { name: "Git", Icon: GitBranch, accent: "orange" },
  { name: "GitHub", Icon: GitCommit, accent: "zinc" },
  { name: "VS Code", Icon: Monitor, accent: "blue" },
  { name: "Vercel", Icon: Triangle, accent: "zinc" },
  { name: "Postman", Icon: Send, accent: "orange" },
  { name: "Docker", Icon: Container, accent: "sky" },
];

// The counter-rotation must use exactly the same duration as its ring,
// otherwise the icons would slowly tilt while orbiting.
const OUTER_ORBIT_DURATION = "45s";
const INNER_ORBIT_DURATION = "32s";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Reuses the orbit palette for the small icons in the left-column
 * skill pills, so each technology keeps its own color.
 */
function getSkillIconColor(name: string) {
  const match = [...innerOrbitSkills, ...outerOrbitSkills].find(
    (skill) => skill.name === name
  );

  return orbitAccents[match?.accent ?? "blue"].icon;
}

/**
 * Places an icon evenly around a circle.
 * `left` and `top` are percentages of the square orbit container.
 */
function getOrbitPosition(index: number, total: number, radiusPercent: number) {
  const angle = (index / total) * 360 - 90; // Start from the top
  const radians = (angle * Math.PI) / 180;

  return {
    left: `${50 + Math.cos(radians) * radiusPercent}%`,
    top: `${50 + Math.sin(radians) * radiusPercent}%`,
  };
}

/* ------------------------------------------------------------------ */
/* Orbit icon                                                          */
/* ------------------------------------------------------------------ */

function OrbitIcon({
  skill,
  index,
  total,
  radiusPercent,
  counterClass,
  counterDuration,
  tileSize,
  iconSize,
}: {
  skill: OrbitSkill;
  index: number;
  total: number;
  radiusPercent: number;
  counterClass: string;
  counterDuration: string;
  tileSize: string;
  iconSize: string;
}) {
  const { Icon, name } = skill;
  const accent = orbitAccents[skill.accent];
  const position = getOrbitPosition(index, total, radiusPercent);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={position}>
      {/* Counter-rotation cancels the ring rotation so icons stay upright. */}
      <div
        className={counterClass}
        style={{ animationDuration: counterDuration }}
      >
        <div
          className={`group relative flex ${tileSize} items-center justify-center rounded-full border bg-[#070c15]/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${accent.border} ${accent.glow}`}
        >
          <Icon
            className={`${iconSize} transition-colors duration-300 group-hover:text-white ${accent.icon}`}
          />

          {/* Tooltip with the skill name */}
          <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-background/95 px-2 py-0.5 text-[10px] font-medium text-zinc-300 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Skills section                                                 */
/* ------------------------------------------------------------------ */

export function Skills() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Reveal the section when it scrolls into view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Skills shown in the pill list for the active tab.
  const activeSkills =
    tabs.find((tab) => tab.id === activeTab)?.skills ?? allSkills;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-background pt-20 sm:pt-14 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* Two-column layout: text/pills on the left, orbit on the right */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* ================= LEFT COLUMN ================= */}
          <div>
            {/* ---------- HEADING ---------- */}
            <h2
              className={`text-3xl font-bold tracking-tight text-white transition-all duration-700 sm:text-4xl lg:text-5xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Skills &amp; Expertise
              </span>
            </h2>

            <p
              className={`mt-3 text-sm leading-relaxed text-zinc-400 transition-all duration-700 sm:text-base ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Technologies and tools I use to build scalable web applications.
            </p>

            {/* ---------- TABS ---------- */}
            <div
              className={`mt-6 flex flex-wrap items-center gap-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
              role="tablist"
              aria-label="Skill categories"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* ---------- SKILL PILLS ---------- */}
            {/* Keying the wrapper by activeTab replays the entrance animation. */}
            <div
              key={activeTab}
              className="mt-5 flex flex-wrap gap-2.5"
              role="tabpanel"
            >
              {activeSkills.map((skill, index) => {
                const { Icon } = skill;

                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 cursor-pointer rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-zinc-300 backdrop-blur-sm transition-all duration-300  hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/10 hover:text-white animate-slide-up-fade"
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    <Icon
                      className={`h-4 w-4 ${getSkillIconColor(skill.name)}`}
                    />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TWO ORBIT RINGS ================= */}
          <div
            className={`relative mx-auto aspect-square w-full max-w-[425px] transition-all duration-1000 lg:mr-0 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* Soft blue-purple glow behind the center */}
            <div
              className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.20),rgba(168,85,247,0.10)_38%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />

            {/* Static orbit paths */}
            <div
              className="pointer-events-none absolute inset-[8%] rounded-full border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.06)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-[22%] rounded-full border border-white/10"
              aria-hidden="true"
            />

            {/* Outer ring - rotates clockwise */}
            <div
              className="absolute inset-0 animate-orbit-cw"
              style={{ animationDuration: OUTER_ORBIT_DURATION }}
            >
              {outerOrbitSkills.map((skill, index) => (
                <OrbitIcon
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={outerOrbitSkills.length}
                  radiusPercent={42}
                  counterClass="animate-orbit-ccw"
                  counterDuration={OUTER_ORBIT_DURATION}
                  tileSize="h-8 w-8 sm:h-10 sm:w-10"
                  iconSize="h-4 w-4 sm:h-5 sm:w-5"
                />
              ))}
            </div>

            {/* Inner ring - rotates counter-clockwise */}
            <div
              className="absolute inset-0 animate-orbit-ccw"
              style={{ animationDuration: INNER_ORBIT_DURATION }}
            >
              {innerOrbitSkills.map((skill, index) => (
                <OrbitIcon
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={innerOrbitSkills.length}
                  radiusPercent={28}
                  counterClass="animate-orbit-cw"
                  counterDuration={INNER_ORBIT_DURATION}
                  tileSize="h-10 w-10 sm:h-12 sm:w-12"
                  iconSize="h-5 w-5 sm:h-6 sm:w-6"
                />
              ))}
            </div>

            {/* Center badge */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-br from-blue-500/20 via-[#080d1a]/90 to-purple-500/20 shadow-[0_0_45px_rgba(59,130,246,0.28),0_0_90px_rgba(168,85,247,0.18)] backdrop-blur-md sm:h-[128px] sm:w-[128px]">
              <span className="text-[8px] uppercase tracking-[0.3em] text-blue-100/60 sm:text-[9px]">
                Dev Stack
              </span>
              <Code2 className="my-1 h-6 w-6 text-blue-300 sm:h-7 sm:w-7" />
              <span className="text-[8px] uppercase tracking-[0.3em] text-blue-100/60 sm:text-[9px]">
                Full Stack
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
