import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

/**
 * Home Page
 * Main landing page for the portfolio
 * Combines Navbar and Hero sections
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        {/* Placeholder sections for smooth scrolling navigation */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4">
          <p className="text-2xl text-muted-foreground">About Section - Coming Soon</p>
        </section>
        <section id="skills" className="min-h-screen flex items-center justify-center px-4">
          <p className="text-2xl text-muted-foreground">Skills Section - Coming Soon</p>
        </section>
        <section id="projects" className="min-h-screen flex items-center justify-center px-4">
          <p className="text-2xl text-muted-foreground">Projects Section - Coming Soon</p>
        </section>
        <section id="contact" className="min-h-screen flex items-center justify-center px-4">
          <p className="text-2xl text-muted-foreground">Contact Section - Coming Soon</p>
        </section>
      </main>
    </>
  );
}