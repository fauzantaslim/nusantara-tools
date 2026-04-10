import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { Select } from "@/ui/Select";
import {
  ArrowRight,
  ShieldAlert,
  Activity,
  RefreshCw,
  Calculator,
} from "lucide-react";
import {
  DiabetesContextType,
  Gender,
  AgeRange,
  BMICategory,
  WaistMale,
  WaistFemale,
  FamilyHistory,
  AGE_RANGE,
  BMI_CATEGORY,
  WAIST_MALE,
  WAIST_FEMALE,
  FAMILY_HISTORY,
  GENDER,
} from "../types";

const SectionHead: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 mt-2 -mb-1">
    <div className="h-px flex-1 bg-muted/60" />
    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest shrink-0 opacity-70">
      {label}
    </span>
    <div className="h-px flex-1 bg-muted/60" />
  </div>
);

export const DiabetesForm: React.FC<{ hook: DiabetesContextType }> = ({
  hook,
}) => {
  const {
    data,
    updateData,
    error,
    handleCalculate,
    handleReset,
    handleBMICalc,
  } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-5 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#C17A3A]" /> Data Kesehatan
        </h2>
        <p className="text-sm text-secondary font-body mt-2">
          Berdasarkan skor FINDRISC — alat skrining diabetes yang divalidasi
          WHO.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-5 relative z-10 h-full"
      >
        <SectionHead label="Informasi Pribadi" />

        <SegmentedControl
          label="Jenis Kelamin"
          value={data.gender}
          onChange={(v) => updateData("gender", v as Gender)}
          options={[
            { value: GENDER.MALE, label: "♂ Laki-laki" },
            { value: GENDER.FEMALE, label: "♀ Perempuan" },
          ]}
        />

        <Select<AgeRange>
          label="Rentang Usia"
          value={data.ageRange}
          onChange={(v) => updateData("ageRange", v)}
          options={[
            { value: AGE_RANGE.LT45, label: "Di bawah 45 tahun" },
            { value: AGE_RANGE.RANGE_45_54, label: "45–54 tahun" },
            { value: AGE_RANGE.RANGE_55_64, label: "55–64 tahun" },
            { value: AGE_RANGE.GTE65, label: "65 tahun ke atas" },
          ]}
        />

        <SectionHead label="Pengukuran Tubuh" />

        <Select<BMICategory>
          label="Indeks Massa Tubuh (IMT / BMI)"
          value={data.bmiCategory}
          onChange={(v) => updateData("bmiCategory", v)}
          options={[
            { value: BMI_CATEGORY.LT25, label: "Kurang dari 25 kg/m²" },
            { value: BMI_CATEGORY.RANGE_25_30, label: "25–30 kg/m²" },
            { value: BMI_CATEGORY.GT30, label: "Lebih dari 30 kg/m²" },
          ]}
        />

        <button
          type="button"
          onClick={() => updateData("showBMICalc", !data.showBMICalc)}
          className="flex items-center gap-2 text-xs font-bold text-[#C17A3A] hover:text-[#9C4A2A] transition -mt-2"
        >
          <Calculator className="w-3.5 h-3.5" />
          {data.showBMICalc
            ? "Sembunyikan kalkulator BMI"
            : "Hitung BMI saya otomatis"}
        </button>

        {data.showBMICalc && (
          <div className="bg-surface rounded-2xl border border-muted/50 p-4 -mt-2 space-y-3">
            <div className="flex gap-3">
              <Input
                id="hcm"
                label="Tinggi"
                type="number"
                placeholder="170"
                suffix="cm"
                value={data.heightCm}
                onChange={(e) => updateData("heightCm", e.target.value)}
                className="py-2.5 rounded-xl flex-1"
                min={100}
                max={250}
              />
              <Input
                id="wkg"
                label="Berat"
                type="number"
                placeholder="70"
                suffix="kg"
                value={data.weightKg}
                onChange={(e) => updateData("weightKg", e.target.value)}
                className="py-2.5 rounded-xl flex-1"
                min={20}
                max={300}
              />
            </div>
            <button
              type="button"
              onClick={handleBMICalc}
              className="w-full py-2.5 rounded-xl bg-[#C17A3A] text-[#FFF8F0] text-sm font-bold font-ui hover:bg-[#9C4A2A] transition outline-none ring-0"
            >
              Hitung & Terapkan BMI
            </button>
            {data.calcedBMI && (
              <p className="text-xs text-center text-[#4A7C59] font-bold">
                BMI Anda: {data.calcedBMI} kg/m² → Kategori diterapkan otomatis
                ✓
              </p>
            )}
          </div>
        )}

        {data.gender === GENDER.MALE ? (
          <Select<WaistMale>
            label="Lingkar Pinggang (Pria)"
            value={data.waistMale}
            onChange={(v) => updateData("waistMale", v)}
            options={[
              {
                value: WAIST_MALE.LT94,
                label: "Kurang dari 94 cm (< 37 inci)",
              },
              {
                value: WAIST_MALE.RANGE_94_102,
                label: "94–102 cm (37–40 inci)",
              },
              {
                value: WAIST_MALE.GT102,
                label: "Lebih dari 102 cm (> 40 inci)",
              },
            ]}
          />
        ) : (
          <Select<WaistFemale>
            label="Lingkar Pinggang (Wanita)"
            value={data.waistFemale}
            onChange={(v) => updateData("waistFemale", v)}
            options={[
              {
                value: WAIST_FEMALE.LT80,
                label: "Kurang dari 80 cm (< 32 inci)",
              },
              {
                value: WAIST_FEMALE.RANGE_80_88,
                label: "80–88 cm (32–35 inci)",
              },
              {
                value: WAIST_FEMALE.GT88,
                label: "Lebih dari 88 cm (> 35 inci)",
              },
            ]}
          />
        )}

        <SectionHead label="Gaya Hidup & Medis" />

        <SegmentedControl
          label="Aktivitas Fisik ≥ 30 Menit Sehari"
          value={data.physicalActivity ? "ya" : "tidak"}
          onChange={(v) => updateData("physicalActivity", v === "ya")}
          options={[
            { value: "ya", label: "Ya, rutin" },
            { value: "tidak", label: "Tidak / Jarang" },
          ]}
        />

        <SegmentedControl
          label="Konsumsi Sayur & Buah Setiap Hari"
          value={data.eatsVegetables ? "ya" : "tidak"}
          onChange={(v) => updateData("eatsVegetables", v === "ya")}
          options={[
            { value: "ya", label: "Hampir setiap hari" },
            { value: "tidak", label: "Tidak rutin" },
          ]}
        />

        <div className="grid grid-cols-2 gap-4">
          <SegmentedControl
            label="Obat Darah Tinggi"
            value={data.bpMedication ? "ya" : "tidak"}
            onChange={(v) => updateData("bpMedication", v === "ya")}
            options={[
              { value: "ya", label: "Ya" },
              { value: "tidak", label: "Tidak" },
            ]}
          />
          <SegmentedControl
            label="Pernah Gula Darah Tinggi"
            value={data.highBloodGlucoseHistory ? "ya" : "tidak"}
            onChange={(v) => updateData("highBloodGlucoseHistory", v === "ya")}
            options={[
              { value: "ya", label: "Ya" },
              { value: "tidak", label: "Tidak" },
            ]}
          />
        </div>

        <Select<FamilyHistory>
          label="Riwayat Keluarga Diabetes"
          value={data.familyHistory}
          onChange={(v) => updateData("familyHistory", v)}
          options={[
            { value: FAMILY_HISTORY.NONE, label: "Tidak ada" },
            {
              value: FAMILY_HISTORY.DISTANT,
              label: "Kakek/Nenek, Paman/Bibi, Sepupu",
            },
            {
              value: FAMILY_HISTORY.CLOSE,
              label: "Orang Tua, Saudara Kandung, Anak",
            },
          ]}
        />

        {error && (
          <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 rounded-2xl !bg-[#C17A3A] hover:!bg-[#9C4A2A] text-white outline-none ring-0 shadow-lg group font-ui"
          >
            Hitung Risiko
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
