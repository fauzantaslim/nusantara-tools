import { z } from "zod";

export interface AnalyticEntry {
  timestamp: string;
  country: string;
  city: string;
  referrer: string;
  browser: string;
  device: string;
  os: string;
}

export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string; // ISO date string
  analytics?: AnalyticEntry[];
}

// Validation schema for URL
export const urlSchema = z.object({
  url: z
    .string()
    .url("Format URL tidak valid. Sertakan http:// atau https://")
    .min(1, "URL tidak boleh kosong"),
  alias: z
    .string()
    .regex(
      /^[a-zA-Z0-9-_]*$/,
      "Alias hanya boleh berisi huruf, angka, -, atau _",
    )
    .max(20, "Alias terlalu panjang (maksimal 20 karakter)")
    .optional()
    .or(z.literal("")),
});

export const generateShortCode = (length = 6): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
  return "https://nusantara-tools.com";
};
