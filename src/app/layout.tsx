import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';

const poppins = Poppins({
  weight: ["400","500","600","700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Apolo Energies Comercializadoras",
  description: "Página para comercializadoras de Apolo Energies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
