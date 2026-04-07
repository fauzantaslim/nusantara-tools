"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useUrlShortener } from "@/features/url-shortener/hooks/useUrlShortener";
import { UrlForm } from "@/features/url-shortener/components/UrlForm";
import { UrlList } from "@/features/url-shortener/components/UrlList";

export default function UrlShortenerPage() {
  const { urls, shortenUrl, deleteUrl, copyToClipboard, isCopied } =
    useUrlShortener();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Produktivitas", href: "/produktivitas" },
            { label: "URL Shortener" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            URL Shortener
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Persingkat link Anda, bagikan dengan mudah, dan pantau
            penggunaannya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <UrlForm onShorten={shortenUrl} />
        </div>

        {/* Right Side: List & Stats */}
        <div className="lg:col-span-7">
          <UrlList
            urls={urls}
            onCopy={copyToClipboard}
            onDelete={deleteUrl}
            copiedCode={isCopied}
          />
        </div>
      </div>
    </div>
  );
}
