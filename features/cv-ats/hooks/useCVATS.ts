import { useState, useCallback, useEffect } from "react";
import {
  CVData,
  CVLanguage,
  PersonalInfo,
  WorkExperience,
  Education,
  AdditionalSection,
  AdditionalSectionType,
} from "../types";
import { generateId } from "../utils";

const initialData: CVData = {
  language: "id",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    phone: "",
    email: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  additional: [],
};

const LOCAL_STORAGE_KEY = "nusantaratools_cv_ats_data";

export const useCVATS = () => {
  const [data, setData] = useState<CVData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: CVData = JSON.parse(saved);
        // Normalize backward compatibility
        if (parsed.experience) {
          parsed.experience = parsed.experience.map((exp) => ({
            ...exp,
            description: Array.isArray(exp.description)
              ? exp.description
              : typeof exp.description === "string"
                ? (exp.description as string).split("\n").filter(Boolean)
                : [],
          }));
        }
        if (parsed.education) {
          parsed.education = parsed.education.map((edu) => ({
            ...edu,
            isCurrent: !!edu.isCurrent,
            description: Array.isArray(edu.description) ? edu.description : [],
          }));
        }
        setData(parsed);
      }
    } catch (e) {
      console.error("Failed to load CV data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save CV data", e);
      }
    }
  }, [data, isLoaded]);

  const updatePersonalInfo = useCallback(
    (key: keyof PersonalInfo, value: string) => {
      setData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [key]: value },
      }));
    },
    [],
  );

  const updateLanguage = useCallback((lang: CVLanguage) => {
    setData((prev) => ({ ...prev, language: lang }));
  }, []);

  // --- Experience ---
  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: [],
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    <K extends keyof WorkExperience>(
      id: string,
      key: K,
      value: WorkExperience[K],
    ) => {
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === id ? { ...exp, [key]: value } : exp,
        ),
      }));
    },
    [],
  );

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const moveExperience = useCallback((id: string, direction: "up" | "down") => {
    setData((prev) => {
      const index = prev.experience.findIndex((e) => e.id === id);
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prev.experience.length - 1)
      ) {
        return prev;
      }
      const newItems = [...prev.experience];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      return { ...prev, experience: newItems };
    });
  }, []);

  // --- Education ---
  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startYear: "",
          endYear: "",
          isCurrent: false,
          description: [],
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback(
    <K extends keyof Education>(id: string, key: K, value: Education[K]) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, [key]: value } : edu,
        ),
      }));
    },
    [],
  );

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  const moveEducation = useCallback((id: string, direction: "up" | "down") => {
    setData((prev) => {
      const index = prev.education.findIndex((e) => e.id === id);
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prev.education.length - 1)
      ) {
        return prev;
      }
      const newItems = [...prev.education];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      return { ...prev, education: newItems };
    });
  }, []);

  // --- Skills ---
  const addSkill = useCallback((skillStr: string) => {
    const skillsToAdd = skillStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setData((prev) => {
      const currentSkills = new Set(prev.skills);
      skillsToAdd.forEach((s) => currentSkills.add(s));
      return { ...prev, skills: Array.from(currentSkills) };
    });
  }, []);

  const removeSkill = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  const moveSkill = useCallback((index: number, direction: "up" | "down") => {
    setData((prev) => {
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prev.skills.length - 1)
      ) {
        return prev;
      }
      const newSkills = [...prev.skills];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const temp = newSkills[index];
      newSkills[index] = newSkills[targetIndex];
      newSkills[targetIndex] = temp;
      return { ...prev, skills: newSkills };
    });
  }, []);

  // --- Additional Sections ---
  const addAdditional = useCallback((type: AdditionalSectionType) => {
    const typeTitles = {
      certification: "Sertifikasi",
      project: "Proyek",
      award: "Penghargaan",
      language: "Bahasa",
      volunteer: "Pengalaman Relawan",
    };

    setData((prev) => ({
      ...prev,
      additional: [
        ...prev.additional,
        {
          id: generateId(),
          type,
          title: typeTitles[type],
          description: "",
        },
      ],
    }));
  }, []);

  const updateAdditional = useCallback(
    <K extends keyof AdditionalSection>(
      id: string,
      key: K,
      value: AdditionalSection[K],
    ) => {
      setData((prev) => ({
        ...prev,
        additional: prev.additional.map((item) =>
          item.id === id ? { ...item, [key]: value } : item,
        ),
      }));
    },
    [],
  );

  const removeAdditional = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      additional: prev.additional.filter((item) => item.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus semua data? Ini tidak bisa dibatalkan.",
      )
    ) {
      setData(initialData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  return {
    data,
    updatePersonalInfo,
    updateLanguage,
    addExperience,
    updateExperience,
    removeExperience,
    moveExperience,
    addEducation,
    updateEducation,
    removeEducation,
    moveEducation,
    addSkill,
    removeSkill,
    moveSkill,
    addAdditional,
    updateAdditional,
    removeAdditional,
    resetForm,
    isLoaded,
  };
};
