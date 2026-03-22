import type { Metadata } from "next";
import { NewsletterContent } from "@/components/pages/NewsletterContent";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "PowerAI — A free weekly AI automation template with architecture diagrams, deployment guides, cost breakdowns, and working code.",
};

export default function Newsletter() {
  return <NewsletterContent />;
}
