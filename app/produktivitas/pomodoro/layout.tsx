import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer | NusantaraTools",
  description:
    "Tingkatkan produktivitas Anda dengan Pomodoro Timer NusantaraTools. Sesuaikan waktu fokus, istirahat, dan dapatkan notifikasi langsung di browser Anda.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
