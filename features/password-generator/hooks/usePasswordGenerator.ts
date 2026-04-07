import { useState, useCallback, useEffect } from "react";
import {
  GeneratorMode,
  PasswordOptions,
  PassphraseOptions,
  generatePassword,
  generatePassphrase,
  calculateEntropy,
  StrengthLevel,
  getStrengthLevel,
} from "../utils";

export const usePasswordGenerator = () => {
  const [mode, setMode] = useState<GeneratorMode>("password");
  const [generatedValue, setGeneratedValue] = useState("");
  const [entropy, setEntropy] = useState(0);
  const [strength, setStrength] = useState<StrengthLevel>("Weak");

  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [passphraseOptions, setPassphraseOptions] = useState<PassphraseOptions>(
    {
      wordCount: 4,
      separator: "-",
      capitalize: false,
      includeNumber: true,
    },
  );

  const [isCopied, setIsCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const generate = useCallback(() => {
    let result = "";
    let currentEntropy = 0;

    if (mode === "password") {
      // Ensure at least one option is checked
      if (
        !passwordOptions.uppercase &&
        !passwordOptions.lowercase &&
        !passwordOptions.numbers &&
        !passwordOptions.symbols
      ) {
        setPasswordOptions((prev) => ({ ...prev, lowercase: true }));
        return;
      }
      result = generatePassword(passwordOptions);
      currentEntropy = calculateEntropy(result, mode, passwordOptions);
    } else {
      result = generatePassphrase(passphraseOptions);
      currentEntropy = calculateEntropy(result, mode, passphraseOptions);
    }

    setGeneratedValue(result);
    setEntropy(currentEntropy);
    setStrength(getStrengthLevel(currentEntropy));
    setIsCopied(false);
  }, [mode, passwordOptions, passphraseOptions]);

  // We will auto generate on options change but avoid triggering loops.
  useEffect(() => {
    generate();
  }, [mode, passwordOptions, passphraseOptions, generate]);

  const copyToClipboard = useCallback(
    async (textToCopy?: string) => {
      const text = textToCopy || generatedValue;
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy password", err);
      }
    },
    [generatedValue],
  );

  return {
    mode,
    setMode,
    generatedValue,
    entropy,
    strength,
    passwordOptions,
    setPasswordOptions,
    passphraseOptions,
    setPassphraseOptions,
    isCopied,
    copyToClipboard,
    generate,
    showPassword,
    setShowPassword,
  };
};
