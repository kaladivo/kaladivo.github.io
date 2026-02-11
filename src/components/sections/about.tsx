import { AboutInViewTrigger } from "@/components/sections/client/about-in-view-trigger";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <AboutInViewTrigger sectionId="about" />
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        <div
          data-about-animate
          className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
        </div>

        <div
          data-about-animate
          className="prose prose-lg dark:prose-invert max-w-none opacity-0 translate-y-10 transition-all duration-700 delay-200 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0"
        >
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Hey! I&apos;m David—a developer who genuinely enjoys building
              things. Whether it&apos;s a payment solution for small businesses
              or a platform helping workshop organizers manage their events, I
              find satisfaction in creating tools that solve real problems.
            </p>

            <p>
              During the day, I lead the tech team at{" "}
              <a
                href="https://vexl.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                Vexl
              </a>
              , where we&apos;re building something I truly believe in—a way for
              people to trade Bitcoin privately, the way it was meant to be. The
              intersection of technology and privacy is something I care deeply
              about.
            </p>

            <p>
              When I&apos;m not coding, you might find me making music under the
              name <span className="text-accent font-medium">Artific</span>.
              It&apos;s a different kind of creative outlet, but the process of
              building something from nothing—whether it&apos;s software or a
              track—feels surprisingly similar.
            </p>

            <p className="text-muted-foreground">
              I&apos;m based in the Czech Republic, always curious, and
              constantly working on the next thing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
