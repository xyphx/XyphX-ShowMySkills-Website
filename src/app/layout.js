import { Mona_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

// Metadata export for app router
export const metadata = {
  metadataBase: new URL("https://showmyskills.xyphx.com"),
  title: {
    default: "ShowMySkills | Showcase Your Talent & Build Your Portfolio",
    template: "%s | ShowMySkills"
  },
  description: "ShowMySkills by XyphX is the ultimate platform for creators, developers, and designers to showcase their skills, build professional portfolios, and get discovered by the global community.",
  keywords: ["ShowMySkills", "XyphX", "Show My Skills", "Portfolio Builder", "Skill Showcase", "Developer Portfolio", "Designer Portfolio", "Professional Profile", "Talent Discovery"],
  authors: [{ name: "XyphX Team" }],
  creator: "XyphX",
  publisher: "XyphX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://showmyskills.xyphx.com"
  },
  openGraph: {
    title: "ShowMySkills | Showcase Your Skills",
    description: "Build your professional portfolio and showcase your talent to the world. Join ShowMySkills by XyphX today.",
    type: "website",
    url: "https://showmyskills.xyphx.com",
    siteName: "ShowMySkills",
    locale: "en_US",
    images: [
      {
        url: "/Logo.jpg",
        width: 1200,
        height: 630,
        alt: "ShowMySkills Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShowMySkills | Showcase Your Skills",
    description: "Build your professional portfolio and showcase your talent to the world.",
    creator: "@xyphx",
    images: ["/Logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
                description: "ShowMySkills empowers creators, coders, designers, and doers to showcase their skills, build portfolios, rank among the best, and get discovered.",
                publisher: {
                  "@type": "Organization",
                  name: "XyphX",
                  logo: "https://showmyskills.xyphx.com/Logo.jpg",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://showmyskills.xyphx.com/search?q={search_term_string}",
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
      </head>
      <body className={`${monaSans.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
