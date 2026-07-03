import type { MetadataRoute } from "next";
import { CONTACT_INFO } from "./lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${CONTACT_INFO.website}/sitemap.xml`,
  };
}
