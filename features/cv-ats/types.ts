export type CVLanguage = "id" | "en";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  description: string[];
}

export type AdditionalSectionType =
  | "certification"
  | "project"
  | "award"
  | "language"
  | "volunteer";

export interface AdditionalSection {
  id: string;
  title: string;
  type: AdditionalSectionType;
  description: string;
}

export interface CVData {
  language: CVLanguage;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  additional: AdditionalSection[];
}

export interface CVATSContextType {
  data: CVData;
  updatePersonalInfo: (key: keyof PersonalInfo, value: string) => void;
  updateLanguage: (lang: CVLanguage) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, key: keyof WorkExperience, value: any) => void;
  removeExperience: (id: string) => void;
  moveExperience: (id: string, direction: "up" | "down") => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, key: keyof Education, value: any) => void;
  removeEducation: (id: string) => void;
  moveEducation: (id: string, direction: "up" | "down") => void;

  // Skills
  addSkill: (skillStr: string) => void;
  removeSkill: (index: number) => void;
  moveSkill: (index: number, direction: "up" | "down") => void;

  // Additional
  addAdditional: (type: AdditionalSectionType) => void;
  updateAdditional: (
    id: string,
    key: keyof AdditionalSection,
    value: any,
  ) => void;
  removeAdditional: (id: string) => void;

  resetForm: () => void;
}
