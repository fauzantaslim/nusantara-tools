import { QR_MODE } from "@/lib/constants";

export type QrType = (typeof QR_MODE)[keyof typeof QR_MODE];

export interface QrOptions {
  fgColor: string;
  bgColor: string;
}

export interface InputData {
  url: string;
  text: string;
  email: string;
  subject: string;
  body: string;
  phone: string;
}
