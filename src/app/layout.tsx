import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Jukjam — Música alternativa para tus eventos",
  description:
    "Encuentra y contrata músicos alternativos en Colombia. Jazz, folk, música de autor, rock acústico y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className={`${quicksand.className} ${quicksand.variable} min-h-full flex flex-col`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
