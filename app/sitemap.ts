import { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://nusantaratools.com";

  // Base routes
  const routes = [
    "",
    "/tentang",
    "/kontak",
    "/kebijakan-privasi",
    "/syarat-ketentuan",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Category routes
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}${cat.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Tool routes
  const toolRoutes = TOOLS.filter((tool) => tool.path !== "#").map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...toolRoutes];
}
