import { useState, useCallback, useMemo } from "react";
import {
  generatePassword,
  generatePassphrase,
  calculateEntropy,
  getStrengthLevel,
} from "../utils";
import {
  GeneratorMode,
  PasswordOptions,
  PassphraseOptions,
  StrengthLevel,
} from "../types";

export const usePasswordGenerator = () => {
  const [mode, setMode] = useState<GeneratorMode>("password");
  const [refreshCount, setRefreshCount] = useState(0);
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

  const { generatedValue, entropy, strength } = useMemo(() => {
    let result = "";
    let currentEntropy = 0;

    if (mode === "password") {
      // Ensure at least one option is checked (side effect in memo is not ideal, but we'll stick to logic here)
      const hasOptions =
        passwordOptions.uppercase ||
        passwordOptions.lowercase ||
        passwordOptions.numbers ||
        passwordOptions.symbols;

      if (!hasOptions) {
        // We'll return a basic result if no options, but avoid setState here.
        // The UI should prevent this.
        return {
          generatedValue: "",
          entropy: 0,
          strength: "Weak" as StrengthLevel,
        };
      }

      result = generatePassword(passwordOptions);
      currentEntropy = calculateEntropy(result, mode, passwordOptions);
    } else {
      result = generatePassphrase(passphraseOptions);
      currentEntropy = calculateEntropy(result, mode, passphraseOptions);
    }

    return {
      generatedValue: result,
      entropy: currentEntropy,
      strength: getStrengthLevel(currentEntropy),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, passwordOptions, passphraseOptions, refreshCount]);

  const generate = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
    setIsCopied(false);
  }, []);

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
