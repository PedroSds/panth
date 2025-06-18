
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React from 'react';

export const metadata: Metadata = {
  title: 'PanthStore',
  description: 'Encontre sua conta perfeita de League of Legends!',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { readonly [key: string]: string | string[] };
  searchParams: { readonly [key: string]: string | string[] | undefined };
}

export default function RootLayout({
  children,
  params, // Explicitly destructure params, even if not directly used
  searchParams, // Explicitly destructure searchParams, even if not directly used
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
