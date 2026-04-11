/**
 * URL paths for sitemap only — no React / lucide imports.
 * Order matches lib/data.ts (Set iteration = insertion order); __tests__/unit/sitemap-routes.test.ts guards drift.
 */
function pathSet(...paths: string[]): Set<string> {
  return new Set(paths);
}

export const SITEMAP_STATIC_PATHS = pathSet(
  "",
  "/tentang",
  "/kontak",
  "/kebijakan-privasi",
  "/syarat-ketentuan",
);

export const SITEMAP_CATEGORY_PATHS = pathSet(
  "/kesehatan",
  "/finansial",
  "/religi",
  "/produktivitas",
  "/utilitas",
);

export const SITEMAP_TOOL_PATHS = pathSet(
  "/kesehatan/bmi",
  "/kesehatan/masa-subur",
  "/kesehatan/kalori",
  "/kesehatan/air",
  "/kesehatan/tidur",
  "/kesehatan/1rm",
  "/kesehatan/kafein",
  "/kesehatan/kehamilan",
  "/kesehatan/grafik-bayi",
  "/kesehatan/tekanan-darah",
  "/kesehatan/diabetes",
  "/religi/sholat",
  "/religi/zakat",
  "/religi/hijriyah",
  "/finansial/depresiasi",
  "/finansial/lembur",
  "/finansial/pensiun",
  "/finansial/split-bill",
  "/finansial/pernikahan",
  "/finansial/cicilan-kendaraan",
  "/finansial/dana-darurat",
  "/finansial/margin",
  "/produktivitas/cv",
  "/produktivitas/surat-lamaran-kerja",
  "/produktivitas/pomodoro",
  "/utilitas/url-shortener",
  "/utilitas/qr-generator",
  "/utilitas/password-generator",
);
