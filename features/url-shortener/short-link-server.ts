import "server-only";

import { randomBytes } from "crypto";
import { z } from "zod";
import { URL_SHORTENER_ALIAS_REGEX } from "@/lib/constants";

export function generateOwnerToken(): string {
  return randomBytes(32).toString("base64url");
}

export function formatOriginalUrl(input: string): string {
  let formatted = input.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = `https://${formatted}`;
  }
  return formatted;
}

export type ParseCreateBodyResult =
  | { ok: true; url: string; alias?: string }
  | { ok: false; message: string };

export function parseCreateShortLinkBody(raw: unknown): ParseCreateBodyResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, message: "Permintaan tidak valid." };
  }
  const o = raw as Record<string, unknown>;
  const rawUrl = typeof o.url === "string" ? o.url.trim() : "";
  if (!rawUrl) {
    return { ok: false, message: "URL tidak boleh kosong." };
  }

  const formatted = formatOriginalUrl(rawUrl);
  const urlParsed = z
    .string()
    .url("Format URL tidak valid.")
    .safeParse(formatted);
  if (!urlParsed.success) {
    return {
      ok: false,
      message: urlParsed.error.issues[0]?.message ?? "URL tidak valid.",
    };
  }

  let alias: string | undefined;
  if (typeof o.alias === "string" && o.alias.trim() !== "") {
    alias = o.alias.trim();
    if (alias.length > 20) {
      return {
        ok: false,
        message: "Alias terlalu panjang (maksimal 20 karakter).",
      };
    }
    if (!URL_SHORTENER_ALIAS_REGEX.test(alias)) {
      return {
        ok: false,
        message: "Alias hanya boleh berisi huruf, angka, -, atau _.",
      };
    }
  }

  return { ok: true, url: formatted, alias };
}

export function isSafeRedirectUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
