import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateShortCode } from "@/features/url-shortener/utils";
import {
  generateOwnerToken,
  parseCreateShortLinkBody,
} from "@/features/url-shortener/short-link-server";

export const dynamic = "force-dynamic";

const MAX_RANDOM_ATTEMPTS = 8;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codes = searchParams.get("codes")?.split(",") || [];
  const tokens = searchParams.get("tokens")?.split(",") || [];

  if (codes.length === 0) {
    return NextResponse.json({ links: [] });
  }

  // To keep it simple and somewhat secure, we only return links where the token matches.
  // Note: This isn't perfect but better than returning anyone's click counts.
  const links = await prisma.shortLink.findMany({
    where: {
      shortCode: { in: codes },
      ownerToken: { in: tokens },
    },
    select: {
      shortCode: true,
      clickCount: true,
    },
  });

  return NextResponse.json({
    links: links.map((l) => ({
      shortCode: l.shortCode,
      clickCount: l.clickCount,
    })),
  });
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body JSON tidak valid." },
      { status: 400 },
    );
  }

  const parsed = parseCreateShortLinkBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  const { url, alias } = parsed;
  const ownerToken = generateOwnerToken();

  let shortCode = alias ?? "";
  if (!shortCode) {
    for (let i = 0; i < MAX_RANDOM_ATTEMPTS; i++) {
      const candidate = generateShortCode();
      const exists = await prisma.shortLink.findUnique({
        where: { shortCode: candidate },
        select: { id: true },
      });
      if (!exists) {
        shortCode = candidate;
        break;
      }
    }
    if (!shortCode) {
      return NextResponse.json(
        { error: "Gagal membuat kode unik. Coba lagi." },
        { status: 503 },
      );
    }
  } else {
    const taken = await prisma.shortLink.findUnique({
      where: { shortCode },
      select: { id: true },
    });
    if (taken) {
      return NextResponse.json(
        { error: "Alias khusus sudah digunakan. Silakan pilih yang lain." },
        { status: 409 },
      );
    }
  }

  try {
    const row = await prisma.shortLink.create({
      data: {
        shortCode,
        originalUrl: url,
        ownerToken,
      },
    });

    return NextResponse.json(
      {
        id: row.id,
        shortCode: row.shortCode,
        originalUrl: row.originalUrl,
        clickCount: row.clickCount,
        ownerToken: row.ownerToken,
        createdAt: row.createdAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Alias khusus sudah digunakan. Silakan pilih yang lain." },
        { status: 409 },
      );
    }
    console.error("[short-links POST]", e);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan tautan." },
      { status: 500 },
    );
  }
}
