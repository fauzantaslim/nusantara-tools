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
