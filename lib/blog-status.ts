import type { BlogPost } from "@/lib/blog-types";

export type PostStatus = "draft" | "scheduled" | "published";

export function postStatus(post: BlogPost): PostStatus {
  if (!post.isPublished) return "draft";
  const when = Date.parse(post.publishedAt);
  if (!Number.isNaN(when) && when > Date.now()) return "scheduled";
  return "published";
}

export function isPublicPost(post: BlogPost) {
  return postStatus(post) === "published" && post.robotsIndex !== false;
}

export const POST_STATUS_LABEL: Record<PostStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
};
