import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { VexlSection } from "@/components/sections/vexl";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { ProjectsSection } from "@/components/sections/projects";
import { ArtificSection } from "@/components/sections/artific";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { getLatestPosts } from "@/lib/blog";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);
  const hasPublishedPosts = latestPosts.length > 0;

  return (
    <>
      <Navigation showBlog={hasPublishedPosts} />
      <main>
        <HeroSection />
        <VexlSection />
        {hasPublishedPosts && <BlogPreviewSection posts={latestPosts} />}
        <ProjectsSection />
        <ArtificSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
