"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  PrayerFormData,
  DailyPrayerTimes,
  PrayerContextType,
  PrayerCountdown,
} from "../types";
import { calculatePrayerTimesData, formatCountdown } from "../utils";
import { PRAYER_PRESET_CITIES, PRAYER_TIME_FORMAT } from "@/lib/constants";

const initialData: PrayerFormData = {
  lat: "-6.2088",
  lng: "106.8456",
  locationName: "Jakarta (WIB) - Default",
  date: "",
  method: "MuslimWorldLeague",
  asrMethod: "Standard",
  highLatRule: "MiddleOfTheNight",
  timeFormat: PRAYER_TIME_FORMAT.FORMAT_24H,
  cityPreset: "Jakarta",
};

export const usePrayer = (): PrayerContextType => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PrayerFormData>(initialData);
  const [error, setError] = useState<string>("");
  const [isLocating, setIsLocating] = useState(false);

  // Sync with client-side only
  useEffect(() => {
    setIsClient(true);
    setData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

  const updateData = useCallback((key: keyof PrayerFormData, value: string) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };

      // If updating city preset, update coordinates
      if (key === "cityPreset" && value !== "GPS") {
        const city = PRAYER_PRESET_CITIES.find((c) => c.value === value);
        if (city) {
          next.lat = city.lat.toString();
          next.lng = city.lng.toString();
          next.locationName = city.label;
        }
      }

      // Clear preset name if manual coord input
      if ((key === "lat" || key === "lng") && prev.cityPreset !== "") {
        next.cityPreset = "";
        next.locationName = "Titik Kustom";
      }

      return next;
    });
  }, []);

  const handleGeolocation = useCallback(() => {
    setIsLocating(true);
    setError("");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setData((prev) => ({
            ...prev,
            lat: pos.coords.latitude.toString(),
            lng: pos.coords.longitude.toString(),
            locationName: "Lokasi GPS Akurat 📍",
            cityPreset: "GPS",
          }));
          setIsLocating(false);
        },
        () => {
          setError("Izin lokasi ditolak atau gagal mengambil GPS.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } else {
      setError("Browser Anda tidak mendukung Geolocation.");
      setIsLocating(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setData({
      ...initialData,
      date: new Date().toISOString().split("T")[0],
    });
    setError("");
  }, []);

  // Reactive Calculation
  const prayerTimes = useMemo((): DailyPrayerTimes | null => {
    if (!isClient) return null;
    try {
      const pLat = parseFloat(data.lat);
      const pLng = parseFloat(data.lng);

      if (isNaN(pLat) || pLat < -90 || pLat > 90) return null;
      if (isNaN(pLng) || pLng < -180 || pLng > 180) return null;

      const calcDate = data.date ? new Date(data.date) : new Date();
      calcDate.setHours(12, 0, 0, 0);

      return calculatePrayerTimesData({
        latitude: pLat,
        longitude: pLng,
        date: calcDate,
        method: data.method,
        asrMethod: data.asrMethod,
        highLatitudeRule: data.highLatRule,
        timeFormat: data.timeFormat,
      });
    } catch {
      return null;
    }
  }, [isClient, data]);

  // Real-time Countdown
  const [countdown, setCountdown] = useState<PrayerCountdown>({
    nextPrayerName: "",
    countdownStr: "",
  });

  useEffect(() => {
    if (!prayerTimes) return;

    const tick = () => {
      const now = new Date();
      const times = [
        { name: "Imsak", time: prayerTimes.imsak.getTime() },
        { name: "Subuh", time: prayerTimes.fajr.getTime() },
        { name: "Terbit", time: prayerTimes.sunrise.getTime() },
        { name: "Dzuhur", time: prayerTimes.dhuhr.getTime() },
        { name: "Asar", time: prayerTimes.asr.getTime() },
        { name: "Maghrib", time: prayerTimes.maghrib.getTime() },
        { name: "Isya", time: prayerTimes.isha.getTime() },
      ];

      let next = times.find((t) => now.getTime() < t.time);

      if (next) {
        setCountdown({
          nextPrayerName: next.name,
          countdownStr: formatCountdown(next.time - now.getTime()),
        });
      } else {
        setCountdown({
          nextPrayerName: "Subuh (Esok)",
          countdownStr: "--:--:--",
        });
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return {
    data,
    updateData,
    prayerTimes,
    countdown,
    error,
    isLocating,
    handleGeolocation,
    handleReset,
  };
};
