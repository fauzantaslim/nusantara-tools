"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { ShortenedUrl, getBaseUrl } from "../utils";
import { cn } from "@/lib/utils";
import {
  Copy,
  Check,
  ExternalLink,
  TrendingUp,
  Trash2,
  BarChart3,
  Calendar,
  MousePointerClick,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { AnalyticsDrawer } from "./AnalyticsDrawer";

interface UrlListProps {
  urls: ShortenedUrl[];
  onCopy: (code: string) => void;
  onDelete: (id: string) => void;
  copiedCode: string | null;
}

export const UrlList: React.FC<UrlListProps> = ({
  urls,
  onCopy,
  onDelete,
  copiedCode,
}) => {
  const [selectedUrl, setSelectedUrl] = React.useState<ShortenedUrl | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleShowStats = (url: ShortenedUrl) => {
    setSelectedUrl(url);
    setIsDrawerOpen(true);
  };
  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full max-h-[460px] p-6 sm:p-10",
        "bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30 text-[#F5EDE3]",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#C17A3A]/20">
          <h3 className="text-xl font-bold font-heading text-white">
            Link Tersimpan
          </h3>
          <div className="px-3 py-1 rounded-full bg-[#C17A3A]/20 text-[#C17A3A] text-xs font-bold font-ui tabular-nums">
            {urls.length} Link
          </div>
        </div>

        {urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12 text-center opacity-60">
            <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Link2 className="w-8 h-8" />
            </div>
            <p className="font-body text-sm">
              Belum ada link yang dipendekkan.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
            {urls.map((url) => {
              const shortUrl = `${getBaseUrl()}/s/${url.shortCode}`;

              return (
                <div
                  key={url.id}
                  className="bg-[#1A0E07]/40 border border-[#7A5C42]/30 p-4 rounded-2xl flex flex-col gap-4 relative group transition-all hover:border-[#C17A3A]/50"
                >
                  {/* Action buttons top right */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDelete(url.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                      title="Hapus Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Top section: original vs short */}
                  <div className="flex gap-4 items-start pr-12">
                    <div className="flex flex-col overflow-hidden gap-1">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-bold font-heading text-[#C17A3A] hover:underline truncate"
                      >
                        /s/{url.shortCode}
                      </a>
                      <p
                        className="text-xs font-body text-[#EDE0D0]/60 truncate"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </p>
                    </div>
                  </div>

                  {/* Bottom section: stats and copy */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#7A5C42]/20">
                    <div className="flex items-center gap-4 text-[#EDE0D0]/80">
                      <div className="flex items-center gap-1.5 text-xs font-ui tabular-nums">
                        <MousePointerClick className="w-3.5 h-3.5" />
                        <span>{url.clicks} klik</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-ui">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {formatDistanceToNow(new Date(url.createdAt), {
                            addSuffix: true,
                            locale: id,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShowStats(url)}
                        className="p-2 rounded-lg border border-[#C17A3A]/30 hover:bg-[#C17A3A]/20 transition-colors text-[#C17A3A]"
                        title="Lihat Statistik"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-[#7A5C42]/30 hover:bg-[#7A5C42]/20 transition-colors text-white"
                        title="Buka Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => onCopy(url.shortCode)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-bold font-ui",
                          copiedCode === url.shortCode
                            ? "bg-green-500/20 border-green-500/30 text-green-400"
                            : "border-[#C17A3A]/30 bg-[#C17A3A]/10 text-[#C17A3A] hover:bg-[#C17A3A]/20",
                        )}
                      >
                        {copiedCode === url.shortCode ? (
                          <>
                            <Check className="w-4 h-4" /> Tersalin!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Salin URL
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AnalyticsDrawer
        url={selectedUrl}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(193, 122, 58, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(193, 122, 58, 0.5);
        }
      `}</style>
    </Card>
  );
};

// Quick helper to avoid importing link2 at top and breaking simple rules
const Link2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
