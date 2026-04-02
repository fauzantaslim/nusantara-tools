import {
  formatTime,
  getModeLabel,
  getModeColor,
  POMODORO_PRESETS,
} from "@/features/pomodoro/utils";

describe("Pomodoro Utils", () => {
  describe("formatTime", () => {
    test("formats seconds correctly", () => {
      expect(formatTime(0)).toBe("00:00");
      expect(formatTime(59)).toBe("00:59");
      expect(formatTime(60)).toBe("01:00");
      expect(formatTime(61)).toBe("01:01");
      expect(formatTime(600)).toBe("10:00");
      expect(formatTime(3599)).toBe("59:59");
    });
  });

  describe("getModeLabel", () => {
    test("returns correct labels for modes", () => {
      expect(getModeLabel("focus")).toContain("Fokus");
      expect(getModeLabel("shortBreak")).toContain("Istirahat Sejenak");
      expect(getModeLabel("longBreak")).toContain("Istirahat Panjang");
    });
  });

  describe("getModeColor", () => {
    test("returns correct brand colors", () => {
      expect(getModeColor("focus")).toBe("#C17A3A"); // Kunyit Emas
      expect(getModeColor("shortBreak")).toBe("#4A7C59"); // Hijau Hutan
      expect(getModeColor("longBreak")).toBe("#7A5C42"); // Tanah Merah
    });
  });

  describe("POMODORO_PRESETS", () => {
    test("has correct Popular preset", () => {
      expect(POMODORO_PRESETS["Popular"]).toEqual({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
      });
    });

    test("has correct Baby Step preset", () => {
      expect(POMODORO_PRESETS["Baby Step"]).toEqual({
        focusDuration: 10,
        shortBreakDuration: 5,
        longBreakDuration: 10,
      });
    });
  });
});
