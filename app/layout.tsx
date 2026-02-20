import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import siteMeta from "../metadata.json";

export const metadata: Metadata = {
  title: siteMeta.name,
  description: siteMeta.description,
  metadataBase: siteMeta.siteUrl ? new URL(siteMeta.siteUrl) : undefined,
  keywords: siteMeta.keywords,
  icons: {
    icon: [
      {
        url: "/public/logo-black.png",
        href: "/public/logo-black.png",
      },
    ],
    shortcut: siteMeta.icon,
    apple: siteMeta.appleIcon || siteMeta.icon,
  },
  // themeColor: siteMeta.themeColor,
  openGraph: {
    title: siteMeta.name,
    description: siteMeta.description,
    url: siteMeta.siteUrl,
    siteName: siteMeta.name,
    images: siteMeta.image
      ? [
          {
            url: siteMeta.image,
            width: 1200,
            height: 630,
            alt: siteMeta.name,
          },
        ]
      : undefined,
    locale: siteMeta.locale,
    type: "website",
  },
  robots: siteMeta.robots,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <link rel="icon" href="/public/logo-black.png" />
      </head>
      <body className="bg-background-dark text-slate-200 font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
