import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import NotificationContainer from "@/components/ui/NotificationContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediGo Hub - Sistema de Gestión Médica",
  description: "Documentación completa del sistema integral de gestión médica MediGo Hub. Incluye módulos de pacientes, doctores, citas, departamentos y notificaciones.",
  keywords: "medigo, hub, gestión médica, documentación, sistema hospitalario, citas médicas",
  authors: [{ name: "MediGo Hub Team" }],
  openGraph: {
    title: "MediGo Hub - Documentación",
    description: "Sistema integral de gestión médica",
    type: "website",
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
        <AuthProvider>
          <NotificationProvider>
            {children}
            <NotificationContainer />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
