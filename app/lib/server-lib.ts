import "server-only";
import { STANDARD_CACHE_TTL } from "./constants";

type WpMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "video/mp4"
  | "audio/mpeg"
  | "application/pdf"
  | "text/plain";

type WpMediaType = "image" | "video" | "audio" | "application" | "text";

type WpStatus =
  | "inherit"
  | "publish"
  | "future"
  | "draft"
  | "pending"
  | "private"
  | "trash";

type WpPostTypes =
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

export interface WpMediaVersion {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: WpMimeType;
  source_url: string;
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
  date: string; // date
  date_gmt: string; // date
  guid: {
    rendered: string; // url
  };
  modified: string; // date
  modified_gmt: string; // date
  slug: string; // url friendly
  status: WpStatus;
  type: "attachment" | WpMediaType;
  link: string; // url
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
  date: string; // DateTimeString,
  date_gmt: string; // DateTimeString (GMT)
  guid: {
    rendered: string; // Pattern:  "https:\/\/{process.NODE_BLOG_DOMAIN}/?p={id}"
  };
  modified: string; // DateTimeString,
  modified_gmt: string; // DateTimeString (GMT)
  slug: string; // url friendly slug,
  status: WpStatus;
  type: WpPostTypes;
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

export const fetchWpAllCategories = async (): Promise<
  WpCategoryApiResponse[]
> => {
  try {
    const wpCategoriesUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/categories`;
    const res = await fetch(wpCategoriesUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    return [];
  }
};

export const fetchWpAllTags = async (): Promise<WpTagApiResponse[]> => {
  try {
    const wpTagsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/tags`;
    const res = await fetch(wpTagsUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    return [];
  }
};

export const fetchWpTagsById = async (
  ids: number[]
): Promise<WpTagApiResponse[] | false> => {
  try {
    const tags = await fetchWpAllTags();

    if (!tags) return false;

    return tags.filter((tag) => ids.includes(tag.id));
  } catch (error) {
    return false;
  }
};

export const fetchWpCategoriesById = async (
  ids: number[]
): Promise<WpCategoryApiResponse[] | false> => {
  try {
    const categories = await fetchWpAllCategories();

    if (!categories) return false;

    return categories.filter((category) => ids.includes(category.id));
  } catch (error) {
    return false;
  }
};

export const fetchWpMediaById = async (
  id: number
): Promise<WpMediaApiResponse | false> => {
  try {
    const wpMediaUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/media/${id}`;
    const res = await fetch(wpMediaUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) return false;

    return await res.json();
  } catch (error) {
    return false;
  }
};

export const fetchWpPosts = async (): Promise<WpPostApiResponse[] | false> => {
  try {
    const wpPostsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}`;
    const res = await fetch(wpPostsUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) return false;

    return await res.json();
  } catch (error) {
    return false;
  }
};

const fetchWpPostById = async (
  target: number
): Promise<WpPostApiResponse | false> => {
  try {
    const wpPostUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}${target}`;
    const res = await fetch(wpPostUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) return false;

    return await res.json();
  } catch (error) {
    return false;
  }
};

const fetchWpPostWithIdOrSlug = async (target: string | number) => {
  try {
    const posts: WpPostApiResponse[] | false = await fetchWpPosts();

    if (!posts) return false;

    const condition =
      typeof target === "number"
        ? (post: WpPostApiResponse) => post.id === target
        : (post: WpPostApiResponse) => post.slug === target;

    const post = posts.find(condition);

    if (!post) return false;

    return post;
  } catch (error) {
    return false;
  }
};

export const fetchWpPost = async (target: string | number) => {
  if (typeof target === "number") return fetchWpPostById(target);
  else return fetchWpPostWithIdOrSlug(target);
};
