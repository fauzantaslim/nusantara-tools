import { calculateBMI, BMIInput } from "@/features/bmi/utils";

describe("calculateBMI — unit tests", () => {
  const baseInput: BMIInput = {
    system: "metric",
    weight: 70,
    heightRaw1: 170,
    gender: "male",
    age: 25,
    activityLevel: "moderate",
  };

  // ─── Category boundaries ────────────────────────────────────────────────────

  it('returns category "Normal" for BMI 18.5–24.9 (metric)', () => {
    const result = calculateBMI(baseInput); // BMI ≈ 24.2
    expect(result.category).toBe("Normal");
  });

  it('returns category "Kurus" for BMI < 18.5', () => {
    const result = calculateBMI({ ...baseInput, weight: 50, heightRaw1: 175 }); // BMI ≈ 16.3
    expect(result.category).toBe("Kurus");
  });

  it('returns category "Berlebih" for BMI 25–29.9', () => {
    const result = calculateBMI({ ...baseInput, weight: 80, heightRaw1: 170 }); // BMI ≈ 27.7
    expect(result.category).toBe("Berlebih");
  });

  it('returns category "Obesitas" for BMI >= 30', () => {
    const result = calculateBMI({ ...baseInput, weight: 100, heightRaw1: 170 }); // BMI ≈ 34.6
    expect(result.category).toBe("Obesitas");
  });

  // ─── Score accuracy ─────────────────────────────────────────────────────────

  it("calculates BMI score correctly (metric)", () => {
    const result = calculateBMI({ ...baseInput, weight: 70, heightRaw1: 170 });
    // 70 / (1.70^2) = 24.2213... → rounds to 24.2
    expect(result.score).toBeCloseTo(24.2, 1);
  });

  // ─── Imperial system ────────────────────────────────────────────────────────

  it("calculates BMI correctly in imperial system", () => {
    // 154 lbs = 69.85 kg, 5ft 7in = 170.18 cm → BMI ≈ 24.1
    const result = calculateBMI({
      ...baseInput,
      system: "imperial",
      weight: 154,
      heightRaw1: 5,
      heightRaw2: 7,
    });
    expect(result.category).toBe("Normal");
    expect(result.score).toBeGreaterThan(18.5);
    expect(result.score).toBeLessThan(25);
  });

  it("formats idealWeightRange in lbs for imperial system", () => {
    const result = calculateBMI({
      ...baseInput,
      system: "imperial",
      weight: 154,
      heightRaw1: 5,
      heightRaw2: 7,
    });
    expect(result.idealWeightRange).toMatch(/lbs/);
  });

  it("formats idealWeightRange in kg for metric system", () => {
    const result = calculateBMI(baseInput);
    expect(result.idealWeightRange).toMatch(/kg/);
  });

  // ─── Body fat & calories ────────────────────────────────────────────────────

  it("returns a non-negative bodyFatPercentage", () => {
    const result = calculateBMI(baseInput);
    expect(result.bodyFatPercentage).toBeGreaterThanOrEqual(0);
  });

  it("returns dailyCalories > 0", () => {
    const result = calculateBMI(baseInput);
    expect(result.dailyCalories).toBeGreaterThan(0);
  });

  it("applies correct activity multiplier — sedentary < very_active", () => {
    const sedentary = calculateBMI({
      ...baseInput,
      activityLevel: "sedentary",
    });
    const veryActive = calculateBMI({
      ...baseInput,
      activityLevel: "very_active",
    });
    expect(veryActive.dailyCalories).toBeGreaterThan(sedentary.dailyCalories);
  });

  it("female has higher bodyFatPercentage than male with same stats", () => {
    const male = calculateBMI({ ...baseInput, gender: "male" });
    const female = calculateBMI({ ...baseInput, gender: "female" });
    expect(female.bodyFatPercentage).toBeGreaterThan(male.bodyFatPercentage);
  });

  // ─── Validation / error cases ────────────────────────────────────────────────

  it("throws when weight is 0", () => {
    expect(() => calculateBMI({ ...baseInput, weight: 0 })).toThrow();
  });

  it("throws when height is 0", () => {
    expect(() => calculateBMI({ ...baseInput, heightRaw1: 0 })).toThrow();
  });

  it("throws when age is 0", () => {
    expect(() => calculateBMI({ ...baseInput, age: 0 })).toThrow();
  });

  it("throws when weight is too low (< 10kg equivalent)", () => {
    expect(() => calculateBMI({ ...baseInput, weight: 5 })).toThrow(
      /tidak valid/,
    );
  });

  it("throws when height is too short (< 50cm)", () => {
    expect(() => calculateBMI({ ...baseInput, heightRaw1: 30 })).toThrow(
      /tidak valid/,
    );
  });
});
