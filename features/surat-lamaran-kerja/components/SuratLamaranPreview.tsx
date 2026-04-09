"use client";

import React, { useRef } from "react";
import {
  Biodata,
  CompanyData,
  Completeness,
  DocumentSettings,
} from "../hooks/useSuratLamaran";
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

interface SuratLamaranPreviewProps {
  biodata: Biodata;
  companyData: CompanyData;
  completeness: Completeness;
  settings: DocumentSettings;
}

export const SuratLamaranPreview: React.FC<SuratLamaranPreviewProps> = ({
  biodata,
  companyData,
  completeness,
  settings,
}) => {
  const [copied, setCopied] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const formatDateId = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const [isPdfLoading, setIsPdfLoading] = React.useState(false);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    setIsPdfLoading(true);
    try {
      // Clone the content to render it off-screen without any CSS transform (which breaks html2canvas text rendering)
      const cloneContent = contentRef.current.cloneNode(true) as HTMLElement;

      const printContainer = document.createElement("div");
      printContainer.style.position = "absolute";
      printContainer.style.left = "-9999px";
      printContainer.style.top = "0";
      printContainer.style.width = "210mm";
      printContainer.style.minHeight =
        settings.paperSize === "folio" ? "330mm" : "297mm";
      printContainer.style.padding = "20mm 20mm";
      printContainer.style.backgroundColor = "white";
      printContainer.style.fontFamily = settings.font;
      printContainer.style.fontSize = settings.fontSize;
      printContainer.style.lineHeight = settings.lineHeight;
      printContainer.style.textAlign = settings.alignment as any;
      printContainer.style.color = "black";

      printContainer.appendChild(cloneContent);
      document.body.appendChild(printContainer);

      const canvas = await html2canvas(printContainer, {
        scale: 2,
        useCORS: true,
      });

      document.body.removeChild(printContainer);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: settings.paperSize === "folio" ? [210, 330] : "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Surat_Lamaran_Kerja.pdf");
    } catch (err) {
      console.error("Failed to generate PDF: ", err);
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleDownloadWord = () => {
    if (!contentRef.current) return;
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Surat Lamaran Kerja</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + contentRef.current.innerHTML + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = "Surat_Lamaran_Kerja.doc";
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        // Standard A4 width at 96 DPI is ~794px. We add a little padding.
        const standardWidth = 794;
        const padding = 32; // 16px padding on each side
        const newScale = (availableWidth - padding) / standardWidth;
        setScale(Math.min(newScale, 1));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const isFolio = settings.paperSize === "folio";
  // A4 ratio 210/297 (~0.707), Folio 210/330 (~0.636)
  const paperHeightPx = isFolio ? 1247 : 1123;

  const getDateText = () => {
    const formattedDate = formatDateId(completeness.tanggalLamaran);
    const locationStr = biodata.alamatKota ? `${biodata.alamatKota}, ` : "";
    return `${locationStr}${formattedDate}`;
  };

  const renderTopLeftDate = () => {
    if (settings.datePlacement === "top-left") {
      return <div className="mb-6 text-left">{getDateText()}</div>;
    }
    return null;
  };

  const renderTopRightDate = () => {
    if (settings.datePlacement === "top-right") {
      return <div className="mb-6 text-right">{getDateText()}</div>;
    }
    return null;
  };

  const renderSignature = () => {
    const isRight = settings.signaturePlacement === "right";
    const formattedDate = formatDateId(completeness.tanggalLamaran);
    const locationStr = biodata.alamatKota ? `${biodata.alamatKota}, ` : "";
    const dateText = `${locationStr}${formattedDate}`;

    return (
      <div
        className={cn(
          "mt-12 flex",
          isRight ? "justify-end text-center" : "text-left",
        )}
      >
        <div className="inline-flex flex-col items-center">
          {settings.datePlacement === "bottom" && (
            <p className="mb-2">{dateText}</p>
          )}
          <p className="mb-16">Hormat saya,</p>
          <p className=" whitespace-nowrap min-w-[150px] text-center">
            ({biodata.namaLengkap || "Nama Lengkap"})
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col gap-4 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative z-10 w-full print:shadow-none print:border-none print:bg-transparent print:p-0 print:overflow-visible min-h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none print:hidden -z-10" />

      {/* Header & Action Bar - Hidden in print */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden relative z-10 border-b border-muted/50 pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C17A3A]" />
            Preview Surat
          </h2>
          <p className="text-sm text-secondary font-body mt-1">
            Pratinjau langsung dokumen Anda.
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

      {/* Actual Paper Container */}
      {/* We use scale transform to make sure the A4 fits any screen nicely without wrapping issues */}
      <div
        ref={containerRef}
        className="w-full bg-muted p-4 rounded-[2rem] border border-muted/50 print:p-0 print:border-none print:bg-transparent overflow-hidden flex justify-center"
        style={{ minHeight: `${paperHeightPx * scale + 32}px` }}
      >
        <div
          className="origin-top transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        >
          {/* The Paper */}
          <div
            className="bg-white shadow-xl shadow-black/5 print:shadow-none mx-auto relative shrink-0 print:w-full print:m-0 print:border-0 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: isFolio ? "330mm" : "297mm",
              padding: "20mm 20mm", // typical margin
              fontFamily: settings.font,
              fontSize: settings.fontSize,
              lineHeight: settings.lineHeight,
              textAlign: settings.alignment as any,
            }}
          >
            <div ref={contentRef} className="text-black">
              {renderTopRightDate()}
              {renderTopLeftDate()}

              <div className="mb-6 leading-relaxed">
                <p>Lampiran: {completeness.lampiran.length} berkas</p>
                <p>Perihal: Lamaran Pekerjaan</p>
              </div>

              <div className="mb-6 leading-relaxed">
                <p>Kepada Yth.</p>
                <p>
                  {companyData.hrd || "HRD"}{" "}
                  {companyData.namaPerusahaan || "Nama Perusahaan"}
                </p>
                {companyData.kotaPerusahaan && (
                  <p>di {companyData.kotaPerusahaan}</p>
                )}
              </div>

              <p className="mb-4">Dengan hormat,</p>

              <div className="space-y-4 mb-6">
                <p
                  style={{
                    textIndent: settings.indentation === "yes" ? "2.2rem" : "0",
                  }}
                >
                  {companyData.sumberLowongan
                    ? `Sesuai dengan informasi adanya lowongan pekerjaan di ${companyData.namaPerusahaan || "perusahaan"} yang saya peroleh dari ${companyData.sumberLowongan}, `
                    : `Sehubungan dengan informasi adanya lowongan pekerjaan di ${companyData.namaPerusahaan || "perusahaan"}, `}
                  saya bermaksud untuk melamar pekerjaan sebagai{" "}
                  {companyData.posisiLowongan || "..."}. Saya yang bertanda
                  tangan di bawah ini:
                </p>
              </div>

              <div className="mb-6">
                <table className="w-full text-left [&_td]:py-1">
                  <tbody>
                    <tr>
                      <td className="whitespace-nowrap align-top pr-4">
                        Nama Lengkap
                      </td>
                      <td className="w-4 align-top">:</td>
                      <td>{biodata.namaLengkap || "-"}</td>
                    </tr>
                    {(biodata.tempatLahir || biodata.tanggalLahir) && (
                      <tr>
                        <td className="whitespace-nowrap align-top pr-4">
                          Tempat, Tanggal Lahir
                        </td>
                        <td className="w-4 align-top">:</td>
                        <td>
                          {biodata.tempatLahir || "-"},{" "}
                          {biodata.tanggalLahir
                            ? formatDateId(biodata.tanggalLahir)
                            : "-"}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="whitespace-nowrap align-top pr-4">
                        Jenis Kelamin
                      </td>
                      <td className="w-4 align-top">:</td>
                      <td>{biodata.jenisKelamin || "-"}</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap align-top pr-4">
                        Pendidikan Terakhir
                      </td>
                      <td className="w-4 align-top">:</td>
                      <td>{biodata.pendidikanTerakhir || "-"}</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap align-top pr-4">
                        Alamat Domisili
                      </td>
                      <td className="w-4 align-top">:</td>
                      <td>{biodata.alamatLengkap || "-"}</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap align-top pr-4">
                        Handphone / Email
                      </td>
                      <td className="w-4 align-top">:</td>
                      <td>
                        {biodata.noHp || "-"} / {biodata.email || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 mb-6">
                <p
                  style={{
                    textIndent: settings.indentation === "yes" ? "2.2rem" : "0",
                  }}
                >
                  Sebagai bahan pertimbangan bagi Bapak/Ibu, bersama surat ini
                  turut saya lampirkan:
                </p>

                {completeness.lampiran.length > 0 ? (
                  <div className="!indent-0 mt-2">
                    <ol
                      style={{ listStyleType: "decimal", paddingLeft: "2rem" }}
                      className="space-y-1"
                    >
                      {completeness.lampiran.map((lampiran, idx) => (
                        <li key={idx} className="pl-1">
                          {lampiran}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p className="text-black/40 italic !indent-0 mt-2 text-sm">
                    (Belum ada lampiran yang dipilih)
                  </p>
                )}

                <p
                  className="mt-4"
                  style={{
                    textIndent: settings.indentation === "yes" ? "2.2rem" : "0",
                  }}
                >
                  Demikian surat lamaran pekerjaan ini saya buat dengan
                  sebenar-benarnya dan besar harapan saya untuk bergabung dengan{" "}
                  {companyData.namaPerusahaan || "perusahaan"} yang Bapak/Ibu
                  pimpin. Atas perhatian dan kebijaksanaan Bapak/Ibu pimpinan,
                  saya mengucapkan terima kasih sebesar-besarnya.
                </p>
              </div>

              {renderSignature()}
            </div>
          </div>
        </div>
      </div>

      {/* Target for print specific CSS via global styles or module */}
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
          /* We make the print area visible and reset to top left */
          div[style*="210mm"], div[style*="210mm"] * {
            visibility: visible;
          }
          div[style*="210mm"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 2cm !important;
            box-shadow: none !important;
          }
        }
      `,
        }}
      />
    </Card>
  );
};
