import { PASSWORD_GENERATOR_WORDLIST, PASSWORD_CHARS } from "@/lib/constants";
import {
  GeneratorMode,
  PasswordOptions,
  PassphraseOptions,
  StrengthLevel,
} from "./types";

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
  let charPool = "";
  let requiredChars: string[] = [];

  if (options.uppercase) {
    charPool += PASSWORD_CHARS.uppercase;
    requiredChars.push(
      PASSWORD_CHARS.uppercase[
        getRandomInt(0, PASSWORD_CHARS.uppercase.length)
      ],
    );
  }
  if (options.lowercase) {
    charPool += PASSWORD_CHARS.lowercase;
    requiredChars.push(
      PASSWORD_CHARS.lowercase[
        getRandomInt(0, PASSWORD_CHARS.lowercase.length)
      ],
    );
  }
  if (options.numbers) {
    charPool += PASSWORD_CHARS.numbers;
    requiredChars.push(
      PASSWORD_CHARS.numbers[getRandomInt(0, PASSWORD_CHARS.numbers.length)],
    );
  }
  if (options.symbols) {
    charPool += PASSWORD_CHARS.symbols;
    requiredChars.push(
      PASSWORD_CHARS.symbols[getRandomInt(0, PASSWORD_CHARS.symbols.length)],
    );
  }

  // Fallback if nothing selected (should be blocked by UI, but safe here)
  if (charPool === "") {
    charPool = PASSWORD_CHARS.lowercase;
    requiredChars.push(
      PASSWORD_CHARS.lowercase[
        getRandomInt(0, PASSWORD_CHARS.lowercase.length)
      ],
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
    let word =
      PASSWORD_GENERATOR_WORDLIST[
        getRandomInt(0, PASSWORD_GENERATOR_WORDLIST.length)
      ];
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
    let baseEntropy = wordCount * Math.log2(PASSWORD_GENERATOR_WORDLIST.length);

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
