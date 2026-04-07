export type SystemType = "metric" | "imperial";
export type GenderType = "male" | "female";
export type ActivityLevel = "low" | "moderate" | "high";
export type ClimateType = "normal" | "hot" | "humid";
export type AltitudeType = "low" | "high";
export type OutputUnitType = "ml" | "liter" | "cups" | "oz";

export interface WaterInput {
  system: SystemType;
  gender: GenderType;
  age: number;
  weight: number; // in kg or lbs depending on system
  activityLevel: ActivityLevel;
  exerciseDuration: number; // in minutes
  climate: ClimateType;
  altitude: AltitudeType;
  caffeine: boolean;
  alcohol: boolean;
  highProtein: boolean;
  pregnant: boolean;
  sick: boolean;
  unit: OutputUnitType;
}

export interface HydrationSchedule {
  time: string;
  label: string;
  amount: number;
  percentage: number;
}

export interface WaterResult {
  baseIntakeMl: number;
  totalIntakeMl: number; // In this version, baseIntake = totalIntake to avoid unverified medical heuristics
  convertedIntake: number; // totalIntake converted to actual output unit
  unitLabel: string;
  schedule: HydrationSchedule[];
  qualitativeTips: string[];
}

export function calculateWaterIntake(input: WaterInput): WaterResult {
  // Convert basic metric
  let weightInKg = input.weight;
  if (input.system === "imperial") {
    weightInKg = input.weight * 0.453592;
  }

  // Base Calculation: Weight(kg) * 35ml
  const baseIntakeMl = Math.round(weightInKg * 35);
  const totalIntakeMl = baseIntakeMl; // Strict adherence to "no medical hallucination"

  // Qualitative Analysis based on factors (since we omit the quantitative numbers)
  const tips: string[] = [];

  if (
    input.activityLevel === "moderate" ||
    input.activityLevel === "high" ||
    input.exerciseDuration > 0
  ) {
    tips.push(
      "Aktivitas fisik ekstra meningkatkan kehilangan air melalui keringat. Pastikan Anda minum air tambahan di luar kebutuhan dasar ini setiap kali berolahraga.",
    );
  }
  if (input.climate === "hot" || input.climate === "humid") {
    tips.push(
      "Cuaca panas atau lembap mempercepat dehidrasi. Pertimbangkan untuk meningkatkan asupan air Anda hari ini.",
    );
  }
  if (input.altitude === "high") {
    tips.push(
      "Di dataran tinggi, Anda mungkin kehilangan air lebih cepat karena pernapasan. Tingkatkan hidrasi Anda.",
    );
  }
  if (input.caffeine || input.alcohol) {
    tips.push(
      "Kafein atau alkohol dapat bertindak sebagai diuretik ringan yang menyebabkan Anda lebih sering buang air kecil. Minumlah ekstra untuk menyeimbangkannya.",
    );
  }
  if (input.highProtein) {
    tips.push(
      "Diet tinggi protein memerlukan lebih banyak air untuk metabolisme. Pastikan Anda mencukupi kebutuhan cairan Anda.",
    );
  }
  if (input.pregnant) {
    tips.push(
      "Kebutuhan hidrasi meningkat secara signifikan selama kehamilan dan menyusui. Silakan konsultasi dengan tenaga medis.",
    );
  }
  if (input.sick) {
    tips.push(
      "Demam atau penyakit akan membakar lebih banyak cairan. Terus tingkatkan asupan air Anda untuk pemulihan optimal.",
    );
  }

  // Fallback default tip if none applied
  if (tips.length === 0) {
    tips.push(
      "Anda memiliki kondisi standar. Asupan cairan dasar ini sangat cocok untuk memulai hidrasi harian Anda yang sehat.",
    );
  }

  // Convert unit
  let convertedIntake = totalIntakeMl;
  let unitLabel = "ml";

  if (input.unit === "liter") {
    convertedIntake = totalIntakeMl / 1000;
    unitLabel = "Liter";
  } else if (input.unit === "cups") {
    convertedIntake = totalIntakeMl / 250; // Approximating 1 cup = 250ml
    unitLabel = "Gelas (250ml)";
  } else if (input.unit === "oz") {
    convertedIntake = totalIntakeMl / 29.5735;
    unitLabel = "oz";
  }

  // Build a generic drinking schedule timeline
  // Distribution approx: 20%, 15%, 15%, 15%, 15%, 20%
  const distribution = [
    { time: "07:00 Pagi", label: "Bangun Tidur & Sarapan", percentage: 20 },
    { time: "09:30 Pagi", label: "Di Sela Aktivitas Pagi", percentage: 15 },
    { time: "12:30 Siang", label: "Setelah Makan Siang", percentage: 15 },
    { time: "15:30 Sore", label: "Penyegar Sore Hari", percentage: 15 },
    { time: "18:30 Malam", label: "Setelah Makan Malam", percentage: 15 },
    { time: "21:00 Malam", label: "1 Jam Sebelum Tidur", percentage: 20 },
  ];

  const schedule: HydrationSchedule[] = distribution.map((slot) => {
    let slotAmount = (totalIntakeMl * slot.percentage) / 100;

    // Format presentation based on selected unit
    if (input.unit === "liter") {
      slotAmount = slotAmount / 1000;
    } else if (input.unit === "cups") {
      slotAmount = slotAmount / 250;
    } else if (input.unit === "oz") {
      slotAmount = slotAmount / 29.5735;
    }

    return {
      time: slot.time,
      label: slot.label,
      percentage: slot.percentage,
      // Round appropriately
      amount:
        input.unit === "liter" || input.unit === "cups"
          ? Math.round(slotAmount * 10) / 10
          : Math.round(slotAmount),
    };
  });

  return {
    baseIntakeMl,
    totalIntakeMl,
    convertedIntake:
      input.unit === "liter" || input.unit === "cups"
        ? Math.round(convertedIntake * 10) / 10
        : Math.round(convertedIntake),
    unitLabel,
    schedule,
    qualitativeTips: tips,
  };
}
