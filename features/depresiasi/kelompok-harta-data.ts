export interface AssetGroupItem {
  no: number;
  jenisUsaha: string;
  jenisHarta: string[];
}

export interface AssetGroupData {
  id: string;
  title: string;
  subtitle: string;
  items: AssetGroupItem[];
}

export const KELOMPOK_HARTA_DATA: AssetGroupData[] = [
  {
    id: "kelompok-1",
    title: "Kelompok I",
    subtitle: "Masa manfaat 4 tahun — Tarif GL 25%, SM 50%",
    items: [
      {
        no: 1,
        jenisUsaha: "Semua jenis usaha",
        jenisHarta: [
          "Mebel dan peralatan dari kayu atau rotan termasuk meja, bangku, kursi, lemari dan sejenisnya yang bukan bagian dari bangunan.",
          "Mesin kantor untuk menunjang pekerjaan seperti mesin tik, mesin hitung, duplikator, mesin fotokopi, mesin akunting atau pembukuan, komputer, printer dan scanner.",
          "Perlengkapan lain seperti amplifier, tape cassette, video recorder, televisi dan sejenisnya.",
          "Sepeda motor, sepeda kayuh dan becak.",
          "Peralatan khusus untuk menunjang industri atau jasa yang dijalankan pemilik usaha.",
          "Peralatan dapur untuk memasak, makan dan minum karyawan.",
          "Dies, Jigs dan mould.",
          "Alat-alat komunikasi seperti telepon, fax, ponsel inventaris kantor dan sejenisnya.",
        ],
      },
      {
        no: 2,
        jenisUsaha:
          "Pertanian, perkebunan, kehutanan, peternakan dan perikanan",
        jenisHarta: [
          "Alat yang digerakkan oleh tenaga manusia, bukan oleh tenaga mesin. Contohnya cangkul, garu dan peralatan lainnya yang dijalankan oleh tenaga manusia.",
        ],
      },
      {
        no: 3,
        jenisUsaha: "Industri makanan dan minuman",
        jenisHarta: [
          "Mesin ringan yang dapat dipindahkan seperti hotel, pemecah kulit, penyosoh, pengering, pallet dan sejenisnya.",
        ],
      },
      {
        no: 4,
        jenisUsaha: "Transportasi dan pergudangan",
        jenisHarta: [
          "Taksi, bus dan truk yang digunakan sebagai angkutan umum.",
        ],
      },
      {
        no: 5,
        jenisUsaha: "Industri semi konduktor",
        jenisHarta: [
          "Flash memory tester, mesin tulis, biporar test system, elimination (PE8-1), pose checker.",
        ],
      },
      {
        no: 6,
        jenisUsaha: "Jasa persewaan peralatan tambat air dalam",
        jenisHarta: [
          "Anchor, anchor chain, polyester rope, steel buoys, steel wire ropes, morning accessories.",
        ],
      },
      {
        no: 7,
        jenisUsaha: "Jasa telekomunikasi selular",
        jenisHarta: ["Base Station Controller."],
      },
    ],
  },
  {
    id: "kelompok-2",
    title: "Kelompok II",
    subtitle: "Masa manfaat 8 tahun — Tarif GL 12,5%, SM 25%",
    items: [
      {
        no: 1,
        jenisUsaha: "Semua jenis usaha",
        jenisHarta: [
          "Mebel dan peralatan dari kayu atau rotan termasuk meja, bangku, kursi, lemari dan sejenisnya yang bukan bagian dari bangunan. Alat pendingin udara seperti AC, kipas angin dan sejenisnya.",
          "Mobil, bus, truk, perahu speed boat dan sejenisnya.",
          "Container dan sejenisnya.",
        ],
      },
      {
        no: 2,
        jenisUsaha: "Pertanian, perkebunan, peternakan, perikanan",
        jenisHarta: [
          "Mesin pertanian atau perkebunan seperti traktor dan mesin bajak, penggaruk, penanaman, penebaran benih dan sejenisnya.",
          "Mesin yang mengolah atau menghasilkan atau memproduksi bahan atau barang pertanian, perkebunan, peternakan dan perikanan.",
        ],
      },
      {
        no: 3,
        jenisUsaha: "Industri makanan dan minuman",
        jenisHarta: [
          "Mesin yang mengolah produk asal hewan, unggas dan perikanan. Contohnya, pabrik susu dan pengalengan ikan.",
          "Mesin yang mengolah produk nabati misalnya mesin minyak kelapa, margarin, penggilingan kopi, kembang gula, mesin pengolah biji-bijian seperti penggilingan beras, gandum dan tapioka.",
          "Mesin yang menghasilkan atau memproduksi minuman dan bahan-bahan minuman berbagai jenis.",
        ],
      },
      {
        no: 4,
        jenisUsaha: "Industri mesin",
        jenisHarta: [
          "Mesin yang menghasilkan atau memproduksi mesin ringan. Contohnya mesin jahit dan pompa air.",
        ],
      },
      {
        no: 5,
        jenisUsaha: "Perkayuan, kehutanan",
        jenisHarta: [
          "Mesin dan peralatan penebang kayu.",
          "Mesin yang mengolah atau menghasilkan atau memproduksi bahan atau barang kehutanan.",
        ],
      },
      {
        no: 6,
        jenisUsaha: "Konstruksi",
        jenisHarta: [
          "Peralatan yang dipergunakan seperti truk berat, dump truk, crane buldoser dan sejenisnya.",
        ],
      },
      {
        no: 7,
        jenisUsaha: "Transportasi dan pergudangan",
        jenisHarta: [
          "Truk kerja untuk pengangkutan dan bongkar muat, truk peron, truk ngangkang dan sejenisnya.",
          "Kapal penumpang, kapal barang, kapal khusus yang dibuat untuk pengangkutan barang tertentu, misalnya gandum, batu-batuan, bijih tambang dan sejenisnya. Termasuk pula kapal pendingin, kapal tangki, kapal penangkap ikan dan sejenisnya yang memiliki berat sampai 100 DWT.",
          "Kapal yang dibuat khusus untuk menghela atau mendorong kapal-kapal suar, kapal pemadam kebakaran, kapal keruk, keran terapung dan sejenisnya yang mempunyai berat sampai 100 DWT.",
          "Perahu layar yang menggunakan atau tanpa motor yang mempunyai berat sampai 250 DWT.",
          "Kapal balon.",
        ],
      },
      {
        no: 8,
        jenisUsaha: "Telekomunikasi",
        jenisHarta: [
          "Perangkat pesawat telepon.",
          "Pesawat telegraf termasuk pesawat pengiriman dan penerimaan radio telegraf dan radio telepon.",
        ],
      },
      {
        no: 9,
        jenisUsaha: "Industri semi konduktor",
        jenisHarta: [
          "Auto frame loader, automatic logic handler, baking oven, ball shear tester, bipolar test handler (automatic), cleaning machine, coating machine, curing oven, cutting press, dambar cut machine, dicer, die bonder, die shear test, dynamic burn-in system oven, dynamic test handler, eliminator (PGE-01), full automatic handler, full automatic mark, hand maker, individual mark, inserter remover machine, laser marker (FUM A-01), logic test system, marker (mark), memory test system, molding, mounter, MPS automatic, MPS manual, O/S tester manual, pass oven, pose checker, re-form machine, SMD stocker, taping machine, tie bar cut press, trimming/forming machine, wire bonder, wire pull tester.",
        ],
      },
      {
        no: 10,
        jenisUsaha: "Jasa penyewaan peralatan tambat air dalam",
        jenisHarta: ["Spooling machines, metocean data collector."],
      },
      {
        no: 11,
        jenisUsaha: "Jasa telekomunikasi selular",
        jenisHarta: [
          "Mobile switching center, home location register, visitor location register, authentication center, equipment identity register, intelligent network service control point, intelligent network service management point, radio base station, transceiver unit, terminal SDH/mini link, antena.",
        ],
      },
    ],
  },
  {
    id: "kelompok-3",
    title: "Kelompok III",
    subtitle: "Masa manfaat 16 tahun — Tarif GL 6,25%, SM 12,5%",
    items: [
      {
        no: 1,
        jenisUsaha: "Pertambangan selain minyak dan gas",
        jenisHarta: [
          "Mesin-mesin yang dipakai dalam bidang pertambangan, termasuk mesin-mesin yang mengolah produk pelikan.",
        ],
      },
      {
        no: 2,
        jenisUsaha: "Pemintalan, penenunan dan pencelupan",
        jenisHarta: [
          "Mesin yang mengolah atau menghasilkan produk-produk tekstil. Contohnya kain katun, sutra, serat-serat buatan, wol, bulu hewan, lena rami, permadani, kain-kain bulu dan tule.",
          "Mesin preparation, bleaching, dyeing, printing, finishing, texturing, packaging dan sejenisnya.",
        ],
      },
      {
        no: 3,
        jenisUsaha: "Perkayuan",
        jenisHarta: [
          "Mesin yang mengolah atau menghasilkan produk-produk kayu, barang-barang dari jerami, rumput dan bahan-bahan anyaman lainnya.",
          "Mesin dan peralatan penggergajian kayu.",
        ],
      },
      {
        no: 4,
        jenisUsaha: "Industri kimia",
        jenisHarta: [
          "Mesin peralatan yang mengolah atau menghasilkan produk industri kimia dan industri yang ada hubungannya dengan industri kimia.",
          "Mesin yang mengolah atau menghasilkan produk industri lainnya. Seperti damar tiruan, bahan plastik, ester dan eter dari selulosa, karet sintetis, karet tiruan, kulit samak, jangat dan kulit mentah.",
        ],
      },
      {
        no: 5,
        jenisUsaha: "Industri mesin",
        jenisHarta: [
          "Mesin yang menghasilkan atau memproduksi mesin menengah dan berat. Misalnya mesin mobil dan mesin kapal.",
        ],
      },
      {
        no: 6,
        jenisUsaha: "Transportasi dan pergudangan",
        jenisHarta: [
          "Kapal penumpang, kapal barang, kapal khusus yang dibuat untuk pengangkutan barang-barang tertentu, kapal pendingin, kapal tangki, kapal penangkap ikan dan sejenisnya yang mempunyai berat di atas 100 DWT sampai 1.000 DWT.",
          "Kapal yang dibuat khusus untuk mendorong kapal lain, kapal suar, kapal pemadam kebakaran, kapal keruk, keran terapung dan sejenisnya yang memiliki berat di atas 100 DWT sampai 1.000 DWT.",
          "Dok terapung.",
          "Perahu layar pakai atau tanpa motor yang mempunyai berat di atas 250 DWT.",
          "Pesawat terbang dan helikopter berbagai jenis.",
        ],
      },
      {
        no: 7,
        jenisUsaha: "Telekomunikasi",
        jenisHarta: ["Perangkat radio navigasi, radar dan kendali jarak jauh."],
      },
    ],
  },
  {
    id: "kelompok-4",
    title: "Kelompok IV",
    subtitle: "Masa manfaat 20 tahun — Tarif GL 5%, SM 10%",
    items: [
      {
        no: 1,
        jenisUsaha: "Konstruksi",
        jenisHarta: ["Mesin berat untuk konstruksi."],
      },
      {
        no: 2,
        jenisUsaha: "Transportasi dan pergudangan",
        jenisHarta: [
          "Lokomotif uap pada tender untuk rel.",
          "Lokomotif listrik atas rel, dijalankan dengan baterai atau dengan tenaga listrik dari sumber luar.",
          "Lokomotif atas rel lainnya.",
          "Kereta, gerbong, penumpang dan barang, termasuk kontainer khusus yang dibuat dan dilengkapi untuk ditarik dengan salah satu alat atau beberapa alat pengangkut.",
          "Kapal penumpang, kapal barang, kapal khusus yang dibuat untuk pengangkutan barang tertentu, yang beratnya di atas 1.000 DWT.",
          "Kapal yang dibuat khusus untuk menghela atau mendorong kapal, kapal suar, kapal pemadam kebakaran, kapal keruk, keran-keran terapung dan sebagainya yang mempunyai berat di atas 1.000 DWT.",
          "Dok-dok terapung.",
        ],
      },
    ],
  },
];
