import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ code: string }> };

export async function DELETE(request: Request, context: RouteContext) {
  const { code: rawCode } = await context.params;
  const shortCode = decodeURIComponent(rawCode);

  let body: { ownerToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body JSON tidak valid." },
      { status: 400 },
    );
  }

  const ownerToken =
    typeof body.ownerToken === "string" ? body.ownerToken.trim() : "";
  if (!ownerToken) {
    return NextResponse.json(
      { error: "Token pemilik diperlukan." },
      { status: 400 },
    );
  }

  const link = await prisma.shortLink.findUnique({
    where: { shortCode },
    select: { id: true, ownerToken: true },
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

  await prisma.shortLink.delete({ where: { id: link.id } });
  return NextResponse.json({ ok: true }, { status: 200 });
}
