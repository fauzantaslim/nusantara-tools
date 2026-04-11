"use client";

import React, { useMemo } from "react";
import { ShortenedUrl } from "../types";
import {
  X,
  TrendingUp,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Layout,
  MousePointer2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  format,
  parseISO,
  startOfDay,
  eachDayOfInterval,
  subDays,
} from "date-fns";
import { id } from "date-fns/locale";

interface AnalyticsDrawerProps {
  url: ShortenedUrl | null;
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = ["#C17A3A", "#A96930", "#8B572A", "#6D4421", "#4F3218"];

export const AnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({
  url,
  isOpen,
  onClose,
}) => {
  const analytics = url?.analytics || [];

  // 1. Process Data for Engagement over Time (Last 7 days)
  const engagementData = useMemo(() => {
    if (!analytics.length) return [];

    const end = new Date();
    const start = subDays(end, 6);
    const intervals = eachDayOfInterval({ start, end });

    const counts: Record<string, number> = {};
    analytics.forEach((entry) => {
      const dateStr = format(parseISO(entry.timestamp), "yyyy-MM-dd");
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    });

    return intervals.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      return {
        name: format(date, "dd MMM", { locale: id }),
        clicks: counts[dateStr] || 0,
      };
    });
  }, [analytics]);

  // 2. Process Data for Locations
  const locationData = useMemo(() => {
    const counts: Record<string, number> = {};
    analytics.forEach((entry) => {
      const key = entry.country || "Unknown";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [analytics]);

  // 3. Process Data for Referrers
  const referrerData = useMemo(() => {
    const counts: Record<string, number> = {};
    analytics.forEach((entry) => {
      const key = entry.referrer || "Direct";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [analytics]);

  // 4. Process Data for Devices
  const deviceData = useMemo(() => {
    const counts: Record<string, number> = {};
    analytics.forEach((entry) => {
      const key = entry.device || "desktop";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [analytics]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[101] shadow-2xl flex flex-col transition-transform duration-300 ease-out p-0",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-muted flex items-center justify-between bg-surface/30">
          <div>
            <h2 className="text-xl font-bold font-heading text-primary">
              Statistik Tautan
            </h2>
            <p className="text-xs text-secondary font-body truncate max-w-[300px]">
              /s/{url?.shortCode}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-secondary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {analytics.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60 py-20">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                <MousePointer2 className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <p className="font-heading font-bold text-primary">
                  Belum Ada Data
                </p>
                <p className="text-sm font-body text-secondary mt-1">
                  Kunjungi tautan ini untuk mulai mengumpulkan analitik.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Engagement Chart */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-4 h-4 text-[#C17A3A]" />
                  <h3 className="font-bold font-ui text-sm uppercase tracking-wider">
                    Interaksi Seiring Waktu
                  </h3>
                </div>
                <div className="h-[200px] w-full bg-surface/30 p-2 rounded-2xl border border-muted">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E2E8F0"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#64748B" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#64748B" }}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "none" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#C17A3A"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                          fill: "#C17A3A",
                          strokeWidth: 2,
                          stroke: "#fff",
                        }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Locations & Referrers */}
              <div className="grid grid-cols-1 gap-8">
                {/* Locations */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4 text-[#C17A3A]" />
                    <h3 className="font-bold font-ui text-sm uppercase tracking-wider">
                      Lokasi Teratas
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {locationData.map((item, idx) => (
                      <div key={item.name} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-body items-center">
                          <span className="text-primary font-medium">
                            {item.name}
                          </span>
                          <span className="text-secondary">
                            {item.value} klik
                          </span>
                        </div>
                        <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C17A3A] rounded-full transition-all duration-1000"
                            style={{
                              width: `${(item.value / analytics.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Referrers */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Globe className="w-4 h-4 text-[#C17A3A]" />
                    <h3 className="font-bold font-ui text-sm uppercase tracking-wider">
                      Sumber (Referrers)
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {referrerData.map((item, idx) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 bg-surface/50 border border-muted rounded-xl hover:bg-surface transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-heading font-bold text-primary truncate max-w-[200px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#C17A3A] bg-[#C17A3A]/10 px-2 py-0.5 rounded-full">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Devices Distribution */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Layout className="w-4 h-4 text-[#C17A3A]" />
                  <h3 className="font-bold font-ui text-sm uppercase tracking-wider">
                    Perangkat
                  </h3>
                </div>
                <div className="flex items-center justify-around py-4 bg-surface/30 rounded-2xl border border-muted">
                  {deviceData.map((item, idx) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                        {item.name.toLowerCase() === "mobile" ? (
                          <Smartphone className="w-6 h-6 text-[#C17A3A]" />
                        ) : (
                          <Monitor className="w-6 h-6 text-[#A96930]" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold font-ui text-secondary uppercase">
                          {item.name}
                        </p>
                        <p className="text-sm font-bold font-heading text-primary">
                          {Math.round((item.value / analytics.length) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="p-6 border-t border-muted bg-surface/30 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary font-body">Total Interaksi</span>
            <span className="text-primary font-bold font-heading">
              {url?.clicks} Klik
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#1A0E07] text-white font-bold font-ui rounded-xl hover:bg-[#2C1A0E] transition-all active:scale-[0.98]"
          >
            Tutup Statistik
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(193, 122, 58, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(193, 122, 58, 0.4);
        }
      `}</style>
    </>
  );
};
