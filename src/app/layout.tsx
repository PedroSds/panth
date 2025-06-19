
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React from 'react';

export const metadata: Metadata = {
  title: 'PanthStore',
  description: 'Encontre sua conta perfeita de League of Legends!',
  icons: {
    icon: [
      // Use um array para fornecer múltiplos ícones para diferentes propósitos ou formatos
      // O navegador escolherá o mais apropriado.
      // Coloque seu arquivo icon.svg ou icon.png em src/app/
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      // Para o favicon.ico tradicional
      // Coloque seu arquivo favicon.ico em src/app/
      { url: '/favicon.ico', sizes: 'any', rel: 'icon' }
    ],
    // Para o ícone da Apple
    // Coloque seu arquivo apple-icon.png em src/app/
    apple: '/apple-icon.png',
    // Atalho, muitas vezes usa o favicon.ico
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" id="page-top">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
