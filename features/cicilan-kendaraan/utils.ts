import { CicilanInput, CicilanResult, AmortizationRow } from "./types";

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateCicilan = (input: CicilanInput): CicilanResult => {
  const { hargaKendaraan, uangMukaPercent, sukuBungaTahunan, tenor } = input;

  const uangMuka = (uangMukaPercent / 100) * hargaKendaraan;
  const jumlahPinjaman = hargaKendaraan - uangMuka;
  const sukuBungaBulanan = sukuBungaTahunan / 100 / 12;

  let cicilanBulanan: number;

  // Edge case: 0% bunga
  if (sukuBungaBulanan === 0) {
    cicilanBulanan = jumlahPinjaman / tenor;
  } else {
    const pow = Math.pow(1 + sukuBungaBulanan, tenor);
    cicilanBulanan = (jumlahPinjaman * (sukuBungaBulanan * pow)) / (pow - 1);
  }

  const totalPembayaran = cicilanBulanan * tenor;
  const totalBunga = totalPembayaran - jumlahPinjaman;

  // Build amortization schedule
  const jadwal: AmortizationRow[] = [];
  let sisaPinjaman = jumlahPinjaman;

  for (let bulan = 1; bulan <= tenor; bulan++) {
    const porsiBunga = sisaPinjaman * sukuBungaBulanan;
    const porsiPokok = cicilanBulanan - porsiBunga;
    sisaPinjaman = Math.max(0, sisaPinjaman - porsiPokok);

    jadwal.push({
      bulan,
      cicilan: cicilanBulanan,
      porsiPokok,
      porsiBunga,
      sisaPinjaman,
    });
  }

  return {
    isCalculated: true,
    hargaKendaraan,
    uangMuka,
    jumlahPinjaman,
    cicilanBulanan,
    totalPembayaran,
    totalBunga,
    sukuBungaBulanan,
    jadwal,
  };
};

export const validateCicilan = (input: CicilanInput): string[] => {
  const errors: string[] = [];

  if (!input.hargaKendaraan || input.hargaKendaraan <= 0) {
    errors.push("Harga kendaraan harus lebih dari 0.");
  }
  if (input.uangMukaPercent < 0) {
    errors.push("Uang muka tidak boleh negatif.");
  }
  if (input.uangMukaPercent >= 100) {
    errors.push("Uang muka tidak boleh melebihi harga kendaraan (100%).");
  }
  if (input.sukuBungaTahunan < 0) {
    errors.push("Suku bunga tidak boleh negatif.");
  }
  if (!input.tenor || input.tenor < 1) {
    errors.push("Tenor minimal 1 bulan.");
  }
  if (input.tenor > 120) {
    errors.push("Tenor maksimal 120 bulan (10 tahun).");
  }

  return errors;
};

export const DP_GUIDANCE: Record<string, { min: number; label: string }> = {
  mobil: { min: 20, label: "Minimal DP Mobil: 20% (regulasi OJK)" },
  motor: { min: 0, label: "DP Motor: sesuai kebijakan lembaga pembiayaan" },
};
