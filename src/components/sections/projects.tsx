import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectsInViewTrigger } from "./client/projects-in-view-trigger";

interface Project {
  title: string;
  description: string;
  url: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "QR Terminal",
    description:
      "Payment processing solution enabling merchants to accept customer payments through QR codes, eliminating traditional terminal fees.",
    url: "https://qrterminal.cz",
    featured: true,
  },
  {
    title: "Hop na Workshop",
    description:
      "Platform for workshop instructors in the Czech Republic with registration management, automated payment tracking, and participant tools.",
    url: "https://hopnaworkshop.cz",
    featured: true,
  },
  {
    title: "Emotions Log",
    description:
      "Mood-tracking mobile app with analytics and visual calendar. All data stored locally on device for privacy.",
    url: "https://emotionslog.com",
  },
  {
    title: "Davenov CC Collection",
    description:
      "Open-source collection of slash commands and skills for Claude Code. Includes brainstorming tools, full-stack development expertise, and more.",
    url: "https://github.com/kaladivo/davenov-cc-collection",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transitionDelay: `${index * 100}ms` }}
      className={cn(
        "group relative block",
        "opacity-0 translate-y-10 transition-all duration-500 ease-out",
        "group-data-[in-view=true]:opacity-100 group-data-[in-view=true]:translate-y-0",
        project.featured && "md:col-span-1"
      )}
    >
      <div
        className={cn(
          "relative h-full p-6 md:p-8 rounded-2xl border border-border bg-card transition-all duration-300",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1",
          project.featured && "bg-gradient-to-br from-card to-accent/5"
        )}
      >
        {/* Hover particle effect overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <h3
              className={cn(
                "font-display font-bold",
                project.featured ? "text-2xl" : "text-xl"
              )}
            >
              {project.title}
            </h3>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>

          <p
            className={cn(
              "text-muted-foreground leading-relaxed",
              project.featured ? "text-base" : "text-sm"
            )}
          >
            {project.description}
          </p>

          {project.featured && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                View project
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      data-in-view="false"
      className="group relative py-24 md:py-32 overflow-hidden"
    >
      <ProjectsInViewTrigger sectionId="projects" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div
          className={cn(
            "text-center mb-12",
            "opacity-0 translate-y-10 transition-all duration-700 ease-out",
            "group-data-[in-view=true]:opacity-100 group-data-[in-view=true]:translate-y-0"
          )}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Side Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Things I build in my free time
          </p>
        </div>

        {/* Featured projects - larger cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Other projects - smaller row */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + featuredProjects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
