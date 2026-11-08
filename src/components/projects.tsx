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
  /**
   * Leave this empty until you have a real screenshot inside /public.
   * Example: "/projects/studios-space.png"
   */
  image: string;
  /**
   * Leave these empty until you have the real links.
   * The buttons stay disabled while a URL is empty.
   */
  liveUrl: string;
  repoUrl: string;
  /**
   * Icon shown in the preview area while `image` is empty.
   * This is only a visual placeholder, not a generated screenshot.
   */
  previewIcon: ComponentType<{ className?: string }>;
};

/**
 * Edit this array to update the section.
 *
 * Screenshot: put your image inside /public (for example
 * /public/projects/studios-space.png) and use "/projects/studios-space.png".
 *
 * Links: paste the real URLs below. Each button automatically becomes
 * clickable as soon as its URL is filled in.
 */
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
    image: "", // Add the real screenshot path here.
    liveUrl: "", // Add the real live demo URL here.
    repoUrl: "", // Add the real repository URL here.
    previewIcon: Clapperboard,
  },
  {
    title: "BazarDor",
    description:
      "A bazar price management web application that helps users explore and manage product prices.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Better Auth",
    ],
    image: "", // Add the real screenshot path here.
    liveUrl: "", // Add the real live demo URL here.
    repoUrl: "", // Add the real repository URL here.
    previewIcon: ShoppingBag,
  },
  {
    title: "BikeZone",
    description:
      "A modern bike-related web application with a clean and user-friendly interface.",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
    image: "", // Add the real screenshot path here.
    liveUrl: "", // Add the real live demo URL here.
    repoUrl: "", // Add the real repository URL here.
    previewIcon: Bike,
  },
  {
    title: "FitLog",
    description:
      "A fitness tracking application where users can explore exercises, view details, and manage workout activities.",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    image: "", // Add the real screenshot path here.
    liveUrl: "", // Add the real live demo URL here.
    repoUrl: "", // Add the real repository URL here.
    previewIcon: Activity,
  },
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
      className="relative w-full scroll-mt-20 overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
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
            className={`inline-flex rounded-full bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-cyan-500/60 p-[1px] transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
            className={`mt-6 text-3xl font-bold tracking-tight text-white transition-all duration-700 sm:text-4xl lg:text-5xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
            className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 transition-all duration-700 sm:text-base ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            A selection of full-stack and frontend projects built with modern
            tools, clean interfaces, and a focus on solving real problems.
          </p>
        </div>

        {/* ================= HORIZONTAL PROJECT LIST ================= */}
        <div className="mt-10 grid gap-4 md:auto-rows-fr lg:mt-12 lg:gap-5">
          {projects.map((project, index) => {
            const PreviewIcon = project.previewIcon;
            const projectNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={project.title}
                className={`h-full transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: `${250 + index * 90}ms` }}
              >
                {/* Gradient border wrapper */}
                <article className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/30 via-white/[0.07] to-purple-500/30 p-[1px] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-0.5 hover:from-blue-400/50 hover:via-cyan-400/20 hover:to-purple-400/50 hover:shadow-[0_18px_50px_-24px_rgba(59,130,246,0.4)]">
                  <div className="relative flex h-full flex-col gap-4 rounded-[15px] bg-[#080d16]/90 p-4 backdrop-blur-sm md:flex-row md:items-center md:gap-5 md:p-5">
                    {/* Soft glow revealed on hover */}
                    <div
                      className="pointer-events-none absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    {/* ---------- SMALL PREVIEW (LEFT ON DESKTOP) ---------- */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-[#0b1220] to-purple-500/[0.08] transition-colors duration-500 group-hover:border-blue-400/20 sm:h-32 md:h-[112px] md:w-[176px]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} project preview`}
                          fill
                          sizes="(min-width: 768px) 176px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        // CSS-only placeholder. No external images are used.
                        <div className="absolute inset-0" aria-hidden="true">
                          <div
                            className="absolute inset-0 opacity-50"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
                              backgroundSize: "24px 24px",
                            }}
                          />
                          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-2xl" />

                          {/* Tiny browser top bar */}
                          <div className="absolute inset-x-3 top-2.5 flex items-center gap-1">
                            <span className="h-1 w-1 rounded-full bg-rose-400/50" />
                            <span className="h-1 w-1 rounded-full bg-amber-400/50" />
                            <span className="h-1 w-1 rounded-full bg-emerald-400/50" />
                            <span className="ml-1.5 h-1 flex-1 rounded-full bg-white/[0.06]" />
                          </div>

                          <div className="relative flex h-full flex-col items-center justify-center gap-1 pt-4">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-[#0b1424]/80 shadow-[0_0_18px_rgba(59,130,246,0.15)] transition-transform duration-500 group-hover:scale-105">
                              <PreviewIcon className="h-4 w-4 text-blue-200/90" />
                            </span>
                            <p className="text-[10px] font-semibold tracking-tight text-zinc-300 sm:text-[11px]">
                              {project.title}
                            </p>
                            <span className="text-[8px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                              Preview
                            </span>
                          </div>
                        </div>
                      )}

                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d16]/40 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>

                    {/* ---------- PROJECT DETAILS (MIDDLE) ---------- */}
                    <div className="relative min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-blue-400/20 bg-blue-500/[0.06] px-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-blue-300/80">
                          {projectNumber}
                        </span>
                        <span
                          className="h-px w-5 bg-gradient-to-r from-blue-400/50 to-transparent"
                          aria-hidden="true"
                        />
                        <h3 className="truncate text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-100 sm:text-xl">
                          {project.title}
                        </h3>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
                        {project.description}
                      </p>

                      {/* Technology badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
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
                    </div>

                    {/* ---------- ACTIONS (RIGHT ON DESKTOP) ---------- */}
                    <div className="relative mt-1 grid shrink-0 grid-cols-2 gap-2 md:mt-0 md:w-[148px] md:grid-cols-1 md:border-l md:border-white/5 md:pl-5">
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
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
