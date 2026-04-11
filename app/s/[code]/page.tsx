"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShortenedUrl, AnalyticEntry } from "@/features/url-shortener/types";
import { UAParser } from "ua-parser-js";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "nusantara_url_shortener";

export default function RedirectPage() {
  const params = useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trackAndRedirect = async () => {
      const code = params.code as string;
      if (!code) return;

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const urls: ShortenedUrl[] = JSON.parse(stored);
          const targetIndex = urls.findIndex((u) => u.shortCode === code);

          if (targetIndex !== -1) {
            const targetUrl = urls[targetIndex];

            // 1. Get Location (IP-based)
            let country = "Unknown";
            let city = "Unknown";
            try {
              const res = await fetch("https://ipapi.co/json/");
              if (res.ok) {
                const data = await res.json();
                country = data.country_name || "Unknown";
                city = data.city || "Unknown";
              }
            } catch (e) {
              console.warn("Location tracking failed", e);
            }

            // 2. Get Device/Browser Info
            const parser = new UAParser();
            const result = parser.getResult();
            const browser = result.browser.name || "Unknown";
            const device = result.device.type || "desktop"; // Default to desktop if null
            const os = result.os.name || "Unknown";

            // 3. Create Analytic Entry
            const newEntry: AnalyticEntry = {
              timestamp: new Date().toISOString(),
              country,
              city,
              referrer: document.referrer || "Direct",
              browser,
              device,
              os,
            };

            // 4. Update URL data with cap
            urls[targetIndex].clicks += 1;
            if (!urls[targetIndex].analytics) {
              urls[targetIndex].analytics = [];
            }
            // Limit to 500 entries
            urls[targetIndex].analytics = [
              newEntry,
              ...(urls[targetIndex].analytics || []),
            ].slice(0, 500);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));

            // 5. Redirect
            window.location.replace(targetUrl.originalUrl);
          } else {
            setError(
              "Tautan tidak ditemukan. Mungkin sudah kedaluwarsa atau salah penulisan.",
            );
          }
        } catch (e) {
          console.error("Local storage error:", e);
          setError("Terjadi kesalahan sistem saat mencari tautan.");
        }
      } else {
        setError(
          "Tautan tidak ditemukan. Tidak ada data yang tersimpan di perangkat ini.",
        );
      }
    };

    trackAndRedirect();
  }, [params.code]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center text-center gap-6 border border-[#EDE0D0]">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-primary">
            Tautan Tidak Valid
          </h1>
          <p className="text-secondary font-body">{error}</p>
          <Link
            href="/produktivitas/url-shortener"
            className="mt-4 px-6 py-3 bg-[#1A0E07] text-[#F5EDE3] font-bold font-ui rounded-xl shadow-lg hover:bg-[#2C1A0E] transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke URL Shortener
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-6 p-4">
      <Loader2 className="w-12 h-12 text-[#C17A3A] animate-spin" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold font-heading text-primary animate-pulse">
          Mengalihkan...
        </h1>
        <p className="text-sm text-secondary font-body">
          Membawa Anda ke tautan tujuan dalam hitungan detik.
        </p>
      </div>
    </div>
  );
}
