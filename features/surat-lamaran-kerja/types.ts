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
