"use client";

import React, { useRef, useState, useEffect } from "react";
import { CVATSContextType } from "../types";
import {
  Copy,
  CheckCheck,
  FileText,
  Download,
  FileDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card } from "@/ui/Card";

export const CVATSPreview: React.FC<{ cvHook: CVATSContextType }> = ({
  cvHook,
}) => {
  const { data } = cvHook;
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        // Standard A4 width at 96 DPI is ~794px. We add a little padding.
        const standardWidth = 794;
        const padding = 32;
        const newScale = (availableWidth - padding) / standardWidth;
        setScale(Math.min(newScale, 1));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const paperHeightPx = 1123; // A4 specific

  const handleCopy = async () => {
    if (contentRef.current) {
      try {
        await navigator.clipboard.writeText(contentRef.current.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handleDownloadWord = () => {
    if (!contentRef.current) return;
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title><style>body { font-family: Arial, sans-serif; }</style></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + contentRef.current.innerHTML + footer;
    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${data.personalInfo.fullName.replace(/\s+/g, "_") || "CV"}_ATS.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    setIsPdfLoading(true);
    try {
      const cloneContent = contentRef.current.cloneNode(true) as HTMLElement;

      const printContainer = document.createElement("div");
      printContainer.style.position = "absolute";
      printContainer.style.left = "-9999px";
      printContainer.style.top = "0";
      printContainer.style.width = "210mm";
      printContainer.style.minHeight = "297mm";
      printContainer.style.padding = "10mm 15mm";
      printContainer.style.backgroundColor = "white";
      printContainer.style.fontFamily = "Arial, sans-serif";
      printContainer.style.color = "black";

      printContainer.appendChild(cloneContent);
      document.body.appendChild(printContainer);

      const canvas = await html2canvas(printContainer, {
        scale: 2,
        useCORS: true,
      });
      document.body.removeChild(printContainer);

      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, width, height, undefined, "FAST");
      pdf.save(
        `${data.personalInfo.fullName.replace(/\s+/g, "_") || "CV"}_ATS.pdf`,
      );
    } catch (err) {
      console.error("Failed to generate PDF: ", err);
    } finally {
      setIsPdfLoading(false);
    }
  };

  // Format standard YYYY-MM
  const formatMonthYear = (val: string) => {
    if (!val) return "";
    const [year, month] = val.split("-");
    if (!year || !month) return val;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    if (isNaN(date.getTime())) return val;
    return date.toLocaleDateString(data.language === "id" ? "id-ID" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="flex flex-col gap-4 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative z-10 w-full print:shadow-none print:border-none print:bg-transparent print:p-0 print:overflow-visible min-h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none print:hidden -z-10" />

      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden relative z-10 border-b border-muted/50 pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C17A3A]" />
            Preview & Export
          </h2>
          <p className="text-sm text-secondary font-body mt-1">
            Tampilan ini sudah dioptimasi untuk Robot ATS.
          </p>
        </div>
        <div className="flex justify-end gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-muted rounded-xl text-secondary hover:text-primary transition-colors font-ui text-sm font-bold shadow-sm"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4 text-[#4A7C59]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Tersalin!" : "Salin"}
            </span>
          </button>
          <button
            onClick={handleDownloadWord}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#2b579a]/10 text-[#2b579a] rounded-xl hover:bg-[#2b579a]/20 transition-colors font-ui text-sm font-bold shadow-sm border border-[#2b579a]/20"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Word</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isPdfLoading}
            className={cn(
              "flex items-center gap-2 px-3 sm:px-4 py-2 text-white rounded-xl transition-colors font-ui text-sm font-bold shadow-sm",
              isPdfLoading
                ? "bg-[#C17A3A]/70 cursor-not-allowed"
                : "bg-[#C17A3A] hover:bg-[#A66832]",
            )}
          >
            {isPdfLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isPdfLoading ? "Memproses..." : "Unduh PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* The Printable Container */}
      <div
        ref={containerRef}
        className="w-full bg-muted p-4 rounded-[2rem] border border-muted/50 print:p-0 print:border-none print:bg-transparent overflow-hidden flex justify-center"
        style={{ minHeight: `${paperHeightPx * scale + 32}px` }}
      >
        <div
          className="origin-top transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="bg-white shadow-xl shadow-black/5 print:shadow-none mx-auto relative shrink-0 print:w-full print:m-0 print:border-0 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "10mm 15mm",
              fontFamily: "Arial, sans-serif",
              color: "#000",
              lineHeight: "1.5",
            }}
          >
            <div ref={contentRef} className="text-black">
              {/* 1. Header Contact */}
              <div className="text-center mb-4">
                <h1
                  className="text-[28px] font-bold uppercase tracking-wide mb-1"
                  style={{ margin: "0 0 4px 0" }}
                >
                  {data.personalInfo.fullName || "JOHN DOE"}
                </h1>
                {data.personalInfo.jobTitle && (
                  <p
                    className="text-[14px] font-bold mb-1"
                    style={{ margin: "0 0 4px 0" }}
                  >
                    {data.personalInfo.jobTitle}
                  </p>
                )}

                <div
                  className="text-[11px] flex flex-wrap justify-center gap-2 items-center"
                  style={{ margin: "0" }}
                >
                  <span>
                    {data.personalInfo.location || "Jakarta, Indonesia"}
                  </span>
                  <span>|</span>
                  <span>{data.personalInfo.phone || "08123456789"}</span>
                  <span>|</span>
                  <span>{data.personalInfo.email || "email@example.com"}</span>
                  {data.personalInfo.linkedin && (
                    <>
                      <span>|</span>
                      <a
                        href={`https://${data.personalInfo.linkedin.replace(/^https?:\/\//, "")}`}
                        className="text-black no-underline"
                      >
                        {data.personalInfo.linkedin.replace(/^https?:\/\//, "")}
                      </a>
                    </>
                  )}
                  {data.personalInfo.portfolio && (
                    <>
                      <span>|</span>
                      <a
                        href={`https://${data.personalInfo.portfolio.replace(/^https?:\/\//, "")}`}
                        className="text-black no-underline"
                      >
                        {data.personalInfo.portfolio.replace(
                          /^https?:\/\//,
                          "",
                        )}
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* 2. Professional Summary */}
              {data.personalInfo.summary && (
                <div className="mb-4">
                  <h2
                    className="text-[13px] font-bold uppercase tracking-wider"
                    style={{
                      margin: "0 0 8px 0",
                      borderBottom: "1px solid #000",
                      paddingBottom: "2px",
                    }}
                  >
                    {data.language === "id" ? "RINGKASAN PROFIL" : "SUMMARY"}
                  </h2>
                  <div
                    className="text-[11px]"
                    style={{
                      margin: "0",
                      textAlign: "justify",
                      textJustify: "auto",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    {data.personalInfo.summary
                      .split(/\n\s*\n/)
                      .map((par, i) => (
                        <p
                          key={i}
                          style={{
                            margin: "0 0 4px 0",
                            textAlign: "justify",
                            textJustify: "auto",
                            display: "block",
                            width: "100%",
                          }}
                        >
                          {par.replace(/\n/g, " ")}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* 3. Work Experience */}
              {data.experience.length > 0 && (
                <div className="mb-4">
                  <h2
                    className="text-[13px] font-bold uppercase tracking-wider"
                    style={{
                      margin: "0 0 8px 0",
                      borderBottom: "1px solid #000",
                      paddingBottom: "2px",
                    }}
                  >
                    {data.language === "id"
                      ? "PENGALAMAN KERJA"
                      : "WORK EXPERIENCE"}
                  </h2>

                  {data.experience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div
                        className="flex justify-between items-end"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          marginBottom: "2px",
                        }}
                      >
                        <span className="font-bold text-[12px]">
                          {exp.position || "Position Name"}
                        </span>
                        <span className="text-[11px] font-bold">
                          {formatMonthYear(exp.startDate) || "Start Date"} –{" "}
                          {exp.isCurrent
                            ? data.language === "id"
                              ? "Sekarang"
                              : "Present"
                            : formatMonthYear(exp.endDate) || "End Date"}
                        </span>
                      </div>
                      <div
                        className="flex justify-between items-start italic text-[11px] mb-1"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "4px",
                        }}
                      >
                        <span>{exp.company || "Company Name"}</span>
                        <span>{exp.location || "Location"}</span>
                      </div>

                      {exp.description && exp.description.length > 0 && (
                        <ul
                          className="text-[11px] mt-1"
                          style={{
                            margin: "4px 0 0 0",
                            padding: 0,
                            listStyle: "none",
                          }}
                        >
                          {exp.description
                            .filter((bullet) => bullet.trim() !== "")
                            .map((bullet, i) => (
                              <li
                                key={i}
                                style={{
                                  marginBottom: "4px",
                                  display: "flex",
                                  gap: "6px",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span style={{ lineHeight: "1.5" }}>•</span>
                                <span
                                  style={{
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "auto",
                                    lineHeight: "1.5",
                                  }}
                                >
                                  {bullet}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Education */}
              {data.education.length > 0 && (
                <div className="mb-4">
                  <h2
                    className="text-[13px] font-bold uppercase tracking-wider"
                    style={{
                      margin: "0 0 8px 0",
                      borderBottom: "1px solid #000",
                      paddingBottom: "2px",
                    }}
                  >
                    {data.language === "id" ? "PENDIDIKAN" : "EDUCATION"}
                  </h2>

                  {data.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div
                        className="flex justify-between items-end"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          marginBottom: "2px",
                        }}
                      >
                        <span className="font-bold text-[12px]">
                          {edu.institution || "Institution Name"}
                        </span>
                        <span className="text-[11px] font-bold">
                          {formatMonthYear(edu.startYear)}{" "}
                          {edu.startYear &&
                            (edu.endYear || edu.isCurrent) &&
                            "–"}{" "}
                          {edu.isCurrent
                            ? data.language === "id"
                              ? "Sekarang"
                              : "Present"
                            : formatMonthYear(edu.endYear)}
                        </span>
                      </div>
                      <div className="text-[11px]" style={{ margin: "0" }}>
                        {edu.degree || "Degree"}{" "}
                        {edu.degree && edu.fieldOfStudy && "in"}{" "}
                        {edu.fieldOfStudy || "Field of Study"}
                      </div>
                      {edu.description && edu.description.length > 0 && (
                        <ul
                          className="text-[11px] mt-1"
                          style={{
                            margin: "4px 0 0 0",
                            padding: 0,
                            listStyle: "none",
                          }}
                        >
                          {edu.description
                            .filter((bullet) => bullet.trim() !== "")
                            .map((bullet, i) => (
                              <li
                                key={i}
                                style={{
                                  marginBottom: "4px",
                                  display: "flex",
                                  gap: "6px",
                                  alignItems: "flex-start",
                                }}
                              >
                                <span style={{ lineHeight: "1.5" }}>•</span>
                                <span
                                  style={{
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "auto",
                                    lineHeight: "1.5",
                                  }}
                                >
                                  {bullet}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Skills */}
              {data.skills.length > 0 && (
                <div className="mb-4">
                  <h2
                    className="text-[13px] font-bold uppercase tracking-wider"
                    style={{
                      margin: "0 0 8px 0",
                      borderBottom: "1px solid #000",
                      paddingBottom: "2px",
                    }}
                  >
                    {data.language === "id" ? "KEAHLIAN" : "SKILLS"}
                  </h2>
                  <div className="text-[11px]" style={{ margin: "0" }}>
                    {data.skills.join(" • ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body * {
            visibility: hidden;
            background: transparent !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .text-black {
            color: #000 !important;
          }
          div[style*="210mm"], div[style*="210mm"] * {
            visibility: visible;
          }
          div[style*="210mm"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 1cm !important;
            box-shadow: none !important;
          }
        }
      `,
        }}
      />
    </Card>
  );
};
