
"use client";

import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
    Mail,
    MapPin,
    ArrowUpRight,
    Send,
    MessageCircle,
    CodeXml,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactInfo = [
    {
        label: "Email",
        value: "programmar.miraz@gmail.com",
        href: "mailto:programmar.miraz@email.com",
        icon: Mail,
    },
    {
        label: "GitHub",
        value: "github.com/programmer-miraz",
        href: "https://github.com/programmer-miraz",
        icon: FaGithub,
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/md-miraz",
        href: "https://linkedin.com/in/md-miraz-islam",
        icon: FaLinkedin,
    },
    {
        label: "Location",
        value: "Chattogram, Bangladesh",
        href: "#",
        icon: MapPin,
    },
];

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Message sent successfully!");
                form.reset();
            } else {
                toast.error(data.message || "Failed to send message!");
            }

        } catch {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden  px-4 py-24 md:px-8"
        >
            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-400">
                        <MessageCircle className="h-4 w-4" />
                        Get In Touch
                    </span>

                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                        Let&apos;s Work{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Together
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                        Have a project in mind or want to collaborate?
                        Feel free to reach out. I&lsquo;d love to hear from you.
                    </p>
                </div>

                {/* Contact Content */}
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-7">

                        <div>
                            <h3 className="text-2xl font-bold text-white">
                                Let&#39;s Talk
                            </h3>

                            <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-400">
                                I&apos;m always open to discussing new projects,
                                creative ideas, or opportunities to be part
                                of your vision.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            {contactInfo.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        target={
                                            item.href.startsWith("http")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            item.href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-blue-400/30 hover:bg-white/5"
                                    >
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300 transition-all duration-300 group-hover:scale-110">
                                            <Icon className="h-5 w-5" />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-zinc-400">
                                                {item.label}
                                            </p>

                                            <p className="mt-1 truncate text-sm font-medium text-white transition-colors group-hover:text-blue-300">
                                                {item.value}
                                            </p>
                                        </div>

                                        {item.href !== "#" && (
                                            <ArrowUpRight className="h-4 w-4 text-zinc-500 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Availability Card */}
                        <div className="rounded-2xl border border-blue-400/10 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent p-6">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                                </span>

                                <h4 className="font-semibold text-white">
                                    Available for Opportunities
                                </h4>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-zinc-400">
                                Currently open to freelance projects,
                                collaborations, and new opportunities.
                                Let&apos;s create something amazing together!
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-zinc-300">
                                Connect with me
                            </h4>

                            <div className="flex gap-3">
                                <Link
                                    href="https://github.com/programmer-miraz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    <FaGithub className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="https://linkedin.com/in/md-miraz-islam"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    <FaLinkedin className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="mailto:programmar.miraz@gmail.com"
                                    aria-label="Email"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-purple-400"
                                >
                                    <Mail className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - CONTACT FORM */}
                    <div className="rounded-2xl border mb-50 mt-12 border-white/10 bg-[#0B1120]/80 p-6 shadow-2xl shadow-blue-950/10 backdrop-blur-xl md:p-8">

                        <div className="mb-7">
                            <h3 className="text-2xl font-bold text-white">
                                Send Me a Message
                            </h3>

                            <p className="mt-2 text-sm text-zinc-400">
                                Fill out the form below and I&apos;ll get back
                                to you as soon as possible.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-zinc-300"
                                >
                                    Your Name
                                </label>

                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    disabled={isSubmitting}
                                    autoComplete="name"
                                    required
                                    className="h-12 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-blue-400 focus-visible:ring-blue-400/20"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-zinc-300"
                                >
                                    Email Address
                                </label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                    autoComplete="email"
                                    required
                                    className="h-12 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-blue-400 focus-visible:ring-blue-400/20"
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="text-sm font-medium text-zinc-300"
                                >
                                    Your Message
                                </label>

                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project, idea, or just say hi..."
                                    disabled={isSubmitting}
                                    required
                                    rows={6}
                                    className="min-h-36 resize-none border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-blue-400 focus-visible:ring-blue-400/20"
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 cursor-pointer w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500"
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-xs text-zinc-500">
                                Your information will only be used to
                                respond to your message.
                            </p>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
