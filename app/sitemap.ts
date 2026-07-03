import type { MetadataRoute } from "next";
import { CONTACT_INFO, WORDPRESS_CATEGORIES } from "./lib/constants";
import { fetchAllWpProjects, fetchWpPosts } from "./lib/server-lib";

// Next.js requires route segment config exports to be literal values (not
// imported references), so this must stay in sync with STANDARD_CACHE_TTL
// in ./lib/constants.ts by hand.
export const revalidate = 3600;

const BASE_URL = CONTACT_INFO.website;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const posts = await fetchWpPosts();

  const postRoutes: MetadataRoute.Sitemap = posts
    ? posts.map((post) => ({
        url: `${BASE_URL}/blog/posts/${post.slug}`,
        lastModified: new Date(post.modified_gmt),
        changeFrequency: "monthly",
        priority: 0.6,
      }))
    : [];

  const projects = await fetchAllWpProjects();

  const projectRoutes: MetadataRoute.Sitemap = projects
    ? projects.map((project) => {
        const isExperience = project.categories?.includes(
          WORDPRESS_CATEGORIES.WORK_EXPERIENCE.id
        );

        return {
          url: `${BASE_URL}/${isExperience ? "experiences" : "projects"}/${project.slug}`,
          lastModified: new Date(project.modified_gmt),
          changeFrequency: "monthly",
          priority: 0.6,
        };
      })
    : [];

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
