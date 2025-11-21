/**
 * WordPress API Types and Constants
 */

export type WpMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "video/mp4"
  | "audio/mpeg"
  | "application/pdf"
  | "text/plain";

export type WpMediaType = "image" | "video" | "audio" | "application" | "text";

export type WpStatus =
  | "inherit"
  | "publish"
  | "future"
  | "draft"
  | "pending"
  | "private"
  | "trash";

export type WpPostTypes =
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
  | "acf-field-group"
  | "project";

export interface WpMediaVersion {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: WpMimeType;
  source_url: string;
}

export const WORDPRESS_CATEGORIES = {
  WORK_EXPERIENCE: "work-experience",
  BLOG_POST: "blog-post",
  PROJECT: "project",
} as const;

export type WordPressCategorySlug =
  typeof WORDPRESS_CATEGORIES[keyof typeof WORDPRESS_CATEGORIES];

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
  _project_subtext?: string;
  _project_role?: string;
  _project_company?: string;
  _project_company_url?: string;
  _project_location?: string;
  _project_source_url?: string;
  _project_gallery?: string;
  _project_gallery_captions?: string;
  _project_date_type?: "single" | "range";
  _project_date_format?: "yyyy" | "mm/yyyy" | "dd/mm/yyyy";
  _project_date_start?: string;
  _project_date_end?: string;
  _project_employment_type?:
    | "full-time"
    | "part-time"
    | "contract"
    | "freelance"
    | "internship";
}

export interface WordPressRawMeta extends ProjectMeta {
  [key: string]: unknown;
  _acf_changed?: boolean;
  footnotes?: string;
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
  categories: number[];
  tags: number[];
  meta: ProjectMeta;
}

export interface WpTagApiResponse {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: any[];
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
    "wp:post_type": {
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
}

export interface WpCategoryApiResponse {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
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
    "wp:post_type": {
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
}

export interface WpMediaApiResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: WpStatus;
  type: "attachment" | WpMediaType;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  meta: {
    _acf_changed: boolean;
  };
  acf: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: WpMediaType;
  mime_type: WpMimeType;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: WpMediaVersion;
      large: WpMediaVersion;
      thumbnail: WpMediaVersion;
      medium_large: WpMediaVersion;
      "1536x1536": WpMediaVersion;
      "2048x2048": WpMediaVersion;
      full: WpMediaVersion;
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: string[];
    };
    original_image: string;
  };
  post: number;
  source_url: string;
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
  };
}

export interface WpPostApiResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: WpStatus;
  type: WpPostTypes;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
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

export interface WpProjectApiResponse
  extends Omit<WpPostApiResponse, "type" | "meta"> {
  type: "project";
  meta: ProjectMeta;
}
