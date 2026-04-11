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

export interface GeneratorResultProps {
  value: string;
  entropy: number;
  strength: StrengthLevel;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isCopied: boolean;
  copyToClipboard: (text?: string) => void;
  generate: () => void;
}
