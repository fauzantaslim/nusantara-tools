import { z } from "zod";
import {
  URL_SHORTENER_CHARS,
  URL_SHORTENER_DEFAULT_LENGTH,
  URL_SHORTENER_BASE_URL,
  URL_SHORTENER_ALIAS_REGEX,
} from "@/lib/constants";

// Validation schema for URL
export const urlSchema = z.object({
  url: z
    .string()
    .url("Format URL tidak valid. Sertakan http:// atau https://")
    .min(1, "URL tidak boleh kosong"),
  alias: z
    .string()
    .regex(
      URL_SHORTENER_ALIAS_REGEX,
      "Alias hanya boleh berisi huruf, angka, -, atau _",
    )
    .max(20, "Alias terlalu panjang (maksimal 20 karakter)")
    .optional()
    .or(z.literal("")),
});

export const generateShortCode = (
  length = URL_SHORTENER_DEFAULT_LENGTH,
): string => {
  const chars = URL_SHORTENER_CHARS;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return URL_SHORTENER_BASE_URL;
};
