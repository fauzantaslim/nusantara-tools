"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { FocusPreset, PomodoroSettings as ISettings } from "../utils";
import { cn } from "@/lib/utils";
import {
  Settings,
  Timer,
  Coffee,
  Wind,
  Bell,
  Volume2,
  Music,
} from "lucide-react";

interface PomodoroSettingsProps {
  settings: ISettings;
  preset: FocusPreset;
  updatePreset: (p: FocusPreset) => void;
  updateCustomSettings: (s: Partial<ISettings>) => void;
  requestPermission: () => Promise<NotificationPermission>;
}

export const PomodoroSettings: React.FC<PomodoroSettingsProps> = ({
  settings,
  preset,
  updatePreset,
  updateCustomSettings,
}) => {
  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#C17A3A]" />
          Konfigurasi Fokus
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Sesuaikan durasi sesi fokus dan istirahat Anda.
        </p>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Presets */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <Timer className="w-4 h-4" /> Mode Fokus
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                "Baby Step",
                "Popular",
                "Medium",
                "Extended",
                "Custom",
              ] as FocusPreset[]
            ).map((p) => (
              <button
                key={p}
                onClick={() => updatePreset(p)}
                className={cn(
                  "px-4 py-3 rounded-2xl border-2 transition-all text-sm font-bold font-ui text-center",
                  preset === p
                    ? "border-[#C17A3A] bg-[#C17A3A]/8 text-[#C17A3A]"
                    : "border-muted bg-white text-secondary hover:border-secondary/30",
                )}
              >
                {p} {p === "Popular" && "⭐"}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Inputs */}
        <div className="flex flex-col gap-6 p-6 bg-surface/50 rounded-3xl border border-muted/50">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="focus-duration"
                className="text-xs font-bold font-ui text-secondary flex items-center gap-2 cursor-pointer"
              >
                <Timer className="w-3 h-3 text-[#C17A3A]" /> Durasi Fokus
                (menit)
              </label>
              <input
                id="focus-duration"
                type="number"
                min="1"
                max="120"
                value={settings.focusDuration}
                onChange={(e) =>
                  updateCustomSettings({
                    focusDuration: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#C17A3A]/20 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="short-break"
                  className="text-xs font-bold font-ui text-secondary flex items-center gap-2 cursor-pointer"
                >
                  <Coffee className="w-3 h-3 text-[#4A7C59]" /> Istirahat (mnt)
                </label>
                <input
                  id="short-break"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.shortBreakDuration}
                  onChange={(e) =>
                    updateCustomSettings({
                      shortBreakDuration: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#4A7C59]/20 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="long-break"
                  className="text-xs font-bold font-ui text-secondary flex items-center gap-2 cursor-pointer"
                >
                  <Wind className="w-3 h-3 text-[#7A5C42]" /> Panjang (mnt)
                </label>
                <input
                  id="long-break"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreakDuration}
                  onChange={(e) =>
                    updateCustomSettings({
                      longBreakDuration: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#7A5C42]/20 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toggles & Audio */}
        <div className="flex flex-col gap-4 pt-4 border-t border-muted/50">
          <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Pengaturan Tambahan
          </label>

          <div className="space-y-3">
            <button
              onClick={async () => {
                updateCustomSettings({
                  notificationEnabled: !settings.notificationEnabled,
                });
              }}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                settings.notificationEnabled
                  ? "bg-[#C17A3A]/5 border-[#C17A3A]/20"
                  : "bg-white border-muted",
              )}
            >
              <div className="flex items-center gap-3">
                <Bell
                  className={cn(
                    "w-5 h-5",
                    settings.notificationEnabled
                      ? "text-[#C17A3A]"
                      : "text-secondary",
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold font-ui text-left">
                    Notifikasi Browser
                  </span>
                  {typeof window !== "undefined" &&
                    "Notification" in window &&
                    Notification.permission === "denied" &&
                    settings.notificationEnabled && (
                      <span className="text-[10px] text-red-500 font-medium text-left animate-pulse">
                        Izin diblokir. Aktifkan di setelan browser.
                      </span>
                    )}
                </div>
              </div>
              <div
                className={cn(
                  "w-10 h-6 rounded-full relative transition-colors",
                  settings.notificationEnabled ? "bg-[#C17A3A]" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    settings.notificationEnabled ? "left-5" : "left-1",
                  )}
                />
              </div>
            </button>

            <button
              onClick={() =>
                updateCustomSettings({ soundEnabled: !settings.soundEnabled })
              }
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                settings.soundEnabled
                  ? "bg-[#C17A3A]/5 border-[#C17A3A]/20"
                  : "bg-white border-muted",
              )}
            >
              <div className="flex items-center gap-3">
                <Volume2
                  className={cn(
                    "w-5 h-5",
                    settings.soundEnabled ? "text-[#C17A3A]" : "text-secondary",
                  )}
                />
                <span className="text-sm font-bold font-ui">Suara Alarm</span>
              </div>
              <div
                className={cn(
                  "w-10 h-6 rounded-full relative transition-colors",
                  settings.soundEnabled ? "bg-[#C17A3A]" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    settings.soundEnabled ? "left-5" : "left-1",
                  )}
                />
              </div>
            </button>

            {settings.soundEnabled && (
              <div className="px-4 py-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) =>
                    updateCustomSettings({ volume: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#C17A3A]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-muted/50">
          <div className="flex items-center gap-2 text-primary font-heading font-bold">
            <Music className="w-5 h-5" />
            <span>Fokus dengan Musik</span>
          </div>
          <iframe
            style={{ borderRadius: "16px" }}
            src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Card>
  );
};
