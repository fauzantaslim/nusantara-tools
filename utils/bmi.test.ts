import { expect, test, describe } from "vitest";
import { calculateBMI, BMIInput } from "../features/bmi/utils";

describe("calculateBMI - Uji Coba Logic Berdasarkan PRD", () => {
  const baseInput: BMIInput = {
    system: "metric",
    weight: 65,
    heightRaw1: 170,
    heightRaw2: 0,
    gender: "male",
    age: 25,
    activityLevel: "moderate",
  };

  test("Skenario: Valid Normal", () => {
    // 65 / (1.7 * 1.7) = 22.49... => 22.5
    const result = calculateBMI({ ...baseInput, weight: 65, heightRaw1: 170 });
    expect(result.score).toBe(22.5);
    expect(result.category).toBe("Normal");
  });

  test("Skenario: Valid Kurus", () => {
    // 45 / (1.6 * 1.6) = 17.57... => 17.6
    const result = calculateBMI({ ...baseInput, weight: 45, heightRaw1: 160 });
    expect(result.score).toBe(17.6);
    expect(result.category).toBe("Kurus");
  });

  test("Skenario: Valid Overweight", () => {
    // 70 / (1.65^2) = 25.71... => 25.7
    const result = calculateBMI({ ...baseInput, weight: 70, heightRaw1: 165 });
    expect(result.score).toBe(25.7);
    expect(result.category).toBe("Overweight");
  });

  test("Skenario: Valid Obesitas", () => {
    // 90 / (1.65^2) = 33.05... => 33.1
    const result = calculateBMI({ ...baseInput, weight: 90, heightRaw1: 165 });
    expect(result.score).toBe(33.1);
    expect(result.category).toBe("Obesitas");
  });

  test("Skenario: Limit Minimal Berat (9kg)", () => {
    expect(() =>
      calculateBMI({ ...baseInput, weight: 9, heightRaw1: 165 }),
    ).toThrowError("Berat tidak valid (minimal 10kg)");
  });

  test("Skenario: Input 0 untuk Tinggi", () => {
    expect(() =>
      calculateBMI({ ...baseInput, weight: 60, heightRaw1: 0 }),
    ).toThrowError("Data berat, tinggi, dan umur harus lebih besar dari 0");
  });

  test("Skenario: Input Negatif", () => {
    expect(() =>
      calculateBMI({ ...baseInput, weight: 60, heightRaw1: -50 }),
    ).toThrowError("Data berat, tinggi, dan umur harus lebih besar dari 0");
  });

  test("Skenario: Imperial Valid", () => {
    const result = calculateBMI({
      ...baseInput,
      system: "imperial",
      weight: 150,
      heightRaw1: 5,
      heightRaw2: 5,
    });
    expect(result.score).toBe(25.0);
  });
});
