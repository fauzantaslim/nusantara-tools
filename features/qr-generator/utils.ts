import { z } from "zod";

export type QrType = "url" | "text" | "email" | "phone";

export interface QrOptions {
  fgColor: string;
  bgColor: string;
}

export const urlSchema = z.object({
  url: z.string().url("Format URL tidak valid. Sertakan http:// atau https://"),
});

export const textSchema = z.object({
  text: z
    .string()
    .min(1, "Teks tidak boleh kosong")
    .max(500, "Panjang teks maksimal 500 karakter"),
});

export const emailSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  subject: z.string().optional(),
  body: z.string().optional(),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(5, "Nomor telepon terlalu pendek")
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Format nomor telepon tidak valid. Gunakan angka atau format internasional (+62...)",
    ),
});

// Helper to format payload correctly based on type
export const formatQrPayload = (
  type: QrType,
  data: Record<string, string>,
): string => {
  switch (type) {
    case "url":
      return data.url || "";
    case "text":
      return data.text || "";
    case "email":
      if (!data.email) return "";
      const emailParams = new URLSearchParams();
      if (data.subject) emailParams.append("subject", data.subject);
      if (data.body) emailParams.append("body", data.body);

      const queryString = emailParams.toString();
      return `mailto:${data.email}${queryString ? `?${queryString}` : ""}`;
    case "phone":
      return data.phone ? `tel:${data.phone.replace(/[^+\d]/g, "")}` : "";
    default:
      return "";
  }
};
