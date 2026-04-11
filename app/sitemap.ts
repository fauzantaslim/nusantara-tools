import { MetadataRoute } from "next";
import {
  SITEMAP_CATEGORY_PATHS,
  SITEMAP_STATIC_PATHS,
  SITEMAP_TOOL_PATHS,
} from "@/lib/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://nusantaratools.my.id";

  const lastModified = new Date();

  const routes = [...SITEMAP_STATIC_PATHS].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = [...SITEMAP_CATEGORY_PATHS].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolRoutes = [...SITEMAP_TOOL_PATHS].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...toolRoutes];
}
