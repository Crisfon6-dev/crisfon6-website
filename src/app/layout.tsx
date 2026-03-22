import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cristhian Fonseca | Technical Lead & AI Builder",
    template: "%s | Cristhian Fonseca",
  },
  description:
    "I build FinTech products that reach millions of users and AI automations in public. Technical Lead, AWS Architect, AI/LLM Builder.",
  keywords: [
    "AI Builder",
    "Technical Lead",
    "AWS Architect",
    "FinTech",
    "MCP Agents",
    "Automation Templates",
    "Building in Public",
  ],
  authors: [{ name: "Cristhian Fonseca" }],
  openGraph: {
    title: "Cristhian Fonseca | Technical Lead & AI Builder",
    description:
      "I ship FinTech at scale and build AI automations you can steal.",
    url: "https://crisfon6.com",
    siteName: "crisfon6.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristhian Fonseca | Technical Lead & AI Builder",
    description:
      "I ship FinTech at scale and build AI automations you can steal.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
