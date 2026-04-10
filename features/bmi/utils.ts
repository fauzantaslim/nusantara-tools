import {
  BMICategory,
  ActivityLevel,
  BMIInput,
  BMIResult,
  SYSTEM,
  GENDER,
  BMI_CATEGORY,
  ACTIVITY_LEVEL,
} from "./types";

export type {
  BMICategory,
  ActivityLevel,
  BMIInput,
  BMIResult,
  GenderType,
  SystemType,
} from "./types";

export function calculateBMI(input: BMIInput): BMIResult {
  const {
    system,
    weight,
    heightRaw1,
    heightRaw2 = 0,
    gender,
    age,
    activityLevel,
  } = input;

  if (weight <= 0 || heightRaw1 <= 0 || age <= 0) {
    throw new Error("Data berat, tinggi, dan umur harus lebih besar dari 0");
  }

  let weightKg = weight;
  let heightM = 0;
  let heightCm = 0;

  if (system === SYSTEM.METRIC) {
    weightKg = weight;
    heightCm = heightRaw1;
    heightM = heightCm / 100;
  } else {
    // Imperial logic
    weightKg = weight * 0.453592;
    const totalInches = heightRaw1 * 12 + heightRaw2;
    heightCm = totalInches * 2.54;
    heightM = heightCm / 100;
  }

  if (weightKg < 10) throw new Error("Berat tidak valid (minimal 10kg)");
  if (heightCm < 50) throw new Error("Tinggi tidak valid (minimal 50cm)");

  const score = weightKg / (heightM * heightM);
  const roundedScore = Math.round(score * 10) / 10;

  let category: BMICategory;
  let insight: string;

  // Menggunakan standar BMI secara umum (18.5 - 24.9 Normal)
  if (roundedScore < 18.5) {
    category = BMI_CATEGORY.KURUS;
    insight =
      "Berat badan kamu masih di bawah ideal. Coba tambah asupan makan bergizi dan jangan sering skip makan ya.";
  } else if (roundedScore <= 24.9) {
    category = BMI_CATEGORY.NORMAL;
    insight =
      "Nice! Berat badan kamu udah di range ideal. Tinggal dijaga aja pola makan dan aktivitasnya.";
  } else if (roundedScore <= 29.9) {
    category = BMI_CATEGORY.BERLEBIH;
    insight =
      "Berat badan kamu mulai naik nih. Bisa mulai dari hal kecil kayak kurangi gula dan lebih aktif bergerak.";
  } else {
    category = BMI_CATEGORY.OBESITAS;
    insight =
      "Berat badan kamu sudah cukup tinggi. Sebaiknya mulai atur pola makan dan kalau perlu konsultasi ke tenaga kesehatan.";
  }

  // Rentang berat badan ideal (BMI range 18.5 - 24.9)
  const lowerIdealKg = 18.5 * (heightM * heightM);
  const upperIdealKg = 24.9 * (heightM * heightM);

  let idealWeightRange = "";
  if (system === SYSTEM.METRIC) {
    idealWeightRange = `${Math.round(lowerIdealKg)} - ${Math.round(upperIdealKg)} kg`;
  } else {
    idealWeightRange = `${Math.round(lowerIdealKg / 0.453592)} - ${Math.round(upperIdealKg / 0.453592)} lbs`;
  }

  // Persentase Lemak Tubuh (Deurenberg eq)
  const genderValue = gender === GENDER.MALE ? 1 : 0;
  let bodyFatPercentage =
    1.2 * roundedScore + 0.23 * age - 10.8 * genderValue - 5.4;
  bodyFatPercentage = Math.max(0, Math.round(bodyFatPercentage * 10) / 10);

  // Kebutuhan Kalori Harian (Mifflin-St Jeor)
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr = gender === GENDER.MALE ? bmr + 5 : bmr - 161;

  const activityMultipliers: Record<ActivityLevel, number> = {
    [ACTIVITY_LEVEL.SEDENTARY]: 1.2,
    [ACTIVITY_LEVEL.LIGHT]: 1.375,
    [ACTIVITY_LEVEL.MODERATE]: 1.55,
    [ACTIVITY_LEVEL.ACTIVE]: 1.725,
    [ACTIVITY_LEVEL.VERY_ACTIVE]: 1.9,
  };

  const dailyCalories = Math.round(bmr * activityMultipliers[activityLevel]);

  return {
    score: roundedScore,
    category,
    insight,
    idealWeightRange,
    bodyFatPercentage,
    dailyCalories,
  };
}
