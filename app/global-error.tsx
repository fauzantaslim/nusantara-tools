"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NusantaraTools GlobalError]", error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5EDE3",
          color: "#2C1A0E",
          fontFamily: '"Plus Jakarta Sans", "Trebuchet MS", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 20px",
            maxWidth: "480px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "rgba(156, 74, 42, 0.08)",
              border: "2px solid rgba(156, 74, 42, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            <ShieldAlert
              style={{ width: 44, height: 44, color: "rgba(156, 74, 42, 0.5)" }}
            />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.5px",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Kesalahan Sistem
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "#7A5C42",
              marginBottom: 8,
              fontFamily: '"Lora", Georgia, serif',
            }}
          >
            Maaf, terjadi kesalahan pada sistem. Tim kami akan segera
            memperbaikinya. Silakan coba muat ulang halaman.
          </p>

          {/* Error digest */}
          {error?.digest && (
            <p
              style={{
                fontSize: 11,
                fontFamily: '"JetBrains Mono", "Courier New", monospace',
                color: "rgba(122, 92, 66, 0.5)",
                backgroundColor: "rgba(237, 224, 208, 0.5)",
                padding: "6px 14px",
                borderRadius: 8,
                marginBottom: 24,
                border: "1px solid rgba(237, 224, 208, 1)",
              }}
            >
              Kode: {error.digest}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 16,
              backgroundColor: "#9C4A2A",
              color: "#FFF0EB",
              fontFamily:
                '"Plus Jakarta Sans", "Trebuchet MS", Arial, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              borderBottom: "4px solid #7A3A1E",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(156, 74, 42, 0.2)",
              transition: "all 0.15s ease",
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(4px)";
              (e.currentTarget as HTMLButtonElement).style.borderBottom =
                "0px solid #7A3A1E";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0px)";
              (e.currentTarget as HTMLButtonElement).style.borderBottom =
                "4px solid #7A3A1E";
            }}
          >
            <RefreshCw style={{ width: 18, height: 18 }} />
            Muat Ulang
          </button>

          {/* Decorative */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: 0.25,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                backgroundColor: "#7A5C42",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#C17A3A",
              }}
            />
            <div
              style={{
                width: 64,
                height: 1,
                backgroundColor: "#7A5C42",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#9C4A2A",
              }}
            />
            <div
              style={{
                width: 64,
                height: 1,
                backgroundColor: "#7A5C42",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#C17A3A",
              }}
            />
            <div
              style={{
                width: 32,
                height: 1,
                backgroundColor: "#7A5C42",
              }}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
