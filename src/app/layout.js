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
  title: "ShowMySkills | Create Your Portfolio & Get Discovered",
  description: "ShowMySkills (Show My Skills) is a platform where creators, coders, designers, and doers showcase their skills, build portfolios, rank among the best, and get discovered by peers and professionals.",
  keywords: "ShowMySkills, Show My Skills, showmyskills, show my skills, portfolio, showcase skills, coding, design, developers, creators, XyphX",
  authors: [{ name: "ShowMySkills Team" }],
  alternates: {
    canonical: "https://showmyskills.xyphx.com"
  },
  openGraph: {
    title: "ShowMySkills | Showcase Your Skills",
    description: "Create your portfolio, showcase your talent, and get discovered. A platform built for creators, coders, and designers.",
    type: "website",
    url: "https://showmyskills.xyphx.com",
    images: [
      {
        url: "https://showmyskills.xyphx.com/Logo.jpg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShowMySkills | Showcase Your Skills",
    description: "Showcase your skills, build your portfolio, and get discovered by professionals.",
    images: ["https://showmyskills.xyphx.com/Logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  }
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
