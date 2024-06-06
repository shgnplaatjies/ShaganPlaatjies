import { cache } from "react";
import "server-only";

export interface WpPost {
  id: number;
  title: {
    rendered: string;
  };
  status: "publish" | "draft" | "pending" | "private" | "trash";
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
}

export const fetchWpPosts = cache(async () => {
  try {
    const wpPostsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}`;
    const res = await fetch(wpPostsUri);

    if (!res.ok) return 1;

    return await res.json();
  } catch (error) {
    return 1;
  }
});

const fetchWpPostById = cache(async (target: number) => {
  try {
    const wpPostUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}${target}`;
    const res = await fetch(wpPostUri);

    if (!res.ok) return 1;

    return await res.json();
  } catch (error) {
    return 1;
  }
});

const fetchWpPostBySlug = cache(async (target: string | number) => {
  try {
    const posts: WpPost[] = await fetchWpPosts();

    const condition =
      typeof target === "number"
        ? (post: WpPost) => post.id === target
        : (post: WpPost) => post.slug === target;

    const post = posts.find(condition);

    if (!post) return 1;

    return post;
  } catch (error) {
    return 1;
  }
});

export const fetchWpPost = cache(async (target: string | number) => {
  if (typeof target === "number") return fetchWpPostById(target);
  else return fetchWpPostBySlug(target);
});

export const preload = (target: string | number) => {
  void fetchWpPost(target);
};
