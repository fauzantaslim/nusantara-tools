import { CVData } from "./types";

/**
 * Validates if the required fields are filled to make the CV functional
 */
export function validateCV(data: CVData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.personalInfo.fullName.trim()) {
    errors.push("Nama Lengkap wajib diisi.");
  }

  if (!data.personalInfo.email.trim() && !data.personalInfo.phone.trim()) {
    errors.push("Minimal sertakan Email atau No Handphone untuk kontak.");
  }

  if (data.experience.length === 0 && data.education.length === 0) {
    errors.push("Minimal harus memiliki 1 Pengalaman Kerja ATAU 1 Pendidikan.");
  }

  if (data.skills.length === 0) {
    errors.push("Minimal tambahkan 1 keahlian (Skill).");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Simple calculation to give a completeness score (pseudo ATS score)
 * based on how much information is provided.
 */
export function getCompletenessScore(data: CVData): number {
  let score = 0;
  const { personalInfo, experience, education, skills } = data;

  // Base Info (Max 30)
  if (personalInfo.fullName) score += 5;
  if (personalInfo.jobTitle) score += 5;
  if (personalInfo.email) score += 5;
  if (personalInfo.phone) score += 5;
  if (personalInfo.location) score += 5;
  if (personalInfo.linkedin || personalInfo.portfolio) score += 5;

  // Summary (Max 10)
  if (personalInfo.summary && personalInfo.summary.length > 50) score += 10;

  // Experience (Max 30)
  if (experience.length > 0) {
    score += 15;
    // Check quality of first experience
    const mainExp = experience[0];
    if (
      mainExp.company &&
      mainExp.position &&
      mainExp.description.length > 30
    ) {
      score += 15;
    }
  }

  // Education (Max 15)
  if (education.length > 0) {
    score += 10;
    const mainEdu = education[0];
    if (mainEdu.institution && mainEdu.degree) {
      score += 5;
    }
  }

  // Skills (Max 15)
  if (skills.length > 0) {
    score += 5;
    if (skills.length >= 5) score += 10;
  }

  // Format bounds
  return Math.min(Math.max(score, 0), 100);
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};
