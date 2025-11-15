/**
 * WordPress API Types and Constants
 */

export const WORDPRESS_CATEGORIES = {
  WORK_EXPERIENCE: 'work-experience',
  BLOG_POST: 'blog-post',
  PROJECT: 'project',
} as const;

export type WordPressCategorySlug = typeof WORDPRESS_CATEGORIES[keyof typeof WORDPRESS_CATEGORIES];

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface WordPressMedia {
  id: number;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  source_url: string;
  alt_text: string;
  media_type: string;
  mime_type: string;
}

export interface WordPressPost {
  id: number;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
}
