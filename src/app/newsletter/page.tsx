import type { Metadata } from "next";
import { NewsletterContent } from "@/components/pages/NewsletterContent";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Zero to Production — A free weekly automation template with architecture diagrams, deployment guides, cost breakdowns, and working code.",
};

export default function Newsletter() {
  return <NewsletterContent />;
}
