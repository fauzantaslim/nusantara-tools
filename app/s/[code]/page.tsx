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
  const country = headerList.get("x-vercel-ip-country") || "Unknown";
  const city = headerList.get("x-vercel-ip-city") || "Unknown";

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
