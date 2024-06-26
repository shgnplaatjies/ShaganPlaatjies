import { cache } from "react";
import "server-only";

export interface WpPost {
  id: number;
  date: string; // DateTimeString,
  date_gmt: string; // DateTimeString (GMT)
  guid: {
    rendered: string; // Pattern:  "https:\/\/{process.NODE_BLOG_DOMAIN}/?p={id}"
  };
  modified: string; // DateTimeString,
  modified_gmt: string; // DateTimeString (GMT)
  slug: string; // url friendly slug,
  status: "publish" | "draft" | "pending" | "private" | "trash";
  type:
    | "post"
    | "page"
    | "attachment"
    | "revision"
    | "nav_menu_item"
    | "custom_css"
    | "customize_changeset"
    | "oembed_cache"
    | "user_request"
    | "wp_block"
    | "acf-field"
    | "acf-field-group";
  link: string; // Pattern: "https:\/\/{process.NODE_BLOG_DOMAIN}/*"
  title: {
    rendered: string; // HTML Code
  };
  content: {
    rendered: string; // HTML Code
    protected: boolean;
  };
  excerpt: {
    rendered: string; // HTML Code
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format:
    | "standard"
    | "aside"
    | "chat"
    | "gallery"
    | "link"
    | "image"
    | "quote"
    | "status"
    | "video"
    | "audio";
  meta: {
    _acf_changed: boolean;
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  acf: any[];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    about: {
      href: string;
    }[];
    author: {
      embeddable: boolean;
      href: string;
    }[];
    replies: {
      embeddable: boolean;
      href: string;
    }[];
    "version-history": {
      count: number;
      href: string;
    }[];
    "predecessor-version": {
      id: number;
      href: string;
    }[];
    "wp:featuredmedia": {
      embeddable: boolean;
      href: string;
    }[];
    "wp:attachment": {
      href: string;
    }[];
    "wp:term": {
      taxonomy: "category" | "post_tag";
      embeddable: boolean;
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
}

export const fetchWpPosts = cache(async () => {
  try {
    const wpPostsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}`;
    const res = await fetch(wpPostsUri);

    if (!res.ok) return false;

    return await res.json();
  } catch (error) {
    return false;
  }
});

const fetchWpPostById = cache(async (target: number) => {
  try {
    const wpPostUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}${target}`;
    const res = await fetch(wpPostUri);

    if (!res.ok) return 1;

    return await res.json();
  } catch (error) {
    return false;
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

    if (!post) return false;

    return post;
  } catch (error) {
    return false;
  }
});

export const fetchWpPost = cache(async (target: string | number) => {
  if (typeof target === "number") return fetchWpPostById(target);
  else return fetchWpPostBySlug(target);
});

export const preload = (target: string | number) => {
  void fetchWpPost(target);
};
