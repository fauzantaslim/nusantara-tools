import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-surface border-t-4 border-accent-1 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-8 mb-16">
          <div className="col-span-1 md:col-span-5 pr-0 md:pr-12">
            <Link
              href="/"
              className="inline-block mb-6 outline-none hover:opacity-90 transition-opacity"
            >
              <Image
                src="/nusantara-tools-logo-horizontal.png"
                alt="Nusantara Tools Logo"
                width={500}
                height={500}
                className="w-auto h-8 sm:h-10 object-contain filter brightness-0 invert"
                priority
              />
            </Link>
            <p className="font-body text-[#EDE0D0] leading-relaxed mb-8 opacity-80 text-lg">
              Perangkat daring multifungsi, esensial, dan presisi yang dibangun
              khusus memberdayakan rutinitas keseharian masyarakat Indonesia.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold font-ui uppercase tracking-widest text-white mb-6 text-sm">
              Kategori Tools
            </h4>
            <ul className="space-y-4 font-body text-[#EDE0D0]/80">
              <li>
                <Link
                  href="/kesehatan"
                  className="hover:text-accent-1 transition-colors"
                >
                  Kesehatan & Kebugaran
                </Link>
              </li>
              <li>
                <Link
                  href="/finansial"
                  className="hover:text-accent-1 transition-colors"
                >
                  Finansial & Keuangan
                </Link>
              </li>
              <li>
                <Link
                  href="/produktivitas"
                  className="hover:text-accent-1 transition-colors"
                >
                  Produktivitas Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="/religi"
                  className="hover:text-accent-1 transition-colors"
                >
                  Religi & Ibadah
                </Link>
              </li>
              <li>
                <Link
                  href="/utilitas"
                  className="hover:text-accent-1 transition-colors"
                >
                  Utilitas Ekstra
                </Link>
              </li>
            </ul>{" "}
          </div>

          <div className="col-span-1 md:col-span-4">
            <h4 className="font-bold font-ui uppercase tracking-widest text-white mb-6 text-sm">
              Informasi Platform
            </h4>
            <ul className="space-y-4 font-body text-[#EDE0D0]/80">
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-accent-1 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="hover:text-accent-1 transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="/syarat-ketentuan"
                  className="hover:text-accent-1 transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="hover:text-accent-1 transition-colors"
                >
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4A3B32] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-sm text-[#EDE0D0]/60">
            &copy; {new Date().getFullYear()} Nusantara Tools. Semua hak cipta
            dilindungi undang-undang.
          </p>
          <p className="font-body text-sm text-[#EDE0D0]/60 flex items-center gap-2">
            Created with{" "}
            <Heart className="w-4 h-4 text-accent-3 fill-accent-3" />
          </p>
        </div>
      </div>
    </footer>
  );
}
