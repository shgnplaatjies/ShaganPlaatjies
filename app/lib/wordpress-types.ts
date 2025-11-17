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

export interface ProjectMeta {
  _portfolio_project_subtext?: string;
  _portfolio_project_role?: string;
  _portfolio_project_company?: string;
  _portfolio_project_source_url?: string;
  _portfolio_project_gallery?: string;
  _portfolio_project_date_type?: 'single' | 'range';
  _portfolio_project_date_format?: 'yyyy' | 'mm/yyyy' | 'dd/mm/yyyy';
  _portfolio_project_date_start?: string;
  _portfolio_project_date_end?: string;
}

export interface WordPressProject {
  id: number;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  meta: ProjectMeta;
}

export interface ExperienceMeta {
  _portfolio_experience_role?: string;
  _portfolio_experience_company?: string;
  _portfolio_experience_company_url?: string;
  _portfolio_experience_location?: string;
  _portfolio_experience_gallery?: string;
  _portfolio_experience_date_type?: 'single' | 'range';
  _portfolio_experience_date_format?: 'yyyy' | 'mm/yyyy' | 'dd/mm/yyyy';
  _portfolio_experience_date_start?: string;
  _portfolio_experience_date_end?: string;
  _portfolio_experience_employment_type?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
}

export interface WordPressExperience {
  id: number;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  meta: ExperienceMeta;
}
