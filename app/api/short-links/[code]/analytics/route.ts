import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ code: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { code: rawCode } = await context.params;
  const shortCode = decodeURIComponent(rawCode);

  const ownerToken = request.headers.get("X-Owner-Token");

  if (!ownerToken) {
    return NextResponse.json(
      { error: "Token pemilik diperlukan." },
      { status: 401 },
    );
  }

  const link = await prisma.shortLink.findUnique({
    where: { shortCode },
    select: { id: true, ownerToken: true, clickCount: true },
  });

  if (!link) {
    return NextResponse.json(
      { error: "Tautan tidak ditemukan." },
      { status: 404 },
    );
  }

  if (link.ownerToken !== ownerToken) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 403 });
  }

  const analytics = await prisma.linkAnalytic.findMany({
    where: { shortLinkId: link.id },
    orderBy: { timestamp: "desc" },
    take: 1000, // Limit to recent 1000 entries
  });

  return NextResponse.json({
    shortCode,
    clickCount: link.clickCount,
    analytics: analytics.map(
      (a: {
        timestamp: Date;
        country: string | null;
        city: string | null;
        referrer: string | null;
        browser: string | null;
        device: string | null;
        os: string | null;
      }) => ({
        timestamp: a.timestamp.toISOString(),
        country: a.country,
        city: a.city,
        referrer: a.referrer,
        browser: a.browser,
        device: a.device,
        os: a.os,
      }),
    ),
  });
}
