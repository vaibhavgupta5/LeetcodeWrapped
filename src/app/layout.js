import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LeetCode Wrapped 2025",
  description: "Your year in code.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0a] text-white h-screen w-screen overflow-hidden`}
      >
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <main className="relative z-10 h-full w-full flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
