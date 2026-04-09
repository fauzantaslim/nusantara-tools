"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import {
  Biodata,
  CompanyData,
  Completeness,
  DocumentSettings,
} from "../hooks/useSuratLamaran";
import {
  PAPER_SIZES,
  FONTS,
  FONT_SIZES,
  LINE_HEIGHTS,
  ALIGNMENTS,
  INDENTATIONS,
  DATE_PLACEMENTS,
  SIGNATURE_PLACEMENTS,
  LAMPIRAN_OPTIONS,
} from "../utils";
import {
  User,
  Building2,
  Files,
  Settings2,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SuratLamaranFormProps {
  biodata: Biodata;
  setBiodata: React.Dispatch<React.SetStateAction<Biodata>>;
  companyData: CompanyData;
  setCompanyData: React.Dispatch<React.SetStateAction<CompanyData>>;
  completeness: Completeness;
  setCompleteness: React.Dispatch<React.SetStateAction<Completeness>>;
  settings: DocumentSettings;
  setSettings: React.Dispatch<React.SetStateAction<DocumentSettings>>;
  clearData: () => void;
}

export const SuratLamaranForm: React.FC<SuratLamaranFormProps> = ({
  biodata,
  setBiodata,
  companyData,
  setCompanyData,
  completeness,
  setCompleteness,
  settings,
  setSettings,
  clearData,
}) => {
  const [activeTab, setActiveTab] = useState<string>("biodata");

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? "" : tab);
  };

  const handleLampiranToggle = (optionText: string) => {
    setCompleteness((prev) => {
      const isSelected = prev.lampiran.includes(optionText);
      const newLampiran = isSelected
        ? prev.lampiran.filter((item) => item !== optionText)
        : [...prev.lampiran, optionText];
      return { ...prev, lampiran: newLampiran };
    });
  };

  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary">
          Isi Data Lamaran
        </h2>
        <p className="text-sm text-secondary font-body mt-1">
          Lengkapi form di bawah ini untuk menghasilkan surat lamaran kerja.
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {/* TAB 1: Biodata */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("biodata")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C17A3A]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#C17A3A]" />
              </div>
              <span className="font-bold font-ui text-primary">
                1. Data Pribadi
              </span>
            </div>
            {activeTab === "biodata" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "biodata" && (
            <div className="p-4 sm:p-5 border-t border-muted space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={biodata.namaLengkap}
                    onChange={(e) =>
                      setBiodata({ ...biodata, namaLengkap: e.target.value })
                    }
                    placeholder="Contoh: Budi Santoso"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Pendidikan Terakhir *
                  </label>
                  <input
                    type="text"
                    value={biodata.pendidikanTerakhir}
                    onChange={(e) =>
                      setBiodata({
                        ...biodata,
                        pendidikanTerakhir: e.target.value,
                      })
                    }
                    placeholder="Contoh: S1 Teknik Informatika"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={biodata.tempatLahir}
                    onChange={(e) =>
                      setBiodata({ ...biodata, tempatLahir: e.target.value })
                    }
                    placeholder="Contoh: Jakarta"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={biodata.tanggalLahir}
                    onChange={(e) =>
                      setBiodata({ ...biodata, tanggalLahir: e.target.value })
                    }
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Jenis Kelamin
                  </label>
                  <select
                    value={biodata.jenisKelamin}
                    onChange={(e) =>
                      setBiodata({ ...biodata, jenisKelamin: e.target.value })
                    }
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Status Pernikahan
                  </label>
                  <select
                    value={biodata.status}
                    onChange={(e) =>
                      setBiodata({ ...biodata, status: e.target.value })
                    }
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  >
                    <option value="Lajang">Lajang</option>
                    <option value="Menikah">Menikah</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Nomor Handphone/WA
                  </label>
                  <input
                    type="text"
                    value={biodata.noHp}
                    onChange={(e) =>
                      setBiodata({ ...biodata, noHp: e.target.value })
                    }
                    placeholder="Contoh: 08123456789"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={biodata.email}
                    onChange={(e) =>
                      setBiodata({ ...biodata, email: e.target.value })
                    }
                    placeholder="Contoh: budi@email.com"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-2">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={biodata.alamatLengkap}
                    onChange={(e) =>
                      setBiodata({ ...biodata, alamatLengkap: e.target.value })
                    }
                    placeholder="Contoh: Jl. Sudirman No 123, RT 01/RW 02..."
                    className="w-full py-2 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Kota Tempat Tinggal
                  </label>
                  <input
                    type="text"
                    value={biodata.alamatKota}
                    onChange={(e) =>
                      setBiodata({ ...biodata, alamatKota: e.target.value })
                    }
                    placeholder="Contoh: Jakarta Selatan"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#C17A3A] transition-colors font-body text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TAB 2: Company Data */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("company")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A7C59]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#4A7C59]" />
              </div>
              <span className="font-bold font-ui text-primary">
                2. Data Perusahaan
              </span>
            </div>
            {activeTab === "company" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "company" && (
            <div className="p-4 sm:p-5 border-t border-muted space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Sapaan Kepada Yth.
                  </label>
                  <input
                    type="text"
                    value={companyData.kepadaYth}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        kepadaYth: e.target.value,
                      })
                    }
                    placeholder="Bapak/Ibu"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Jabatan (Contoh: HRD)
                  </label>
                  <input
                    type="text"
                    value={companyData.hrd}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, hrd: e.target.value })
                    }
                    placeholder="Contoh: HRD Manager"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Nama Perusahaan / Instansi *
                  </label>
                  <input
                    type="text"
                    value={companyData.namaPerusahaan}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        namaPerusahaan: e.target.value,
                      })
                    }
                    placeholder="Contoh: PT. Nusantara Sukses"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Kota Perusahaan
                  </label>
                  <input
                    type="text"
                    value={companyData.kotaPerusahaan}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        kotaPerusahaan: e.target.value,
                      })
                    }
                    placeholder="Contoh: Jakarta Pusat"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Jenis Instansi
                  </label>
                  <select
                    value={companyData.jenisInstansi}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        jenisInstansi: e.target.value,
                      })
                    }
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  >
                    <option value="Perusahaan">Perusahaan</option>
                    <option value="Instansi Pemerintahan">
                      Instansi Pemerintahan / CPNS
                    </option>
                    <option value="Sekolah / Yayasan">Sekolah / Yayasan</option>
                    <option value="Rumah Sakit / Klinik">
                      Rumah Sakit / Klinik
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-bold text-secondary">
                    Posisi Lowongan *
                  </label>
                  <input
                    type="text"
                    value={companyData.posisiLowongan}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        posisiLowongan: e.target.value,
                      })
                    }
                    placeholder="Contoh: Software Engineer"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col sm:col-span-2">
                  <label className="text-xs font-bold text-secondary">
                    Sumber Lowongan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={companyData.sumberLowongan}
                    onChange={(e) =>
                      setCompanyData({
                        ...companyData,
                        sumberLowongan: e.target.value,
                      })
                    }
                    placeholder="Contoh: portal LinkedIn / informasi teman"
                    className="w-full h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#4A7C59] transition-colors font-body text-sm"
                  />
                  <p className="text-[10px] text-secondary/60">
                    Biarkan kosong jika tidak ingin mencantumkan sumber loker di
                    paragraf pembuka.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TAB 3: Completeness */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("completeness")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9C4A2A]/10 flex items-center justify-center">
                <Files className="w-5 h-5 text-[#9C4A2A]" />
              </div>
              <span className="font-bold font-ui text-primary">
                3. Berkas & Lampiran
              </span>
            </div>
            {activeTab === "completeness" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "completeness" && (
            <div className="p-4 sm:p-5 border-t border-muted space-y-4">
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-secondary">
                  Tanggal Surat *
                </label>
                <input
                  type="date"
                  value={completeness.tanggalLamaran}
                  onChange={(e) =>
                    setCompleteness({
                      ...completeness,
                      tanggalLamaran: e.target.value,
                    })
                  }
                  className="w-full sm:w-1/2 h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#9C4A2A] transition-colors font-body text-sm"
                />
              </div>

              <div className="space-y-3 pt-2 flex flex-col">
                <label className="text-xs font-bold text-secondary">
                  Pilih Lampiran yang Disertakan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LAMPIRAN_OPTIONS.map((item) => {
                    const isChecked = completeness.lampiran.includes(
                      item.value,
                    );
                    return (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 p-3 bg-surface/30 border border-muted rounded-xl cursor-pointer hover:bg-surface transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleLampiranToggle(item.value)}
                          className="w-5 h-5 rounded border-muted text-[#9C4A2A] focus:ring-[#9C4A2A]"
                        />
                        <span className="text-sm font-body text-primary">
                          {item.label}
                        </span>
                      </label>
                    );
                  })}

                  {completeness.lampiran
                    .filter(
                      (val) =>
                        !LAMPIRAN_OPTIONS.find((opt) => opt.value === val),
                    )
                    .map((val) => (
                      <label
                        key={val}
                        className="flex items-center gap-3 p-3 bg-surface border border-[#9C4A2A]/30 rounded-xl cursor-pointer hover:bg-surface/80 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => handleLampiranToggle(val)}
                          className="w-5 h-5 rounded border-muted text-[#9C4A2A] focus:ring-[#9C4A2A]"
                        />
                        <span className="text-sm font-body text-primary">
                          {val}
                        </span>
                      </label>
                    ))}
                </div>

                <div className="mt-2 pt-4 border-t border-muted/50 space-y-2">
                  <label className="text-xs font-bold text-secondary">
                    Tambah Lampiran Lainnya:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 h-11 bg-white border border-muted rounded-xl px-3 outline-none focus:border-[#9C4A2A] transition-colors font-body text-sm"
                      placeholder="Contoh: Sertifikat Lomba (lalu Enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val && !completeness.lampiran.includes(val)) {
                            handleLampiranToggle(val);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 bg-[#9C4A2A] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#80381d] transition-colors"
                      onClick={(e) => {
                        const input = e.currentTarget
                          .previousElementSibling as HTMLInputElement;
                        const val = input.value.trim();
                        if (val && !completeness.lampiran.includes(val)) {
                          handleLampiranToggle(val);
                          input.value = "";
                        }
                      }}
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TAB 4: Document Settings */}
        <div className="border border-muted rounded-[1.5rem] overflow-hidden bg-white">
          <button
            onClick={() => toggleTab("settings")}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface/30 hover:bg-surface/60 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7A5C42]/10 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-[#7A5C42]" />
              </div>
              <span className="font-bold font-ui text-primary">
                4. Pengaturan Layout Surat
              </span>
            </div>
            {activeTab === "settings" ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </button>

          {activeTab === "settings" && (
            <div className="p-4 sm:p-5 border-t border-muted bg-surface/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Ukuran Kertas
                  </label>
                  <select
                    value={settings.paperSize}
                    onChange={(e) =>
                      setSettings({ ...settings, paperSize: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {PAPER_SIZES.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Jenis Font
                  </label>
                  <select
                    value={settings.font}
                    onChange={(e) =>
                      setSettings({ ...settings, font: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {FONTS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Ukuran Font
                  </label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) =>
                      setSettings({ ...settings, fontSize: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {FONT_SIZES.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Jarak Baris (Spasi)
                  </label>
                  <select
                    value={settings.lineHeight}
                    onChange={(e) =>
                      setSettings({ ...settings, lineHeight: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {LINE_HEIGHTS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Rata Paragraf
                  </label>
                  <select
                    value={settings.alignment}
                    onChange={(e) =>
                      setSettings({ ...settings, alignment: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {ALIGNMENTS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Paragraf Menjorok
                  </label>
                  <select
                    value={settings.indentation}
                    onChange={(e) =>
                      setSettings({ ...settings, indentation: e.target.value })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {INDENTATIONS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Posisi Tanggal
                  </label>
                  <select
                    value={settings.datePlacement}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        datePlacement: e.target.value,
                      })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {DATE_PLACEMENTS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                    Posisi Tanda Tangan
                  </label>
                  <select
                    value={settings.signaturePlacement}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        signaturePlacement: e.target.value,
                      })
                    }
                    className="w-full h-10 bg-white border border-muted rounded-lg px-2 outline-none text-sm font-body"
                  >
                    {SIGNATURE_PLACEMENTS.map((opt) => (
                      <option key={opt.label} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-muted relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-secondary/70 flex-1 font-body">
          * Data bersifat pribadi dan hanya disimpan secara lokal di browser
          Anda. Tidak dikirim ke server.
        </p>
        <button
          onClick={clearData}
          className="flex items-center gap-2 text-xs font-bold font-ui text-[#9C4A2A] bg-[#9C4A2A]/10 hover:bg-[#9C4A2A]/20 transition-colors px-4 py-2 rounded-xl shrink-0"
        >
          <Trash2 className="w-4 h-4" /> Reset Form
        </button>
      </div>
    </Card>
  );
};
