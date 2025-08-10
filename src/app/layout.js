import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";


const monaSans = Mona_Sans({
  variable: '--font-mona-sans', // You can name this whatever you prefer, e.g., '--font-mona-sans'
  subsets: ['latin'],
  display: 'swap', // Recommended for performance
});


export const metadata = {
  title: "ShowMySkills - Showcase Your Talent",
  description: "A platform to showcase your skills and connect with others",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable}  antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
