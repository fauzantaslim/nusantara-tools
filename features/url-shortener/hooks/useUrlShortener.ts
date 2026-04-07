"use client";

import { useState, useEffect, useCallback } from "react";
import { ShortenedUrl, generateShortCode, getBaseUrl } from "../utils";

const STORAGE_KEY = "nusantara_url_shortener";

export const useUrlShortener = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUrls(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored URLs", e);
      }
    }
  }, []);

  // Save to local storage whenever urls change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  }, [urls]);

  const shortenUrl = useCallback(
    (originalUrl: string, customAlias?: string): ShortenedUrl | null => {
      // Basic formatting to ensure http/https
      let formattedUrl = originalUrl;
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }

      const shortCode = customAlias || generateShortCode();

      // Check if code already exists
      if (urls.some((u) => u.shortCode === shortCode)) {
        return null; // Alias already in use
      }

      const newUrl: ShortenedUrl = {
        id: crypto.randomUUID ? crypto.randomUUID() : generateShortCode(10),
        originalUrl: formattedUrl,
        shortCode,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      setUrls((prev) => [newUrl, ...prev]);
      return newUrl;
    },
    [urls],
  );

  const deleteUrl = useCallback((id: string) => {
    setUrls((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const copyToClipboard = useCallback(async (shortCode: string) => {
    const fullUrl = `${getBaseUrl()}/s/${shortCode}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(shortCode);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return {
    urls,
    shortenUrl,
    deleteUrl,
    copyToClipboard,
    isCopied,
  };
};
