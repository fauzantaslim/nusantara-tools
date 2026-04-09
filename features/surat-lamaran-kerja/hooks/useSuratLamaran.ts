import { useState, useEffect } from "react";

export type Biodata = {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  status: string;
  pendidikanTerakhir: string;
  noHp: string;
  email: string;
  alamatKota: string;
  alamatLengkap: string;
};

export type CompanyData = {
  kepadaYth: string;
  hrd: string;
  namaPerusahaan: string;
  kotaPerusahaan: string;
  jenisInstansi: string;
  posisiLowongan: string;
  sumberLowongan: string;
};

export type Completeness = {
  tanggalLamaran: string;
  lampiran: string[];
};

export type DocumentSettings = {
  paperSize: string;
  font: string;
  fontSize: string;
  lineHeight: string;
  alignment: string;
  indentation: string;
  datePlacement: string;
  signaturePlacement: string;
};

const defaultBiodata: Biodata = {
  namaLengkap: "",
  tempatLahir: "",
  tanggalLahir: "",
  jenisKelamin: "Pria",
  status: "Lajang",
  pendidikanTerakhir: "",
  noHp: "",
  email: "",
  alamatKota: "",
  alamatLengkap: "",
};

const defaultCompanyData: CompanyData = {
  kepadaYth: "Bapak/Ibu",
  hrd: "HRD",
  namaPerusahaan: "",
  kotaPerusahaan: "",
  jenisInstansi: "Perusahaan",
  posisiLowongan: "",
  sumberLowongan: "",
};

const defaultCompleteness: Completeness = {
  tanggalLamaran: new Date().toISOString().split("T")[0],
  lampiran: ["Curriculum Vitae", "Fotokopi KTP", "Pas Foto Terbaru"],
};

const defaultSettings: DocumentSettings = {
  paperSize: "a4",
  font: "",
  fontSize: "1rem",
  lineHeight: "1.5",
  alignment: "justify",
  indentation: "yes",
  datePlacement: "top-right",
  signaturePlacement: "right",
};

export function useSuratLamaran() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [biodata, setBiodata] = useState<Biodata>(defaultBiodata);
  const [companyData, setCompanyData] =
    useState<CompanyData>(defaultCompanyData);
  const [completeness, setCompleteness] =
    useState<Completeness>(defaultCompleteness);
  const [settings, setSettings] = useState<DocumentSettings>(defaultSettings);

  // Load from local storage
  useEffect(() => {
    try {
      const savedBiodata = localStorage.getItem("slk_biodata");
      const savedCompanyData = localStorage.getItem("slk_company");
      const savedCompleteness = localStorage.getItem("slk_completeness");
      const savedSettings = localStorage.getItem("slk_settings");

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

      setBiodata(defaultBiodata);
      setCompanyData(defaultCompanyData);
      setCompleteness(defaultCompleteness);
      setSettings(defaultSettings);
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
