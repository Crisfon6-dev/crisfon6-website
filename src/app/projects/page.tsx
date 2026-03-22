import type { Metadata } from "next";
import { ProjectsContent } from "@/components/pages/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of FinTech platforms serving millions, cloud infrastructure, and open-source AI automation templates.",
};

export default function Projects() {
  return <ProjectsContent />;
}
