"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, FileUser, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * FloatingBlob Component
 * Creates animated gradient blobs for 3D visual effects
 * Lightweight CSS-only animations for performance
 */
function FloatingBlob({
  className,
  size = "h-80 w-80",
  colors = "from-blue-500/20 to-purple-500/20",
  animationDelay = "0s",
  animationDuration = "20s",
}: {
  className?: string;
  size?: string;
  colors?: string;
  animationDelay?: string;
  animationDuration?: string;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl animate-float",
        size,
        `bg-gradient-to-br ${colors}`,
        className
      )}
      style={{
        animationDelay,
        animationDuration,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * GradientBorder Component
 * Creates a beautiful animated gradient border for the profile image
 * Enhanced with multiple glow layers for more prominence
 */
function GradientBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-full",
        className
      )}
      aria-hidden="true"
    >
      {/* Outer glow layer - subtle large glow */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-2xl animate-border-glow" />
      {/* Middle glow layer */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-pink-500/40 blur-xl animate-border-glow" style={{ animationDelay: "0.5s" }} />
      {/* Inner gradient border */}
      <div className="relative rounded-full p-[4px] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-border-glow" style={{ animationDelay: "1s" }}>
        <div className="rounded-full bg-background/30 backdrop-blur-sm border border-border/30">
          {children}
        </div>
      </div>
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 rounded-full border border-blue-400/20 pointer-events-none" />
    </div>
  );
}

/**
 * Hero Component
 * Main hero section with:
 * - Introduction text with staggered animations
 * - Profile image with enhanced gradient border & glow
 * - CTA buttons
 * - Social links
 * - Floating 3D decorative blobs
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden pt-10 lg:pt-10 "
      aria-labelledby="hero-heading"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[oklch(0.15_0.02_260)] via-[oklch(0.1_0_0)] to-[oklch(0.05_0_0)]" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url(&#34;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/g%3E%3C/svg%3E&#34;)]" />
      </div>

      {/* Floating 3D Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <FloatingBlob
          size="h-96 w-96"
          colors="from-blue-500/15 to-transparent"
          animationDelay="-2s"
          animationDuration="25s"
          className="top-1/4 left-1/4"
        />
        <FloatingBlob
          size="h-72 w-72"
          colors="from-purple-500/15 to-transparent"
          animationDelay="-5s"
          animationDuration="30s"
          className="bottom-1/4 right-1/4"
        />
        <FloatingBlob
          size="h-64 w-64"
          colors="from-pink-500/10 to-purple-500/10"
          animationDelay="-8s"
          animationDuration="28s"
          className="top-1/2 left-1/2"
        />
        <FloatingBlob
          size="h-48 w-48"
          colors="from-blue-500/10 to-cyan-500/10"
          animationDelay="-12s"
          animationDuration="22s"
          className="bottom-1/3 left-1/3"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-x-16 lg:gap-y-0 items-center">
          {/* Top: Greeting, Heading, Title */}
          <div className="order-1 text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:text-left">


            {/* Greeting Text */}
            <div className="animate-slide-up-fade" style={{ animationDelay: "100ms" }}>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-400">
                <span className="relative">
                  <span className="relative z-10">HELLO, I&apos;M</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30" />
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight animate-slide-up-fade"
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-foreground">Md. Miraz</span>
            </h1>

            {/* Professional Title */}
            <div className="mt-6 animate-slide-up-fade" style={{ animationDelay: "300ms" }}>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                Learning Full-Stack Web Developer
              </p>
            </div>
          </div>

          {/* Right Side - Profile Image (middle on mobile, right on desktop) */}
          <div className="order-2 relative flex justify-center mx-auto max-w-[280px] sm:max-w-[340px] lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:max-w-[550px] w-[480px] lg:justify-end animate-slide-up-fade" style={{ animationDelay: "300ms" }}>
            {/* Decorative Ring Background - Enhanced with gradients */}
            <div className="relative flex w-full items-center justify-center pointer-events-none lg:absolute lg:inset-0" aria-hidden="true">
              {/* Inner subtle ring */}

              <div className=" rounded-full  justify-center font-medium p-2
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-300
                text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
                transition-all duration-300">


                <Image
                  src="/img/my-pic.jpeg"
                  alt="Md. Miraz - Full Stack Developer"
                  width={350}
                  height={250}

                  className="object-contain  rounded-full max-w-full"

                />

              </div>
            </div>

            {/* Floating Tech Badges - Enhanced */}
            <div className="absolute -bottom-4 left-0 animate-float-slow sm:-bottom-6 sm:-left-6" style={{ animationDelay: "1s", animationDuration: "4s" }} aria-hidden="true">
              <div className="bg-background/80 backdrop-blur-sm border border-blue-500/20 rounded-xl px-4 py-3 shadow-[0_0_18px_rgba(59,130,246,0.18)] transition-all hover:shadow-[0_0_28px_rgba(59,130,246,0.32)]">
                {/* Only the decorative icon spins, not the badge card. */}
                <span className="animate-icon-spin" style={{ animationDuration: "10s" }}>
                  <Code2 className="h-6 w-6 text-blue-400" />
                </span>
              </div>
            </div>
            <div className="absolute -bottom-4 right-0 animate-float-slow sm:-bottom-6 sm:-right-6" style={{ animationDelay: "2s", animationDuration: "4.5s" }} aria-hidden="true">
              <div className="bg-background/80 backdrop-blur-sm border border-purple-500/20 rounded-xl px-4 py-3 shadow-[0_0_18px_rgba(168,85,247,0.16)] transition-all hover:shadow-[0_0_28px_rgba(168,85,247,0.32)]">
                {/* A different speed keeps the two badges from syncing. */}
                <span className="animate-icon-spin" style={{ animationDuration: "14s" }}>
                  <Code2 className="h-6 w-6 text-purple-400" />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: Description, Buttons, Social */}
          <div className="order-3 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:text-left">

            {/* Description */}
            <div className="mt-0 animate-slide-up-fade lg:mt-6" style={{ animationDelay: "400ms" }}>
              <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I build modern, responsive and user-friendly web experiences with
                <span className="font-medium text-blue-400">Next.js</span> and
                <span className="font-medium text-purple-400">React</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start animate-slide-up-fade" style={{ animationDelay: "500ms" }}>
              <Link
                href="https://docs.google.com/document/d/1geFVhC4kQ_lZaxpM7L_qcbBtUn9B-6C3_8OffsKcH0M/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-blue-400/20 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-[1px] hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 sm:px-4.5 sm:py-2.5"
              >
                <FileUser className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                View Resume
              </Link>
              <Button
                variant="outline"
                className="sm:w-auto border-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all cursor-pointer duration-300 px-6 py-4 sm:px-8 sm:py-5"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className="mr-2 h-5 w-4" aria-hidden="true" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 animate-slide-up-fade" style={{ animationDelay: "600ms" }}>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-foreground/50 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@example.com"
                className="text-foreground/50 hover:text-purple-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}


      </div>
    </section>
  );
}