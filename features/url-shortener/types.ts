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
  /** Secret from server; required to DELETE on DB. Legacy local-only entries may omit. */
  ownerToken?: string;
  analytics?: AnalyticEntry[];
}
