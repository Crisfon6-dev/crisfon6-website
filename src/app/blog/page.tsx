import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogContent } from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical deep dives on AWS architecture, MCP agents, AI automations, and lessons from building FinTech at scale.",
};

export default function Blog() {
  const posts = getAllPosts();

  return <BlogContent publishedPosts={posts} />;
}
