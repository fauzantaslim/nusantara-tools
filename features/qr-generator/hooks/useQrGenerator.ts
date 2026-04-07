import { useState, useCallback, useMemo } from "react";
import {
  QrType,
  QrOptions,
  urlSchema,
  textSchema,
  emailSchema,
  phoneSchema,
  formatQrPayload,
} from "../utils";
import { z } from "zod";

interface InputData {
  url: string;
  text: string;
  email: string;
  subject: string;
  body: string;
  phone: string;
}

export const useQrGenerator = (initialUrl?: string) => {
  const [activeTab, setActiveTab] = useState<QrType>(
    initialUrl ? "url" : "url",
  );

  const [inputData, setInputData] = useState<InputData>({
    url: initialUrl || "",
    text: "",
    email: "",
    subject: "",
    body: "",
    phone: "",
  });

  const [options, setOptions] = useState<QrOptions>({
    fgColor: "#2C1A0E", // Default dark brown
    bgColor: "#ffffff",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Memoized derived payload based on the active tab and its data validation
  const qrPayload = useMemo(() => {
    let result = "";
    const activeData: Record<string, string> = {};
    let currentErrors: Record<string, string> = {};

    try {
      if (activeTab === "url") {
        if (inputData.url.length > 0) urlSchema.parse({ url: inputData.url });
        activeData.url = inputData.url;
      } else if (activeTab === "text") {
        if (inputData.text.length > 0)
          textSchema.parse({ text: inputData.text });
        activeData.text = inputData.text;
      } else if (activeTab === "email") {
        if (inputData.email.length > 0) {
          emailSchema.parse({
            email: inputData.email,
            subject: inputData.subject,
            body: inputData.body,
          });
        }
        activeData.email = inputData.email;
        activeData.subject = inputData.subject;
        activeData.body = inputData.body;
      } else if (activeTab === "phone") {
        if (inputData.phone.length > 0)
          phoneSchema.parse({ phone: inputData.phone });
        activeData.phone = inputData.phone;
      }

      result = formatQrPayload(activeTab, activeData);
    } catch (e) {
      if (e instanceof z.ZodError) {
        e.issues.forEach((issue) => {
          if (issue.path[0]) {
            currentErrors[issue.path[0].toString()] = issue.message;
          }
        });
      }
    }

    // Defer error state updates or handle gracefully. Let's just return result if no errors, but what about displaying errors?
    // It's better to calculate payload only if no errors, but we can't `setErrors` directly here without triggering a re-render infinitely.

    return { payload: result, localErrors: currentErrors };
  }, [activeTab, inputData]);

  const updateInput = useCallback((key: keyof InputData, value: string) => {
    setInputData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateOptions = useCallback((key: keyof QrOptions, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setInputData({
      url: "",
      text: "",
      email: "",
      subject: "",
      body: "",
      phone: "",
    });
    setOptions({ fgColor: "#2C1A0E", bgColor: "#ffffff" });
  }, []);

  const handleDownload = useCallback(
    (format: "png" | "svg") => {
      const svgElement = document.getElementById("qr-preview-svg");
      if (!svgElement) return;

      if (format === "svg") {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qrcode-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Draw SVG to Canvas, then download
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          // High res scale
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          if (ctx) {
            ctx.scale(2, 2);
            ctx.fillStyle = options.bgColor;
            ctx.fillRect(0, 0, img.width, img.height);
            ctx.drawImage(img, 0, 0);
          }
          const pngFile = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = pngFile;
          link.download = `qrcode-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        const svg64 = btoa(unescape(encodeURIComponent(svgData)));
        const b64Start = "data:image/svg+xml;base64,";
        const image64 = b64Start + svg64;
        img.src = image64;
      }
    },
    [options.bgColor],
  );

  return {
    activeTab,
    setActiveTab,
    inputData,
    updateInput,
    options,
    updateOptions,
    encodedPayload: qrPayload.payload,
    errors: qrPayload.localErrors,
    resetForm,
    handleDownload,
  };
};
