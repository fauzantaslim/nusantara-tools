"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  HijriFormData,
  HijriResult,
  HijriContextType,
  HijriConversionMode,
} from "../types";
import {
  convertToHijri,
  convertToGregorian,
  getHijriMonthName,
  getGregorianMonthName,
  getDayName,
  findIslamicEvent,
  getTodayHijriString,
} from "../utils";
import { HIJRI_CONVERSION_MODE } from "@/lib/constants";

const initialData: HijriFormData = {
  gDay: "",
  gMonth: "",
  gYear: "",
  hDay: "",
  hMonth: "",
  hYear: "",
};

export const useHijri = (): HijriContextType => {
  const [mode, setMode] = useState<HijriConversionMode>(
    HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI,
  );
  const [data, setData] = useState<HijriFormData>(initialData);
  const [error, setError] = useState<string>("");

  const updateData = useCallback((key: keyof HijriFormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetToday = useCallback(() => {
    const now = new Date();
    setMode(HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI);
    setData({
      ...initialData,
      gDay: now.getDate().toString(),
      gMonth: (now.getMonth() + 1).toString(),
      gYear: now.getFullYear().toString(),
    });
  }, []);

  const handleSetTomorrow = useCallback(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    setMode(HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI);
    setData({
      ...initialData,
      gDay: now.getDate().toString(),
      gMonth: (now.getMonth() + 1).toString(),
      gYear: now.getFullYear().toString(),
    });
  }, []);

  const handleReset = useCallback(() => {
    setData(initialData);
    setError("");
  }, []);

  const toggleMode = useCallback(() => {
    handleReset();
    setMode((prev) =>
      prev === HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI
        ? HIJRI_CONVERSION_MODE.HIJRI_TO_MASEHI
        : HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI,
    );
  }, [handleReset]);

  // Reactive Calculation
  const result = useMemo((): HijriResult | null => {
    setError("");

    if (mode === HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI) {
      const d = parseInt(data.gDay);
      const m = parseInt(data.gMonth);
      const y = parseInt(data.gYear);

      if (!data.gDay || !data.gMonth || !data.gYear) return null;
      if (isNaN(d) || isNaN(m) || isNaN(y)) return null;

      const hijri = convertToHijri(y, m, d);
      if (!hijri) {
        setError("Tanggal Masehi di luar jangkauan atau tidak valid.");
        return null;
      }

      const dateObj = new Date(y, m - 1, d);
      return {
        title: `${hijri.hd} ${getHijriMonthName(hijri.hm)} ${hijri.hy} H`,
        sub: `${d} ${getGregorianMonthName(m)} ${y} M`,
        day: getDayName(dateObj.getDay()),
        event: findIslamicEvent(hijri.hm, hijri.hd),
      };
    } else {
      const d = parseInt(data.hDay);
      const m = parseInt(data.hMonth);
      const y = parseInt(data.hYear);

      if (!data.hDay || !data.hMonth || !data.hYear) return null;
      if (isNaN(d) || isNaN(m) || isNaN(y)) return null;

      if (d < 1 || d > 30) {
        setError("Tanggal Hijriah maksimal 30 hari.");
        return null;
      }

      const greg = convertToGregorian(y, m, d);
      if (!greg) {
        setError("Tahun atau tanggal Hijriah di luar jangkauan konversi.");
        return null;
      }

      const dateObj = new Date(greg.gy, greg.gm - 1, greg.gd);
      return {
        title: `${greg.gd} ${getGregorianMonthName(greg.gm)} ${greg.gy} M`,
        sub: `${d} ${getHijriMonthName(m)} ${y} H`,
        day: getDayName(dateObj.getDay()),
        event: findIslamicEvent(m, d),
      };
    }
  }, [mode, data]);

  // Client-side only strings
  const [todayHijri, setTodayHijri] = useState<string>("");
  useEffect(() => {
    setTodayHijri(getTodayHijriString());
    handleSetToday();
  }, [handleSetToday]);

  return {
    mode,
    data,
    updateData,
    result,
    error,
    handleSetToday,
    handleSetTomorrow,
    handleReset,
    toggleMode,
    todayHijri,
  };
};
