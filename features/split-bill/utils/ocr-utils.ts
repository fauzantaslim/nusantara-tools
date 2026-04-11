import Tesseract from "tesseract.js";
import { ReceiptItem } from "../types";

export const parseReceiptImage = async (
  imageFile: File,
  onProgress?: (progress: number) => void,
): Promise<ReceiptItem[]> => {
  try {
    // Use ind+eng for better digit / mixed-text recognition
    const worker = await Tesseract.createWorker("ind+eng", 1, {
      logger: (m) => {
        if (m.status === "recognizing text" && onProgress) {
          onProgress(m.progress);
        }
      },
    });

    const ret = await worker.recognize(imageFile);
    await worker.terminate();

    const data = ret.data as unknown as {
      lines?: { text: string }[];
      text: string;
    };
    const linesArray = data.lines
      ? data.lines.map((l) => l.text)
      : data.text
        ? data.text.split("\n")
        : [];

    const items = parseLines(linesArray);
    if (items.length === 0) {
      throw new Error("No items detected");
    }
    return items;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Tidak dapat mendeteksi item. Silakan input manual.");
  }
};

// ── helpers ───────────────────────────────────────────────────────────────

const cleanLine = (l: string) =>
  l
    .trim()
    // Remove leading/trailing line-art characters
    .replace(/^[-=_*|»«>]+|[-=_*|»«>]+$/g, "")
    // Remove em-dash / en-dash at end (OCR artifact when total column is empty)
    .replace(/[-—–]\s*$/, "")
    .trim();

/**
 * Matches a valid price at the END of a line.
 * Allows digits, dots, commas (thousands separators in IDR).
 * The price must be at least 3 chars (e.g. "500").
 */
const INLINE_PRICE_RE = /(?:Rp\.?\s*)?([\d][\d.,]{2,})\s*$/i;

/**
 * Standalone price line: only Rp/digits/punctuation, nothing else meaningful.
 * e.g. "Rp 13.500" or "13500" or "13,500"
 */
const STANDALONE_PRICE_RE = /^(?:Rp\.?\s*)?([\d][\d.,]*)\s*$/i;

/**
 * OCR artefact: price split, e.g. Indomaret prints "20,900" but OCR reads "20'"
 * meaning the comma became an apostrophe and "900" is on the next line.
 * Detect: line ends with  <digits><apostrophe/comma>  OR  <digits><quote>
 */
const TRUNCATED_PRICE_RE = /\d[',]\s*$/;

/** Words/patterns that identify non-item lines */
const NON_ITEM_KEYWORDS = [
  // Totals / payment
  "total",
  "tunai",
  "pembayaran",
  "payment",
  "cash",
  "subtotal",
  "harga jual",
  "harga:",
  "voucher",
  "diskon",
  // Taxes / service
  "tax",
  "ppn",
  "pajak",
  "service",
  "admin",
  "biaya",
  // Change / cancel / info
  "kembali",
  "change",
  "cancel",
  "batal",
  // Addresses & infrastructure
  "jl.",
  "jalan ",
  "rt ",
  "rw ",
  "kel.",
  "kec.",
  "kota ",
  "npwp",
  "siup",
  "no. izin",
  "besi jang",
  "ancol",
  "jakarta",
  "sleman",
  "ngaglik",
  "sukoharjo",
  "yogyakarta",
  "bekasi",
  // Banks / payment methods
  "card",
  "debit",
  "kredit",
  "bca",
  "mandiri",
  "bni",
  "bri",
  "gopay",
  "ovo",
  "dana",
  "qris",
  // Generic store footer
  "thank",
  "please",
  "www.",
  "http",
  "pos",
  "ruko",
  "check no",
  "check#",
  "closed",
  "boulevard",
  "summarecon",
];

const shouldSkip = (lower: string) =>
  NON_ITEM_KEYWORDS.some((kw) => lower.includes(kw)) ||
  /\d{2}:\d{2}:\d{2}/.test(lower) || // timestamp HH:MM:SS
  /^\d{1,2}[./\-]\d{1,2}[./\-]\d{2,4}/.test(lower) || // date DD.MM.YY etc.
  /^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(lower) || // date starts w/ month
  /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{2}/i.test(lower);

/** Normalise price string to integer IDR */
const parsePrice = (raw: string): number | null => {
  const cleaned = raw
    .replace(/[,.]/g, "")
    .replace(/[Oo]/g, "0")
    .replace(/[Ss]/g, "5")
    .replace(/[lI|]/g, "1");
  const n = parseInt(cleaned, 10);
  // Plausible IDR range: 100 – 100,000,000
  return isNaN(n) || n < 100 || n > 100_000_000 ? null : n;
};

/** Strip leading quantity prefix "1 " / "2x " / "1x" */
const stripQty = (name: string) => name.replace(/^\d+\s*[xX]?\s*/, "").trim();

// ── two-pass parser ───────────────────────────────────────────────────────

const parseLines = (rawLines: string[]): ReceiptItem[] => {
  const items: ReceiptItem[] = [];

  const cleaned = rawLines.map(cleanLine).filter((l) => l.length >= 3);

  // ── Pass 1: merge adjacent lines ─────────────────────────────────────
  // Case A: "1 ItemName" on one line, "13.500" / "Rp 13.500" on next  (BreadTalk style)
  // Case B: "ItemName 1 20900 20'"  → next line has the rest "900"     (Indomaret split)
  // Case C: line ends with em-dash or is otherwise price-less           (merge with standalone next)
  const merged: string[] = [];
  let i = 0;

  while (i < cleaned.length) {
    const cur = cleaned[i];
    const next = cleaned[i + 1] ?? "";

    const curLower = cur.toLowerCase();
    const nextLower = next.toLowerCase();

    // Always skip header/footer regardless of merging
    if (shouldSkip(curLower)) {
      i++;
      continue;
    }

    const curHasInlinePrice = INLINE_PRICE_RE.test(cur);
    const nextIsStandalonePrice =
      STANDALONE_PRICE_RE.test(next) && !shouldSkip(nextLower);
    const curTruncated = TRUNCATED_PRICE_RE.test(cur); // ends with "20'" etc.

    if (curTruncated) {
      // The price got split across two lines by OCR.
      // Strip the trailing apostrophe/comma and concatenate next line.
      const fixedCur = cur.replace(/[',]\s*$/, "").trim();
      merged.push(`${fixedCur}${next}`);
      i += 2;
    } else if (!curHasInlinePrice && nextIsStandalonePrice) {
      // Name on cur, price on next (BreadTalk style or address+zip split)
      merged.push(`${cur} ${next}`);
      i += 2;
    } else {
      merged.push(cur);
      i++;
    }
  }

  // ── Pass 2: extract item + price ─────────────────────────────────────
  for (const line of merged) {
    const lower = line.toLowerCase();
    if (shouldSkip(lower)) continue;
    if (line.length < 4) continue;

    const match = line.match(INLINE_PRICE_RE);
    if (!match) continue;

    const price = parsePrice(match[1]);
    if (price === null) continue;

    // Name = everything before the matched price token
    const rawName = line.slice(0, line.lastIndexOf(match[0])).trim();
    const name = stripQty(rawName);

    if (name.length > 1) {
      items.push({ id: crypto.randomUUID(), name, price, assignedTo: [] });
    }
  }

  return items;
};
