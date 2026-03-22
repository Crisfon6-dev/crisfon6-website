import { expect, test, describe } from "vitest";
import { getAllPosts, getPost } from "@/lib/blog";

describe("blog utility", () => {
  test("getAllPosts returns published posts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.published)).toBe(true);
  });

  test("posts have required frontmatter fields", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.tag).toBeTruthy();
    }
  });

  test("posts are sorted by date descending", () => {
    const posts = getAllPosts();
    if (posts.length > 1) {
      for (let i = 0; i < posts.length - 1; i++) {
        expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
          new Date(posts[i + 1].date).getTime(),
        );
      }
    }
  });

  test("getPost returns a specific post", () => {
    const post = getPost("ai-document-processor");
    expect(post).not.toBeNull();
    expect(post!.frontmatter.title).toContain("Document Processor");
    expect(post!.content).toBeTruthy();
  });

  test("getPost returns null for non-existent slug", () => {
    const post = getPost("non-existent-post");
    expect(post).toBeNull();
  });
});
