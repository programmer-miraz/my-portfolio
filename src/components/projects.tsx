"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  Activity,
  Atom,
  Bike,
  Clapperboard,
  Code2,
  Database,
  ExternalLink,
  FileCode2,
  FolderGit2,
  GitBranch,
  Layers,
  Route,
  ShieldCheck,
  ShoppingBag,
  Wind,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Project data                                                        */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
  previewIcon: ComponentType<{ className?: string }>;
};

const projects: Project[] = [
  {
    title: "StudioSpace",
    description:
      "A peer-to-peer creative workspace and production studio sharing platform.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
    ],
    image: "/img/StudioSpace Creative Studio .png", // Add the real screenshot path here.
    liveUrl: "https://studio-space-woad-eight.vercel.app", // Add the real live demo URL here.
    repoUrl: "https://github.com/programmer-miraz/Studio-Space-server", // Add the real repository URL here.
    previewIcon: Clapperboard,
  },
  // {
  //   title: "BazarDor",
  //   description:
  //     "A bazar price management web application that helps users explore and manage product prices.",
  //   technologies: [
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "MongoDB",
  //     "Better Auth",
  //   ],
  //   image: "", // Add the real screenshot path here.
  //   liveUrl: "", // Add the real live demo URL here.
  //   repoUrl: "", // Add the real repository URL here.
  //   previewIcon: ShoppingBag,
  // },
  // {
  //   title: "BikeZone",
  //   description:
  //     "A modern bike-related web application with a clean and user-friendly interface.",
  //   technologies: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
  //   image: "", // Add the real screenshot path here.
  //   liveUrl: "", // Add the real live demo URL here.
  //   repoUrl: "", // Add the real repository URL here.
  //   previewIcon: Bike,
  // },
  // {
  //   title: "FitLog",
  //   description:
  //     "A fitness tracking application where users can explore exercises, view details, and manage workout activities.",
  //   technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
  //   image: "", // Add the real screenshot path here.
  //   liveUrl: "", // Add the real live demo URL here.
  //   repoUrl: "", // Add the real repository URL here.
  //   previewIcon: Activity,
  // },
];

/* ------------------------------------------------------------------ */
/* Technology icon styles                                              */
/* ------------------------------------------------------------------ */

type TechnologyMeta = {
  Icon: ComponentType<{ className?: string }>;
  color: string;
};

// Reuses the blue, purple, cyan and supporting colors from the Skills section.
const technologyMeta: Record<string, TechnologyMeta> = {
  "Next.js": { Icon: Layers, color: "text-indigo-300" },
  TypeScript: { Icon: FileCode2, color: "text-blue-300" },
  "Tailwind CSS": { Icon: Wind, color: "text-cyan-300" },
  "Express.js": { Icon: Route, color: "text-purple-300" },
  MongoDB: { Icon: Database, color: "text-emerald-300" },
  "Better Auth": { Icon: ShieldCheck, color: "text-fuchsia-300" },
  "React.js": { Icon: Atom, color: "text-cyan-300" },
};

const fallbackTechnology: TechnologyMeta = {
  Icon: Code2,
  color: "text-blue-300",
};

/* ------------------------------------------------------------------ */
/* Action button                                                       */
/* ------------------------------------------------------------------ */

/**
 * Renders a real link when a URL exists.
 * When the URL is empty, it renders a disabled button instead of
 * inventing a fake link.
 */
function ProjectAction({
  href,
  label,
  Icon,
  primary = false,
}: {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  primary?: boolean;
}) {
  const baseClasses =
    "inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const styleClasses = primary
    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/20 hover:from-blue-400 hover:to-purple-400 hover:shadow-purple-500/30"
    : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white";

  // No URL yet: keep the buttons visible, but make them clearly inactive.
  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={`${baseClasses} ${styleClasses} cursor-not-allowed opacity-75`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${styleClasses}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Projects section                                                    */
/* ------------------------------------------------------------------ */

export function Projects() {
  // Controls the fade-in + slide-up reveal for the header and rows.
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once.
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full md:max-w-5xl md:mx-auto  scroll-mt-20 overflow-hidden bg-background py-20 sm:py-24 mt-15 lg:py-28"
    >
      {/* ---------- BACKGROUND GLOWS AND GRID ---------- */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.055) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-purple-500/[0.08] blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div
            className={`inline-flex rounded-full bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-cyan-500/60 p-[1px] transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full bg-background/90 px-4 py-2 backdrop-blur-sm sm:px-5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <FolderGit2
                  className="h-3.5 w-3.5 text-white"
                  aria-hidden="true"
                />
              </span>
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-xs font-semibold tracking-wide text-transparent sm:text-sm">
                MY WORK
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2
            className={`mt-6 text-3xl font-bold tracking-tight text-white transition-all duration-700 sm:text-4xl lg:text-5xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {/* Short description */}
          <p
            className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 transition-all duration-700 sm:text-base ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            A selection of full-stack and frontend projects built with modern
            tools, clean interfaces, and a focus on solving real problems.
          </p>
        </div>

        {/* ================= HORIZONTAL PROJECT LIST ================= */}
        <div className="mt-10 grid gap-4 md:auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-1   lg:mt-12 lg:gap-5">
          {projects.map((project, index) => {
            const PreviewIcon = project.previewIcon;
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={project.title}
                className={`h-full transition-all duration-700 ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
                  }`}
                style={{ transitionDelay: `${250 + index * 90}ms` }}
              >
                {/* Gradient border wrapper */}
                <article className="group  relative h-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/30 via-white/[0.07] to-purple-500/30 p-[1px] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-0.5 hover:from-blue-400/50 hover:via-cyan-400/20 hover:to-purple-400/50 hover:shadow-[0_18px_50px_-24px_rgba(59,130,246,0.4)]">
                  <div className="relative h-full overflow-hidden rounded-[15px] bg-[#080d16]/90 p-4 backdrop-blur-sm md:flex md:flex-row md:p-0">
                    {/* Soft glow revealed on hover */}
                    <div
                      className="pointer-events-none absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    {/* ---------- PREVIEW (FULL-HEIGHT LEFT PANEL ON MD+) ---------- */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-[#0b1220] to-purple-500/[0.08] transition-colors  duration-500 sm:h-32 md:h-auto md:w-[42%] md:rounded-none md:border-0 lg:w-[45%]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} project preview`}
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (<div className="flex h-full items-center justify-center">
                    
                          <span className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold tracking-widest text-teal-500">
                            COMING SOON
                          </span>

                    
                         </div>
                      )}

                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d16]/40 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>

                    {/* ---------- PROJECT DETAILS (RIGHT) ---------- */}
                    <div className="relative min-w-0 flex-1 md:p-6 lg:p-7">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 mt-3 min-w-6 items-center justify-center rounded-md border border-blue-400/20 bg-blue-500/[0.06] px-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-blue-300/80">
                          {projectNumber}
                        </span>
                        <span
                          className="h-px w-5 mt-3 bg-gradient-to-r from-blue-400/50 to-transparent"
                          aria-hidden="true"
                        />
                        <h3 className="truncate mt-3 text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-100 sm:text-xl">
                          {project.title}
                        </h3>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
                        {project.description}
                      </p> 

                      {/* Technology badges */}
                      <div className="mt-3 flex flex-wrap  gap-1.5">
                        {project.technologies.map((technology) => {
                          const meta =
                            technologyMeta[technology] ?? fallbackTechnology;
                          const TechnologyIcon = meta.Icon;

                          return (
                            <span
                              key={technology}
                              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] py-0.5 pl-2 pr-2.5 text-[10px] font-medium text-zinc-300 transition-colors duration-300 hover:border-blue-400/25 hover:text-white sm:text-[11px]"
                            >
                              <TechnologyIcon
                                className={`h-3 w-3 ${meta.color}`}
                                aria-hidden="true"
                              />
                              {technology}
                            </span>
                          );
                        })}
                      </div>
                      {/* ---------- ACTIONS (BOTTOM, MD+) ---------- */}
                      <div className="relative mt-1 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-[auto_auto] md:justify-start md:gap-3 md:border-t md:border-white/5 md:pt-5">
                      <ProjectAction
                        href={project.liveUrl}
                        label="Live Demo"
                        Icon={ExternalLink}
                        primary
                      />
                      <ProjectAction
                        href={project.repoUrl}
                        label="Repository"
                        Icon={GitBranch}
                      />
                      </div>
                      </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
