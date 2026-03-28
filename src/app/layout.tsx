import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahsan Arshad | Full Stack Developer",
  description: "Portfolio of Muhammad Ahsan Arshad Manzoor, a Full Stack Developer specializing in Next.js, React, and immersive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="bg-background text-foreground selection:bg-accent/30 selection:text-accent">
        {children}
      </body>
    </html>
  );
}
