import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isSafeRedirectUrl } from "@/features/url-shortener/short-link-server";
import { ShortLinkRedirectError } from "@/features/url-shortener/components/ShortLinkRedirectError";
import { ShortLinkRedirecting } from "@/features/url-shortener/components/ShortLinkRedirecting";
import { UAParser } from "ua-parser-js";

export const dynamic = "force-dynamic";

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: raw } = await params;
  const shortCode = decodeURIComponent(raw);

  const link = await prisma.shortLink.findUnique({
    where: { shortCode },
  });

  if (!link || !isSafeRedirectUrl(link.originalUrl)) {
    return <ShortLinkRedirectError />;
  }

  // Capture metadata from headers
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const referrer = headerList.get("referer") || "Direct";
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0] ||
    headerList.get("x-real-ip") ||
    "";

  let country = "Unknown";
  let city = "Unknown";

  // Fetch geolocation from ipapi.co
  if (ip && ip !== "127.0.0.1" && ip !== "::1") {
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
        next: { revalidate: 3600 }, // Cache for 1 hour to stay within rate limits
      });
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        country = geoData.country_name || "Unknown";
        city = geoData.city || "Unknown";
      }
    } catch (e) {
      console.error("[Geolocation Fetch Error]", e);
    }
  } else {
    // Fallback for development/local testing
    const isLocal =
      headerList.get("host")?.includes("localhost") ||
      headerList.get("host")?.includes("127.0.0.1");
    country = isLocal ? "Indonesia (Local)" : "Unknown";
    city = isLocal ? "Jakarta (Local)" : "Unknown";
  }

  const parser = new UAParser(userAgent);

  const browser = parser.getBrowser().name || "Unknown";
  const deviceType = parser.getDevice().type || "desktop";
  const os = parser.getOS().name || "Unknown";

  // Record analytics and increment click count in a transaction
  try {
    await prisma.$transaction([
      prisma.linkAnalytic.create({
        data: {
          shortLinkId: link.id,
          country,
          city,
          referrer,
          browser,
          device: deviceType,
          os,
        },
      }),
      prisma.shortLink.update({
        where: { id: link.id },
        data: { clickCount: { increment: 1 } },
      }),
    ]);
  } catch (e) {
    console.error("[ShortLink Analytics Error]", e);
    // If analytics fails, we still want to show the redirecting page
  }

  return <ShortLinkRedirecting targetUrl={link.originalUrl} />;
}
