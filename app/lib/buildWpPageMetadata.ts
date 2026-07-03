import type { Metadata } from "next";
import { fetchWpMediaById } from "./server-lib";
import type { WpProjectApiResponse } from "./wordpress-types";

export const buildWpPageMetadata = async (
  project: WpProjectApiResponse,
  title: string
): Promise<Metadata> => {
  const description = project.excerpt.rendered
    .replace(/<[^>]*>/g, "")
    .substring(0, 160);

  const media = project.featured_media
    ? await fetchWpMediaById(project.featured_media)
    : false;

  const images =
    media && typeof media === "object" && "source_url" in media
      ? [{ url: media.source_url }]
      : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
};
