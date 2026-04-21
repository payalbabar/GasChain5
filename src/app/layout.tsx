import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display, IBM_Plex_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-mono-plex",
});

const manrope = Manrope({
  weight: ["300", "400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "GasChain — Medical Records on Chain",
  description: "Secure, immutable, patient-controlled health records on the Stellar/Soroban ecosystem (LPG Connect).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${ibmPlexMono.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-ink font-manrope">
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
