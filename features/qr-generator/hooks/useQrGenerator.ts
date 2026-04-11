import { useState, useCallback, useMemo } from "react";
import { QR_DEFAULT_OPTIONS, QR_MODE } from "@/lib/constants";
import {
  urlSchema,
  textSchema,
  emailSchema,
  phoneSchema,
  formatQrPayload,
} from "../utils";
import { QrType, QrOptions, InputData } from "../types";
import { z } from "zod";

export const useQrGenerator = (initialUrl?: string) => {
  const [activeTab, setActiveTab] = useState<QrType>(
    initialUrl ? QR_MODE.URL : QR_MODE.URL,
  );

  const [inputData, setInputData] = useState<InputData>({
    url: initialUrl || "",
    text: "",
    email: "",
    subject: "",
    body: "",
    phone: "",
  });

  const [options, setOptions] = useState<QrOptions>(QR_DEFAULT_OPTIONS);

  // Memoized derived payload based on the active tab and its data validation
  const qrPayload = useMemo(() => {
    let result = "";
    const activeData: Record<string, string> = {};
    const currentErrors: Record<string, string> = {};

    try {
      if (activeTab === QR_MODE.URL) {
        if (inputData.url.length > 0) urlSchema.parse({ url: inputData.url });
        activeData.url = inputData.url;
      } else if (activeTab === QR_MODE.TEXT) {
        if (inputData.text.length > 0)
          textSchema.parse({ text: inputData.text });
        activeData.text = inputData.text;
      } else if (activeTab === QR_MODE.EMAIL) {
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
      } else if (activeTab === QR_MODE.PHONE) {
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
    setOptions(QR_DEFAULT_OPTIONS);
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
