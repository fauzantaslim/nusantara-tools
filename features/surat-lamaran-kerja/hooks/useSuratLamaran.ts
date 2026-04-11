import { useState, useEffect } from "react";
import { JOB_LETTER_DEFAULT_STATE } from "@/lib/constants";
import { Biodata, CompanyData, Completeness, DocumentSettings } from "../types";

export function useSuratLamaran() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Use data from centralized constants with explicit type casting for safety
  const [biodata, setBiodata] = useState<Biodata>(
    JOB_LETTER_DEFAULT_STATE.biodata as unknown as Biodata,
  );
  const [companyData, setCompanyData] = useState<CompanyData>(
    JOB_LETTER_DEFAULT_STATE.companyData as unknown as CompanyData,
  );
  const [completeness, setCompleteness] = useState<Completeness>(
    JOB_LETTER_DEFAULT_STATE.completeness as unknown as Completeness,
  );
  const [settings, setSettings] = useState<DocumentSettings>(
    JOB_LETTER_DEFAULT_STATE.settings as unknown as DocumentSettings,
  );

  // Load from local storage
  useEffect(() => {
    try {
      const savedBiodata = localStorage.getItem("slk_biodata");
      const savedCompanyData = localStorage.getItem("slk_company");
      const savedCompleteness = localStorage.getItem("slk_completeness");
      const savedSettings = localStorage.getItem("slk_settings");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedBiodata) setBiodata(JSON.parse(savedBiodata));
      if (savedCompanyData) setCompanyData(JSON.parse(savedCompanyData));
      if (savedCompleteness) setCompleteness(JSON.parse(savedCompleteness));
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("slk_biodata", JSON.stringify(biodata));
  }, [biodata, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("slk_company", JSON.stringify(companyData));
  }, [companyData, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("slk_completeness", JSON.stringify(completeness));
  }, [completeness, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("slk_settings", JSON.stringify(settings));
  }, [settings, isLoaded]);

  const clearData = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
      localStorage.removeItem("slk_biodata");
      localStorage.removeItem("slk_company");
      localStorage.removeItem("slk_completeness");
      localStorage.removeItem("slk_settings");

      setBiodata(JOB_LETTER_DEFAULT_STATE.biodata as unknown as Biodata);
      setCompanyData(
        JOB_LETTER_DEFAULT_STATE.companyData as unknown as CompanyData,
      );
      setCompleteness(
        JOB_LETTER_DEFAULT_STATE.completeness as unknown as Completeness,
      );
      setSettings(
        JOB_LETTER_DEFAULT_STATE.settings as unknown as DocumentSettings,
      );
    }
  };

  return {
    biodata,
    setBiodata,
    companyData,
    setCompanyData,
    completeness,
    setCompleteness,
    settings,
    setSettings,
    clearData,
    isLoaded,
  };
}
