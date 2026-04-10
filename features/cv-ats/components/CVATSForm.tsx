"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { CVATSContextType } from "../types";
import { cn } from "@/lib/utils";
import {
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Wrench,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  AlertTriangle,
} from "lucide-react";

const DynamicBulletInput = ({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) => {
  return (
    <div className="space-y-2 w-full">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 w-full items-start">
          <div className="flex-1 min-w-0">
            <Input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx] = e.target.value;
                onChange(newItems);
              }}
              placeholder={placeholder || "..."}
              className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
            />
          </div>
          <Button
            variant="danger"
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl shrink-0 h-[48px] border-none shadow-none"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        type="button"
        onClick={() => onChange([...items, ""])}
        className="text-xs text-[#C17A3A] font-bold flex items-center gap-1 hover:underline mt-2 p-0 h-auto bg-transparent border-none shadow-none"
      >
        <Plus className="w-3 h-3 justify-center" /> Tambah Poin Baru
      </Button>
    </div>
  );
};

export const CVATSForm: React.FC<{ cvHook: CVATSContextType }> = ({
  cvHook,
}) => {
  const {
    data,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    resetForm,
  } = cvHook;
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [tempSkill, setTempSkill] = useState("");

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? "" : tab);
  };

  const handleAddSkill = () => {
    if (tempSkill.trim()) {
      addSkill(tempSkill);
      setTempSkill("");
    }
  };

  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary">
            Data Curriculum Vitae
          </h2>
          <p className="text-sm text-secondary font-body mt-1">
            Isi form di bawah untuk generate CV ATS-friendly.
          </p>
        </div>
        <div className="flex bg-surface/50 p-1 rounded-xl border border-muted">
          <button
            onClick={() => cvHook.updateLanguage("id")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
              data.language === "id"
                ? "bg-[#C17A3A] text-white shadow-sm"
                : "text-secondary hover:text-primary",
            )}
          >
            ID
          </button>
          <button
            onClick={() => cvHook.updateLanguage("en")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
              data.language === "en"
                ? "bg-[#C17A3A] text-white shadow-sm"
                : "text-secondary hover:text-primary",
            )}
          >
            EN
          </button>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* TAB 1: Personal Info */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("personal")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold text-primary">
                1. Informasi Pribadi
              </span>
            </div>
            {activeTab === "personal" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "personal" && (
            <div className="p-4 sm:p-5 border-t border-muted bg-surface/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Input
                    label="Nama Lengkap *"
                    type="text"
                    value={data.personalInfo.fullName}
                    onChange={(e) =>
                      updatePersonalInfo("fullName", e.target.value)
                    }
                    placeholder="Budi Santoso"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    label="Posisi Target / Jabatan *"
                    type="text"
                    value={data.personalInfo.jobTitle}
                    onChange={(e) =>
                      updatePersonalInfo("jobTitle", e.target.value)
                    }
                    placeholder="Software Engineer"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    label="No. Handphone *"
                    type="text"
                    value={data.personalInfo.phone}
                    onChange={(e) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                    placeholder="0812345678"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    label="Email *"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                    placeholder="budi@email.com"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    label="Lokasi (Kota, Negara)"
                    type="text"
                    value={data.personalInfo.location}
                    onChange={(e) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                    placeholder="Jakarta, Indonesia"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    label="LinkedIn (Opsional)"
                    type="text"
                    value={data.personalInfo.linkedin}
                    onChange={(e) =>
                      updatePersonalInfo("linkedin", e.target.value)
                    }
                    placeholder="linkedin.com/in/budisantoso"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <div className="space-y-1.5" style={{ gridColumn: "1 / -1" }}>
                  <label className="text-xs font-bold text-secondary">
                    Website / Portfolio (Opsional)
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.portfolio}
                    onChange={(e) =>
                      updatePersonalInfo("portfolio", e.target.value)
                    }
                    placeholder="budisantoso.com"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TAB 2: Summary */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("summary")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <AlignLeft className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold text-primary">
                2. Profil Ringkas (Summary)
              </span>
            </div>
            {activeTab === "summary" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "summary" && (
            <div className="p-4 sm:p-5 border-t border-muted space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary">
                  Professional Summary
                </label>
                <textarea
                  rows={5}
                  value={data.personalInfo.summary}
                  onChange={(e) =>
                    updatePersonalInfo("summary", e.target.value)
                  }
                  placeholder="Seorang Software Engineer dengan pengalaman 3 tahun dalam mendesain dan mengembangkan..."
                  className="w-full py-3 bg-surface/50 border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A]"
                />
                <p className="text-[10px] text-secondary">
                  Tulis 3-4 kalimat kuat yang mencakup peran Anda dengan keyword
                  pencapaian dan keahlian inti.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* TAB 3: Experience */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("experience")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold text-primary">
                3. Pengalaman Kerja
              </span>
            </div>
            {activeTab === "experience" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "experience" && (
            <div className="p-4 sm:p-5 border-t border-muted bg-surface/10 space-y-6">
              {data.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="relative p-4 bg-white border border-muted rounded-2xl"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-primary mb-3 text-sm">
                    Pengalaman #{idx + 1}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className="space-y-1.5"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <Input
                        label="Posisi / Jabatan"
                        type="text"
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, "position", e.target.value)
                        }
                        placeholder="Contoh: Frontend Developer"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Nama Perusahaan"
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        placeholder="PT Solusi Digital"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Lokasi"
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(exp.id, "location", e.target.value)
                        }
                        placeholder="Jakarta (Remote)"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Mulai (Bulan / Tahun)"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 w-full">
                      <Input
                        label="Selesai"
                        type="month"
                        disabled={exp.isCurrent}
                        value={exp.isCurrent ? "" : exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl disabled:opacity-50"
                      />
                      <label className="text-xs flex items-center gap-1.5 pt-1 text-secondary cursor-pointer w-max">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "isCurrent",
                              e.target.checked,
                            )
                          }
                          className="accent-[#C17A3A]"
                        />
                        <span>Sekarang</span>
                      </label>
                    </div>
                    <div
                      className="space-y-1.5 w-full"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <label className="text-xs font-bold text-secondary">
                        Deskripsi & Pencapaian (Bulleted)
                      </label>
                      <DynamicBulletInput
                        items={exp.description || []}
                        onChange={(newItems) =>
                          updateExperience(exp.id, "description", newItems)
                        }
                        placeholder="Mendevelop fitur X yang meningkatkan konversi 20%"
                      />
                      <p className="text-[10px] text-secondary">
                        Gunakan poin-poin yang mudah dibaca oleh ATS dengan kata
                        kunci pencapaian.
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addExperience}
                fullWidth
                className="py-3 border-2 border-dashed border-[#C17A3A]/30 text-[#C17A3A] hover:bg-[#C17A3A]/5 transition flex items-center justify-center gap-2 bg-transparent shadow-none"
              >
                <Plus className="w-4 h-4" /> Tambah Pengalaman Kerja
              </Button>
            </div>
          )}
        </div>

        {/* TAB 4: Education */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("education")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold text-primary">
                4. Riwayat Pendidikan
              </span>
            </div>
            {activeTab === "education" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "education" && (
            <div className="p-4 sm:p-5 border-t border-muted bg-surface/10 space-y-6">
              {data.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="relative p-4 bg-white border border-muted rounded-2xl"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-primary mb-3 text-sm">
                    Pendidikan #{idx + 1}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className="space-y-1.5"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <Input
                        label="Nama Institusi / Universitas"
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, "institution", e.target.value)
                        }
                        placeholder="Universitas Indonesia"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Gelar"
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        placeholder="S1"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Jurusan"
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          updateEducation(
                            edu.id,
                            "fieldOfStudy",
                            e.target.value,
                          )
                        }
                        placeholder="Ilmu Komputer"
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        label="Tahun Mulai"
                        type="month"
                        value={edu.startYear}
                        onChange={(e) =>
                          updateEducation(edu.id, "startYear", e.target.value)
                        }
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 w-full">
                      <Input
                        label="Tahun Lulus"
                        type="month"
                        disabled={edu.isCurrent}
                        value={edu.isCurrent ? "" : edu.endYear}
                        onChange={(e) =>
                          updateEducation(edu.id, "endYear", e.target.value)
                        }
                        className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl disabled:opacity-50"
                      />
                      <label className="text-xs flex items-center gap-1.5 pt-1 text-secondary cursor-pointer w-max">
                        <input
                          type="checkbox"
                          checked={edu.isCurrent}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "isCurrent",
                              e.target.checked,
                            )
                          }
                          className="accent-[#C17A3A]"
                        />
                        <span>Sekarang</span>
                      </label>
                    </div>
                    <div
                      className="space-y-1.5 w-full"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <label className="text-xs font-bold text-secondary">
                        Deskripsi & Ekstrakurikuler (Opsional)
                      </label>
                      <DynamicBulletInput
                        items={edu.description || []}
                        onChange={(newItems) =>
                          updateEducation(edu.id, "description", newItems)
                        }
                        placeholder="Meraih predikat Cum Laude IPK 3.90"
                      />
                      <p className="text-[10px] text-secondary">
                        Hanya tuliskan yang paling relevan dengan pekerjaan yang
                        Anda lamar.
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addEducation}
                fullWidth
                className="py-3 border-2 border-dashed border-[#C17A3A]/30 text-[#C17A3A] hover:bg-[#C17A3A]/5 transition flex items-center justify-center gap-2 bg-transparent shadow-none"
              >
                <Plus className="w-4 h-4" /> Tambah Riwayat Pendidikan
              </Button>
            </div>
          )}
        </div>

        {/* TAB 5: Skills */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("skills")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold text-primary">
                5. Keahlian (Skills)
              </span>
            </div>
            {activeTab === "skills" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "skills" && (
            <div className="p-4 sm:p-5 border-t border-muted bg-surface/10 space-y-4">
              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={tempSkill}
                    onChange={(e) => setTempSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Ketikan skill (Cth: React.js, Sales) lalu tekan Tambah"
                    className="focus:ring-[#C17A3A] focus:border-transparent rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleAddSkill}
                  className="bg-[#C17A3A] text-white rounded-xl shadow-sm hover:bg-[#A66832] transition px-4 h-[44px]"
                >
                  Tambah
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {data.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white border border-muted rounded-full px-3 py-1.5 shadow-sm"
                  >
                    <span className="text-sm font-body text-primary">
                      {skill}
                    </span>
                    <button
                      onClick={() => removeSkill(idx)}
                      className="text-secondary hover:text-red-500 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {data.skills.length === 0 && (
                  <p className="text-xs text-secondary italic px-2">
                    Belum ada skill ditambahkan.
                  </p>
                )}
              </div>

              <div className="bg-[#C17A3A]/10 border border-[#C17A3A]/20 p-3 rounded-xl flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                <p className="text-xs text-primary leading-relaxed">
                  Sistem ATS mencari keyword spesifik. Tulis skill secara
                  terpisah (jangan dalam satu kalimat blok panjang) agar skor
                  parsing ATS lebih tinggi.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-muted flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-secondary/70 font-body">
          Perubahan tersimpan otomatis di browser lokal.
        </p>
        <Button
          variant="danger"
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 h-auto text-xs font-bold font-ui text-red-600 bg-red-50 hover:bg-red-100 transition-colors border-none shadow-none rounded-xl"
        >
          <Trash2 className="w-4 h-4" /> Kosongkan Form
        </Button>
      </div>
    </Card>
  );
};
