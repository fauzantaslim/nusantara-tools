export type VehicleType = "mobil" | "motor";

export interface CicilanInput {
  vehicleType: VehicleType;
  hargaKendaraan: number;
  uangMukaPercent: number;
  sukuBungaTahunan: number;
  tenor: number; // in months
}

export interface AmortizationRow {
  bulan: number;
  cicilan: number;
  porsiPokok: number;
  porsiBunga: number;
  sisaPinjaman: number;
}

export interface CicilanResult {
  isCalculated: boolean;
  hargaKendaraan: number;
  uangMuka: number;
  jumlahPinjaman: number;
  cicilanBulanan: number;
  totalPembayaran: number;
  totalBunga: number;
  sukuBungaBulanan: number;
  jadwal: AmortizationRow[];
}
