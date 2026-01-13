import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { VexlSection } from "@/components/sections/vexl";
import { ProjectsSection } from "@/components/sections/projects";
import { ArtificSection } from "@/components/sections/artific";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <VexlSection />
        <ProjectsSection />
        <ArtificSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
