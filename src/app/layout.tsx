import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a5f',
};

export const metadata: Metadata = {
  title: 'ViajeGriegosRubenVirginia — Grecia & Milán 2026',
  description:
    'Compañero de viaje digital para Rubén y Virginia. Itinerario, presupuesto y reservas del viaje Grecia-Milán agosto-septiembre 2026.',
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ViajeGriegos',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>{children}
</body>
    </html>
  );
}