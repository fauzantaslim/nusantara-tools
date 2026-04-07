import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export const metadata = {
  title: "Hubungi Kami - NusantaraTools",
  description:
    "Sampaikan saran, laporan masalah, atau permintaan fitur baru untuk platform NusantaraTools.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-[#FFF0EB] text-[#9C4A2A] text-xs font-bold rounded-full tracking-wider uppercase border border-[#9C4A2A]/20 mb-4 inline-block">
            Sapa Kami
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-primary font-heading tracking-tight mb-4">
            Mari <span className="text-secondary/60">Berdialog.</span>
          </h1>
          <p className="text-secondary font-body max-w-2xl mx-auto text-lg leading-relaxed">
            Punya ide jenius untuk kalkulator utilitas esok hari? Atau menjumpai
            hitungan tagihan yang luput? Ketik santai dan layangkan pesannya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE0D0]/80 shadow-sm relative overflow-hidden">
          {/* Info Section */}
          <div className="md:col-span-2 bg-primary rounded-2xl p-8 text-[#F5EDE3] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-1 opacity-20 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-2 opacity-10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                Informasi Kontak
              </h3>
              <p className="font-body opacity-80 mb-10 pb-8 border-b border-light/10">
                Tim kecil kami biasa meracik dari layar diiringi suguhan kopi
                lokal. Balasan Anda kami pastikan terproses humanis secepatnya.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#C17A3A]" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-white/90 text-sm mb-1">
                      Surat Elektronik (Surel)
                    </h4>
                    <a
                      href="mailto:halo@nusantaratools.id"
                      className="font-body text-[#F5EDE3] hover:text-[#C17A3A] transition-colors"
                    >
                      halo@nusantaratools.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#C17A3A]" />
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
                    <MapPin className="w-5 h-5 text-[#C17A3A]" />
                  </div>
                  <div>
                    <h4 className="font-ui font-semibold text-white/90 text-sm mb-1">
                      Basis Koordinat
                    </h4>
                    <p className="font-body opacity-80 text-sm">
                      Jakarta Selatan,
                      <br />
                      Nusantara, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="md:col-span-3 p-2 sm:p-6">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-ui font-bold text-sm text-primary"
                  >
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Mis. Budi Pratama"
                    className="w-full px-4 py-3 bg-surface border border-[#EDE0D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20 focus:border-[#C17A3A]/40 font-body text-primary transition-all placeholder:text-secondary/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-ui font-bold text-sm text-primary"
                  >
                    Email Balasan
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="budi@contoh.id"
                    className="w-full px-4 py-3 bg-surface border border-[#EDE0D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20 focus:border-[#C17A3A]/40 font-body text-primary transition-all placeholder:text-secondary/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="topic"
                  className="font-ui font-bold text-sm text-primary"
                >
                  Topik Percakapan
                </label>
                <select
                  id="topic"
                  className="w-full px-4 py-3 bg-surface border border-[#EDE0D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20 focus:border-[#C17A3A]/40 font-body text-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="saran">Saran & Ide Fitur Utilitas</option>
                  <option value="bug">Pelaporan Error Kerusakan (Bug)</option>
                  <option value="karir">Obrolan Ringan Kemitraan</option>
                  <option value="lainnya">Lainnya saja deh</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-ui font-bold text-sm text-primary"
                >
                  Isi Gagasannya
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Halo Tim Nusantara, kayaknya lebih asik kalau dibikinin alat buat hitung..."
                  className="w-full px-4 py-3 bg-surface border border-[#EDE0D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20 focus:border-[#C17A3A]/40 font-body text-primary transition-all resize-none placeholder:text-secondary/40"
                ></textarea>
              </div>

              <button
                type="button"
                className="mt-2 w-full sm:w-auto self-start px-8 py-3.5 bg-[#C17A3A] text-white font-ui font-bold text-[13px] tracking-widest uppercase rounded-xl shadow-md border-none hover:bg-primary hover:-translate-y-0.5 transition-all duration-300"
              >
                Kirim Lembar Pesan &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
