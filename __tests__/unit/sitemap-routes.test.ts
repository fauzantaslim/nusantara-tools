import { CATEGORIES, TOOLS } from "@/lib/data";
import {
  SITEMAP_CATEGORY_PATHS,
  SITEMAP_STATIC_PATHS,
  SITEMAP_TOOL_PATHS,
} from "@/lib/sitemap-routes";

describe("sitemap-routes", () => {
  it("static paths are a stable superset of core legal pages", () => {
    expect(SITEMAP_STATIC_PATHS.has("")).toBe(true);
    expect(SITEMAP_STATIC_PATHS.has("/kebijakan-privasi")).toBe(true);
    expect(SITEMAP_STATIC_PATHS.has("/syarat-ketentuan")).toBe(true);
  });

  it("matches lib/data category paths in order", () => {
    expect([...SITEMAP_CATEGORY_PATHS]).toEqual(CATEGORIES.map((c) => c.path));
  });

  it("matches lib/data tool paths in order", () => {
    expect([...SITEMAP_TOOL_PATHS]).toEqual(
      TOOLS.filter((t) => t.path !== "#").map((t) => t.path),
    );
  });
});
