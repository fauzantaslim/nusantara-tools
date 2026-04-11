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
