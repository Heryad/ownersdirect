import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ownersdirect.vercel.app'), // Replace with actual domain when deployed
  title: {
    default: "OwnersDirect - Direct Owner Property Marketplace",
    template: "%s | OwnersDirect"
  },
  description: "Connect directly with property owners. Buy, rent, and sell homes, apartments, and commercial properties without middleman fees.",
  keywords: ["real estate", "property", "buy house", "rent apartment", "owner direct", "no broker", "dubai real estate"],
  authors: [{ name: "OwnersDirect Team" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ownersdirect.vercel.app',
    siteName: 'OwnersDirect',
    images: [
      {
        url: '/og-image.jpg', // We should ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
        alt: 'OwnersDirect - Find Your Dream Property',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ownersdirect',
    creator: '@ownersdirect',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
