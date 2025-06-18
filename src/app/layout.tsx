
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React from 'react';

export const metadata: Metadata = {
  title: 'PanthStore',
  description: 'Encontre sua conta perfeita de League of Legends!',
};

// Simplify props to only what's explicitly used.
// Next.js will still pass params and searchParams to layouts/pages,
// but this component doesn't need to declare them in its props if it doesn't use them.
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
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
