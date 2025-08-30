"use client";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Head from "next/head";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    const images = Array.from(document.images);

    if (images.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
      }
    });
    if (loadedCount === images.length) handleLoad();

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, []);

  return (
    <html lang="en">
      <Head>
        {/* Primary SEO */}
        <title>
          ShowMySkills | Create Your Portfolio & Get Discovered 
        </title>
        <meta
          name="description"
          content="ShowMySkills (Show My Skills) is a platform where creators, coders, designers, and doers showcase their skills, build portfolios, rank among the best, and get discovered by peers and professionals."
        />
        <meta
          name="keywords"
          content="ShowMySkills, Show My Skills, showmyskills, show my skills, portfolio, showcase skills, coding, design, developers, creators, XyphX"
        />
        <meta name="author" content="ShowMySkills Team" />
        <link rel="canonical" href="https://showmyskills.xyphx.com" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="ShowMySkills | Showcase Your Skills"
        />
        <meta
          property="og:description"
          content="Create your portfolio, showcase your talent, and get discovered. A platform built for creators, coders, and designers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://showmyskills.xyphx.com" />
        <meta
          property="og:image"
          content="https://showmyskills.xyphx.com/Logo.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ShowMySkills | Showcase Your Skills"
        />
        <meta
          name="twitter:description"
          content="Showcase your skills, build your portfolio, and get discovered by professionals."
        />
        <meta
          name="twitter:image"
          content="https://showmyskills.xyphx.com/Logo.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "ShowMySkills",
                alternateName: ["Show My Skills", "showmyskills"],
                url: "https://showmyskills.xyphx.com",
                description:
                  "ShowMySkills empowers creators, coders, designers, and doers to showcase their skills, build portfolios, rank among the best, and get discovered.",
                publisher: {
                  "@type": "Organization",
                  name: "XyphX",
                  logo: "https://showmyskills.xyphx.com/Logo.jpg",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://showmyskills.xyphx.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ShowMySkills",
                alternateName: ["Show My Skills", "showmyskills", "show my skills"],
                url: "https://showmyskills.xyphx.com",
                logo: "https://showmyskills.xyphx.com/Logo.jpg",
                sameAs: [
                  "https://twitter.com/xyphx",
                  "https://linkedin.com/company/xyphx",
                  "https://github.com/xyphx",
                ],
              },
            ]),
          }}
        />
      </Head>

      <body className={`${monaSans.variable} antialiased`}>
        {loading && <Preloader />}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
