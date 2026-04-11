"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Textarea } from "@/ui/Textarea";
import { HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "saran",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const TOPIC_OPTIONS = [
    { value: "saran", label: "Saran & Ide Fitur Utilitas" },
    { value: "bug", label: "Pelaporan Error Kerusakan (Bug)" },
    { value: "karir", label: "Obrolan Ringan Kemitraan" },
    { value: "lainnya", label: "Lainnya saja deh" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", topic: "saran", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Hubungi Kami" }]} />
        </div>

        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-accent-3-light text-accent-3 text-xs font-bold rounded-full tracking-wider uppercase border border-accent-3/20 mb-4 inline-block">
            Sapa Kami
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight mb-4">
            Mari <span className="text-accent-1">Berdialog.</span>
          </h1>
          <p className="text-secondary font-body max-w-2xl mx-auto text-lg leading-relaxed">
            Punya ide jenius untuk kalkulator utilitas esok hari? Atau menjumpai
            hitungan tagihan yang luput? Ketik santai dan layangkan pesannya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-muted shadow-xl shadow-black/[0.03] relative overflow-hidden">
          {/* Info Section */}
          <Card
            variant="dark"
            className="md:col-span-2 p-8 flex flex-col justify-between relative overflow-hidden rounded-3xl min-h-[400px]"
          >
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-1 opacity-20 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-2 opacity-10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Informasi Kontak
              </h3>
              <p className="font-body opacity-80 mb-10 pb-8 border-b border-white/10">
                Tim kecil kami biasa meracik dari layar diiringi suguhan kopi
                lokal. Balasan Anda kami pastikan terproses humanis secepatnya.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent-1" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-white/90 text-sm mb-1">
                      Surat Elektronik (Surel)
                    </h4>
                    <a
                      href="mailto:halo@nusantaratools.id"
                      className="font-body text-surface hover:text-accent-1 transition-colors"
                    >
                      halo@nusantaratools.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-accent-1" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-white/90 text-sm mb-1">
                      Sosial Media
                    </h4>
                    <p className="font-body opacity-80 text-sm">
                      Masih dibakar di dalam oven. Segera hadir!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent-1" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-white/90 text-sm mb-1">
                      Basis Koordinat
                    </h4>
                    <p className="font-body opacity-80 text-sm">
                      Bogor,
                      <br />
                      Jawa Barat, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Form Section */}
          <div className="md:col-span-3 p-2 sm:p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Nama Panggilan"
                  placeholder="Mis. Budi Pratama"
                  value={formData.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  required
                />
                <Input
                  label="Email Balasan"
                  type="email"
                  placeholder="budi@contoh.id"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  required
                />
              </div>

              <Select
                label="Topik Percakapan"
                options={TOPIC_OPTIONS}
                value={formData.topic}
                onChange={(val) => updateForm("topic", val)}
                icon={<HelpCircle className="w-4 h-4" />}
              />

              <Textarea
                label="Isi Gagasannya"
                placeholder="Halo Tim Nusantara, kayaknya lebih asik kalau dibikinin alat buat hitung..."
                rows={5}
                value={formData.message}
                onChange={(e) => updateForm("message", e.target.value)}
                required
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto self-start px-8 h-12 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    "Mengirim..."
                  ) : (
                    <>
                      Kirim Lembar Pesan
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                {isSuccess && (
                  <p className="text-sm font-ui font-medium text-accent-2 animate-in fade-in slide-in-from-left-2">
                    Pesan berhasil terkirim! Terima kasih telah menyapa kami.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
