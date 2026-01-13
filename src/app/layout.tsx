import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davenov.com"),
  title: "David Novák - Tech Lead & Developer",
  description:
    "Tech Lead at Vexl, building products that matter. Creator of QR Terminal, Hop na Workshop, and music as Artific.",
  keywords: [
    "David Novák",
    "Tech Lead",
    "Developer",
    "Vexl",
    "Bitcoin",
    "Artific",
    "Full Stack",
  ],
  authors: [{ name: "David Novák" }],
  creator: "David Novák",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davenov.com",
    siteName: "David Novák",
    title: "David Novák - Tech Lead & Developer",
    description:
      "Tech Lead at Vexl, building products that matter. Creator of QR Terminal, Hop na Workshop, and music as Artific.",
    images: [
      {
        url: "/imgs/davenov_icon.jpeg",
        width: 400,
        height: 400,
        alt: "David Novák",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "David Novák - Tech Lead & Developer",
    description:
      "Tech Lead at Vexl, building products that matter. Creator of QR Terminal, Hop na Workshop, and music as Artific.",
    images: ["/imgs/davenov_icon.jpeg"],
  },
  icons: {
    icon: "/imgs/davenov_icon.jpeg",
    apple: "/imgs/davenov_icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.toggle('dark', prefersDark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans`}
      >
        <ThemeProvider>
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
