export type GeneratorMode = "password" | "passphrase";

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export interface PassphraseOptions {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
}

export type StrengthLevel = "Weak" | "Medium" | "Strong" | "Very Strong";

// Curated small list of common Indonesian and English words for Passphrase
// This helps generate memorable but random phrases.
const WORDLIST = [
  "langit",
  "bintang",
  "kuda",
  "hijau",
  "merah",
  "api",
  "air",
  "angin",
  "tanah",
  "batu",
  "gunung",
  "laut",
  "awan",
  "hujan",
  "badai",
  "petir",
  "cerah",
  "gelap",
  "terang",
  "hitam",
  "putih",
  "biru",
  "kuning",
  "ungu",
  "naga",
  "harimau",
  "elang",
  "singa",
  "gajah",
  "pohon",
  "daun",
  "bunga",
  "akar",
  "ranting",
  "hutan",
  "sungai",
  "danau",
  "pantai",
  "ombak",
  "pasir",
  "karang",
  "ikan",
  "paus",
  "hiu",
  "kura",
  "penyu",
  "burung",
  "kucing",
  "anjing",
  "beruang",
  "serigala",
  "rubah",
  "kelinci",
  "rusa",
  "kancil",
  "harimau",
  "macan",
  "zebra",
  "jerapah",
  "kuda",
  "apel",
  "mangga",
  "jeruk",
  "pisang",
  "anggur",
  "melon",
  "semangka",
  "nanas",
  "pepaya",
  "durian",
  "kopi",
  "teh",
  "susu",
  "sirup",
  "madu",
  "gula",
  "garam",
  "merica",
  "cabai",
  "bawang",
  "meja",
  "kursi",
  "pintu",
  "jendela",
  "atap",
  "lantai",
  "kaca",
  "jam",
  "lampu",
  "kipas",
  "buku",
  "pena",
  "pensil",
  "kertas",
  "tas",
  "sepatu",
  "baju",
  "celana",
  "topi",
  "sabuk",
  "mobil",
  "motor",
  "sepeda",
  "kereta",
  "bus",
  "kapal",
  "perahu",
  "pesawat",
  "roket",
  "balon",
  "pedang",
  "panah",
  "tombak",
  "perisai",
  "baju besi",
  "helm",
  "sarung",
  "cincin",
  "kalung",
  "gelang",
  "emas",
  "perak",
  "besi",
  "baja",
  "tembaga",
  "perunggu",
  "berlian",
  "zamrud",
  "safir",
  "rubi",
  "matahari",
  "bulan",
  "planet",
  "bintang",
  "galaksi",
  "komet",
  "meteor",
  "asteroid",
  "nebula",
  "kosmos",
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
  "minggu",
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
  "hari",
  "mimpi",
  "tidur",
  "bangun",
  "pagi",
  "siang",
  "sore",
  "malam",
  "waktu",
  "jam",
  "menit",
  "detik",
  "abad",
  "tahun",
  "bulan",
  "minggu",
  "hari",
  "sekarang",
  "dulu",
  "nanti",
  "sebentar",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
  "sepuluh",
  "merdeka",
  "bebas",
  "damai",
  "cinta",
  "kasih",
  "sayang",
  "harapan",
  "impian",
  "cita",
  "sukses",
];

// Cryptographically secure random integer
const getRandomInt = (min: number, max: number): number => {
  if (typeof window === "undefined")
    return Math.floor(Math.random() * (max - min)) + min;
  const range = max - min;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxValue = Math.pow(256, bytesNeeded);
  const randomBytes = new Uint8Array(bytesNeeded);
  let randomValue;
  do {
    crypto.getRandomValues(randomBytes);
    randomValue = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = (randomValue << 8) + randomBytes[i];
    }
  } while (randomValue >= maxValue - (maxValue % range));
  return min + (randomValue % range);
};

export const generatePassword = (options: PasswordOptions): string => {
  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
  };

  let charPool = "";
  let requiredChars = [];

  if (options.uppercase) {
    charPool += chars.uppercase;
    requiredChars.push(
      chars.uppercase[getRandomInt(0, chars.uppercase.length)],
    );
  }
  if (options.lowercase) {
    charPool += chars.lowercase;
    requiredChars.push(
      chars.lowercase[getRandomInt(0, chars.lowercase.length)],
    );
  }
  if (options.numbers) {
    charPool += chars.numbers;
    requiredChars.push(chars.numbers[getRandomInt(0, chars.numbers.length)]);
  }
  if (options.symbols) {
    charPool += chars.symbols;
    requiredChars.push(chars.symbols[getRandomInt(0, chars.symbols.length)]);
  }

  // Fallback if nothing selected (should be blocked by UI, but safe here)
  if (charPool === "") {
    charPool = chars.lowercase;
    requiredChars.push(
      chars.lowercase[getRandomInt(0, chars.lowercase.length)],
    );
  }

  let result = requiredChars.join("");

  // Fill the rest
  for (let i = requiredChars.length; i < options.length; i++) {
    result += charPool[getRandomInt(0, charPool.length)];
  }

  // Shuffle the result so required chars aren't always at the beginning
  const resultArray = result.split("");
  for (let i = resultArray.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i + 1);
    [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }

  return resultArray.join("");
};

export const generatePassphrase = (options: PassphraseOptions): string => {
  const words: string[] = [];

  for (let i = 0; i < options.wordCount; i++) {
    let word = WORDLIST[getRandomInt(0, WORDLIST.length)];
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    words.push(word);
  }

  let finalPhrase = words.join(options.separator);

  if (options.includeNumber) {
    const randomDigit = getRandomInt(0, 10).toString();
    finalPhrase += options.separator + randomDigit;
  }

  return finalPhrase;
};

// Entropy calculation
// Password: E = L * log2(R)
// Passphrase: E = W * log2(N)
export const calculateEntropy = (
  value: string,
  mode: GeneratorMode,
  options?: PasswordOptions | PassphraseOptions,
): number => {
  let entropy = 0;

  if (mode === "password") {
    const opt = options as PasswordOptions;
    let poolSize = 0;
    if (opt?.uppercase) poolSize += 26;
    if (opt?.lowercase) poolSize += 26;
    if (opt?.numbers) poolSize += 10;
    if (opt?.symbols) poolSize += 8;

    // Fallback if we don't have options
    if (poolSize === 0) {
      poolSize = 94; // Assume all standard ascii
    }

    entropy = value.length * Math.log2(poolSize);
  } else {
    // Passphrase
    const opt = options as PassphraseOptions;
    const wordCount = opt?.wordCount || value.split("-").length;
    let baseEntropy = wordCount * Math.log2(WORDLIST.length);

    if (opt?.capitalize) baseEntropy += wordCount; // 1 extra bit per word for capitalization
    if (opt?.includeNumber) baseEntropy += Math.log2(10); // extra entropy for 1 digit

    entropy = baseEntropy;
  }

  return Math.round(entropy);
};

export const getStrengthLevel = (entropy: number): StrengthLevel => {
  if (entropy < 40) return "Weak";
  if (entropy < 60) return "Medium";
  if (entropy < 80) return "Strong";
  return "Very Strong";
};

export const getStrengthColor = (level: StrengthLevel): string => {
  switch (level) {
    case "Weak":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Strong":
      return "bg-green-500";
    case "Very Strong":
      return "bg-emerald-400"; // more intense green/cyan
    default:
      return "bg-gray-300";
  }
};
