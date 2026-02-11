"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const homeSectionItems = [
  { id: "hero", label: "Home" },
  { id: "vexl", label: "Vexl" },
  { id: "projects", label: "Projects" },
  { id: "artific", label: "Artific" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

type HomeNavItem =
  | {
      kind: "section";
      id: (typeof homeSectionItems)[number]["id"];
      label: string;
    }
  | {
      kind: "route";
      id: string;
      label: string;
      href: string;
    };

function getHomeNavItems(showBlog: boolean): HomeNavItem[] {
  return [
    { kind: "section", id: "hero", label: "Home" },
    ...(showBlog
      ? ([{ kind: "route", id: "blog", label: "Blog", href: "/blog" }] as const)
      : []),
    { kind: "section", id: "vexl", label: "Vexl" },
    { kind: "section", id: "projects", label: "Projects" },
    { kind: "section", id: "artific", label: "Artific" },
    { kind: "section", id: "about", label: "About" },
    { kind: "section", id: "contact", label: "Contact" },
  ];
}

function getRouteNavItems(showBlog: boolean) {
  return [
    { id: "home", label: "Home", href: "/" },
    ...(showBlog ? [{ id: "blog", label: "Blog", href: "/blog" }] : []),
  ];
}

function getBlogLinks(showBlog: boolean) {
  return [
    { label: "Home", href: "/" },
    ...(showBlog ? [{ label: "Blog", href: "/blog" }] : []),
  ];
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="w-full h-0.5 bg-current block origin-center"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-full h-0.5 bg-current block"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="w-full h-0.5 bg-current block origin-center"
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BlogNavigation({ showBlog }: { showBlog: boolean }) {
  const pathname = usePathname() ?? "/";
  const blogLinks = getBlogLinks(showBlog);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-2">
          {blogLinks.map((link) => {
            const isActive = isRouteActive(pathname, link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                    "hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeBlogRoute"
                      className="absolute inset-0 bg-accent/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}

function HomeNavigation({ showBlog }: { showBlog: boolean }) {
  const pathname = usePathname() ?? "/";
  const isHomePage = pathname === "/";
  const homeNavItems = getHomeNavItems(showBlog);
  const routeNavItems = getRouteNavItems(showBlog);

  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) {
        return;
      }

      const sectionElements = homeSectionItems.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let index = sectionElements.length - 1; index >= 0; index--) {
        const section = sectionElements[index];

        if (section.element) {
          const top = section.element.offsetTop;

          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const mobileTitle = isHomePage
    ? homeSectionItems.find((section) => section.id === activeSection)?.label ||
      "Menu"
    : pathname.startsWith("/blog")
      ? "Blog"
      : "Menu";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <ul className="hidden md:flex items-center justify-center gap-2">
          {isHomePage
            ? homeNavItems.map((item) => {
                if (item.kind === "section") {
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                          "hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          activeSection === item.id
                            ? "text-accent"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeHomeSection"
                            className="absolute inset-0 bg-accent/10 rounded-lg"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 text-sm font-medium transition-colors rounded-lg text-muted-foreground hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })
            : routeNavItems.map((item) => {
                const isActive = isRouteActive(pathname, item.href);

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                        "hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive ? "text-accent" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeRoute"
                          className="absolute inset-0 bg-accent/10 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
        </ul>

        <div className="md:hidden flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {mobileTitle}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="p-2 -mr-2 text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <ul className="px-6 py-4 space-y-1">
              {isHomePage
                ? homeNavItems.map((item, index) => {
                    if (item.kind === "section") {
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={cn(
                              "w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-lg",
                              "hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                              activeSection === item.id
                                ? "text-accent bg-accent/5"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.label}
                          </button>
                        </motion.li>
                      );
                    }

                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })
                : routeNavItems.map((item, index) => {
                    const isActive = isRouteActive(pathname, item.href);

                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-lg",
                            "hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                            isActive
                              ? "text-accent bg-accent/5"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export function Navigation({
  variant = "home",
  showBlog = true,
}: {
  variant?: "home" | "blog";
  showBlog?: boolean;
}) {
  if (variant === "blog") {
    return <BlogNavigation showBlog={showBlog} />;
  }

  return <HomeNavigation showBlog={showBlog} />;
}
