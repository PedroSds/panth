
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React from 'react';

export const metadata: Metadata = {
  title: 'PanthStore',
  description: 'Encontre sua conta perfeita de League of Legends!',
};

// Note for debugging: The "params are being enumerated" error typically arises
// in Server Components when `params` or `searchParams` (which are not plain objects)
// are iterated (e.g., using Object.keys(), spreading {...params})
// without being properly handled. If these objects need to be read, use React.use(),
// or convert them to plain objects if passing to Client Components.
export default function RootLayout({
  children,
  params, // Explicitly destructure, even if not directly used here.
  searchParams, // Explicitly destructure, even if not directly used here.
}: Readonly<{
  children: React.ReactNode;
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
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
