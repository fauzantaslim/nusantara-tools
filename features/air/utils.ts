import {
  WaterInput,
  WaterResult,
  HydrationSchedule,
  SYSTEM,
  ACTIVITY_LEVEL,
  CLIMATE,
  ALTITUDE,
  OUTPUT_UNIT,
} from "./types";

export function calculateWaterIntake(input: WaterInput): WaterResult {
  // Convert basic metric
  let weightInKg = input.weight;
  if (input.system === SYSTEM.IMPERIAL) {
    weightInKg = input.weight * 0.453592;
  }

  // Base Calculation: Weight(kg) * 35ml
  const baseIntakeMl = Math.round(weightInKg * 35);
  const totalIntakeMl = baseIntakeMl; // Strict adherence to "no medical hallucination"

  // Qualitative Analysis based on factors (since we omit the quantitative numbers)
  const tips: string[] = [];

  if (
    input.activityLevel === ACTIVITY_LEVEL.MODERATE ||
    input.activityLevel === ACTIVITY_LEVEL.HIGH ||
    input.exerciseDuration > 0
  ) {
    tips.push(
      "Aktivitas fisik ekstra meningkatkan kehilangan air melalui keringat. Pastikan Anda minum air tambahan di luar kebutuhan dasar ini setiap kali berolahraga.",
    );
  }
  if (input.climate === CLIMATE.HOT || input.climate === CLIMATE.HUMID) {
    tips.push(
      "Cuaca panas atau lembap mempercepat dehidrasi. Pertimbangkan untuk meningkatkan asupan air Anda hari ini.",
    );
  }
  if (input.altitude === ALTITUDE.HIGH) {
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

  if (input.unit === OUTPUT_UNIT.LITER) {
    convertedIntake = totalIntakeMl / 1000;
    unitLabel = "Liter";
  } else if (input.unit === OUTPUT_UNIT.CUPS) {
    convertedIntake = totalIntakeMl / 250; // Approximating 1 cup = 250ml
    unitLabel = "Gelas (250ml)";
  } else if (input.unit === OUTPUT_UNIT.OZ) {
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
    if (input.unit === OUTPUT_UNIT.LITER) {
      slotAmount = slotAmount / 1000;
    } else if (input.unit === OUTPUT_UNIT.CUPS) {
      slotAmount = slotAmount / 250;
    } else if (input.unit === OUTPUT_UNIT.OZ) {
      slotAmount = slotAmount / 29.5735;
    }

    return {
      time: slot.time,
      label: slot.label,
      percentage: slot.percentage,
      // Round appropriately
      amount:
        input.unit === OUTPUT_UNIT.LITER || input.unit === OUTPUT_UNIT.CUPS
          ? Math.round(slotAmount * 10) / 10
          : Math.round(slotAmount),
    };
  });

  return {
    baseIntakeMl,
    totalIntakeMl,
    convertedIntake:
      input.unit === OUTPUT_UNIT.LITER || input.unit === OUTPUT_UNIT.CUPS
        ? Math.round(convertedIntake * 10) / 10
        : Math.round(convertedIntake),
    unitLabel,
    schedule,
    qualitativeTips: tips,
  };
}
