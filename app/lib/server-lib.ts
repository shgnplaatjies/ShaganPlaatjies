import "server-only";
import { STANDARD_CACHE_TTL, WORDPRESS_CATEGORIES } from "./constants";
import {
  WpMimeType,
  WpMediaType,
  WpStatus,
  WpPostTypes,
  WpMediaVersion,
  WpTagApiResponse,
  WpCategoryApiResponse,
  WpMediaApiResponse,
  WpPostApiResponse,
  WpProjectApiResponse,
  ProjectMeta,
  WordPressRawMeta,
} from "./wordpress-types";

export type {
  WpMimeType,
  WpMediaType,
  WpStatus,
  WpPostTypes,
  WpMediaVersion,
  WpTagApiResponse,
  WpCategoryApiResponse,
  WpMediaApiResponse,
  WpPostApiResponse,
  WpProjectApiResponse,
  ProjectMeta,
  WordPressRawMeta,
};

function normalizeMeta(
  rawMeta: WordPressRawMeta | Record<string, unknown>
): ProjectMeta {
  if (!rawMeta || typeof rawMeta !== "object") {
    return {};
  }

  const normalized: ProjectMeta = {};

  for (const [key, value] of Object.entries(rawMeta)) {
    if (key.startsWith("_project_")) {
      const normalizedKey = key as keyof ProjectMeta;
      (normalized as Record<string, unknown>)[normalizedKey] = value;
    }
  }

  return normalized;
}

export const fetchWpAllCategories = async (): Promise<
  WpCategoryApiResponse[]
> => {
  try {
    const wpCategoriesUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/categories`;

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return [];
    }

    const res = await fetch(wpCategoriesUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Categories fetch failed with status ${res.status}: ${wpCategoriesUri}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('[WP API] Error fetching categories:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const fetchWpAllTags = async (): Promise<WpTagApiResponse[]> => {
  try {
    const wpTagsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/tags`;

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return [];
    }

    const res = await fetch(wpTagsUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Tags fetch failed with status ${res.status}: ${wpTagsUri}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('[WP API] Error fetching tags:', error instanceof Error ? error.message : String(error));
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

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return false;
    }

    const res = await fetch(wpMediaUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Media fetch failed with status ${res.status} for media ID ${id}: ${wpMediaUri}`);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error(`[WP API] Error fetching media ${id}:`, error instanceof Error ? error.message : String(error));
    return false;
  }
};

async function fetchAllWpPages<T>(
  baseUri: string,
  resourceLabel: string
): Promise<T[] | false> {
  try {
    const separator = baseUri.includes("?") ? "&" : "?";
    const items: T[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const pageUri = `${baseUri}${separator}per_page=100&page=${page}`;
      const res = await fetch(pageUri, {
        next: { revalidate: STANDARD_CACHE_TTL },
      });

      if (!res.ok) {
        console.error(`[WP API] ${resourceLabel} fetch failed with status ${res.status}: ${pageUri}`);
        return false;
      }

      items.push(...((await res.json()) as T[]));

      if (page === 1) {
        totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
      }

      page += 1;
    } while (page <= totalPages);

    return items;
  } catch (error) {
    console.error(`[WP API] Error fetching ${resourceLabel}:`, error instanceof Error ? error.message : String(error));
    return false;
  }
}

export const fetchWpPosts = async (): Promise<WpPostApiResponse[] | false> => {
  if (!process.env.WP_DOMAIN) {
    console.error('[WP API] WP_DOMAIN environment variable is not set');
    return false;
  }

  const wpPostsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}`;

  return fetchAllWpPages<WpPostApiResponse>(wpPostsUri, "Posts");
};

const fetchWpPostById = async (
  target: number
): Promise<WpPostApiResponse | false> => {
  try {
    const wpPostUri = `https://${process.env.WP_DOMAIN}${process.env.WP_POSTS_URI}${target}`;

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return false;
    }

    const res = await fetch(wpPostUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Post by ID fetch failed with status ${res.status} for post ID ${target}: ${wpPostUri}`);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error(`[WP API] Error fetching post ID ${target}:`, error instanceof Error ? error.message : String(error));
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

export const fetchAllWpProjects = async (): Promise<
  WpProjectApiResponse[] | false
> => {
  if (!process.env.WP_DOMAIN) {
    console.error('[WP API] WP_DOMAIN environment variable is not set');
    return false;
  }

  const wpProjectsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/projects`;

  return fetchAllWpPages<WpProjectApiResponse>(wpProjectsUri, "All projects");
};

export const fetchWpProjects = async (): Promise<
  WpProjectApiResponse[] | false
> => {
  try {
    const wpProjectsUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/projects?categories=${WORDPRESS_CATEGORIES.PROJECT.id}`;

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return false;
    }

    const res = await fetch(wpProjectsUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Projects fetch failed with status ${res.status}: ${wpProjectsUri}`);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error('[WP API] Error fetching projects:', error instanceof Error ? error.message : String(error));
    return false;
  }
};

const fetchWpProjectById = async (
  target: number
): Promise<WpProjectApiResponse | false> => {
  try {
    const wpProjectUri = `https://${process.env.WP_DOMAIN}${process.env.WP_JSON_API_URI}/projects/${target}`;

    if (!process.env.WP_DOMAIN) {
      console.error('[WP API] WP_DOMAIN environment variable is not set');
      return false;
    }

    const res = await fetch(wpProjectUri, {
      next: { revalidate: STANDARD_CACHE_TTL },
    });

    if (!res.ok) {
      console.error(`[WP API] Project by ID fetch failed with status ${res.status} for project ID ${target}: ${wpProjectUri}`);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error(`[WP API] Error fetching project ID ${target}:`, error instanceof Error ? error.message : String(error));
    return false;
  }
};

const fetchWpProjectWithIdOrSlug = async (target: string | number) => {
  try {
    const projects: WpProjectApiResponse[] | false = await fetchAllWpProjects();

    if (!projects) return false;

    const condition =
      typeof target === "number"
        ? (project: WpProjectApiResponse) => project.id === target
        : (project: WpProjectApiResponse) => project.slug === target;

    const project = projects.find(condition);

    if (!project) return false;

    return project;
  } catch (error) {
    return false;
  }
};

export const fetchWpProject = async (target: string | number) => {
  if (typeof target === "number") return fetchWpProjectById(target);
  else return fetchWpProjectWithIdOrSlug(target);
};

