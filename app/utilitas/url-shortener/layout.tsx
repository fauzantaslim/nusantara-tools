import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener | NusantaraTools",
  description:
    "Persingkat link Anda, bagikan dengan mudah, dan pantau penggunaannya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
