"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { URL_SHORTENER_STORAGE_KEY } from "@/lib/constants";
import { getBaseUrl } from "../utils";
import { ShortenedUrl, AnalyticEntry } from "../types";

export const useUrlShortener = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const urlsRef = useRef(urls);

  useEffect(() => {
    urlsRef.current = urls;
  }, [urls]);

  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(URL_SHORTENER_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ShortenedUrl[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUrls(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse stored URLs", e);
      }
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(URL_SHORTENER_STORAGE_KEY, JSON.stringify(urls));
  }, [urls, storageReady]);

  const shortenUrl = useCallback(
    async (
      originalUrl: string,
      customAlias?: string,
    ): Promise<
      { ok: true; data: ShortenedUrl } | { ok: false; error: string }
    > => {
      const res = await fetch("/api/short-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: originalUrl,
          ...(customAlias ? { alias: customAlias } : {}),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        id?: string;
        shortCode?: string;
        originalUrl?: string;
        clickCount?: number;
        ownerToken?: string;
        createdAt?: string;
      };

      if (!res.ok) {
        return {
          ok: false,
          error:
            typeof payload.error === "string"
              ? payload.error
              : "Gagal membuat tautan pendek.",
        };
      }

      if (
        typeof payload.id !== "string" ||
        typeof payload.shortCode !== "string" ||
        typeof payload.originalUrl !== "string" ||
        typeof payload.createdAt !== "string" ||
        typeof payload.ownerToken !== "string"
      ) {
        return { ok: false, error: "Respons server tidak valid." };
      }

      const newUrl: ShortenedUrl = {
        id: payload.id,
        shortCode: payload.shortCode,
        originalUrl: payload.originalUrl,
        clicks: payload.clickCount ?? 0,
        createdAt: payload.createdAt,
        ownerToken: payload.ownerToken,
      };

      setUrls((prev) => [newUrl, ...prev]);
      return { ok: true, data: newUrl };
    },
    [],
  );

  const deleteUrl = useCallback(async (id: string) => {
    const entry = urlsRef.current.find((u) => u.id === id);
    if (entry?.ownerToken && entry.shortCode) {
      try {
        await fetch(`/api/short-links/${encodeURIComponent(entry.shortCode)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ownerToken: entry.ownerToken }),
        });
      } catch (e) {
        console.error("Failed to delete short link on server", e);
      }
    }
    setUrls((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const fetchAnalytics = useCallback(
    async (shortCode: string, ownerToken: string) => {
      try {
        const res = await fetch(
          `/api/short-links/${encodeURIComponent(shortCode)}/analytics`,
          {
            headers: { "X-Owner-Token": ownerToken },
          },
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { analytics: AnalyticEntry[] };
        setUrls((prev) =>
          prev.map((u) =>
            u.shortCode === shortCode ? { ...u, analytics: data.analytics } : u,
          ),
        );
        return data.analytics;
      } catch (e) {
        console.error("Failed to fetch analytics", e);
        return null;
      }
    },
    [],
  );

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
    fetchAnalytics,
    isCopied,
  };
};
