import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'PanthStore',
  description: 'Encontre sua conta perfeita de League of Legends!',
};

// Note for debugging: The "params are being enumerated" error typically arises
// in Server Components when `params` or `searchParams` are iterated (e.g., Object.keys())
// without being properly handled (e.g. React.use() or conversion to a plain object if needed).
// This RootLayout does not currently use params or searchParams in its signature.
// If the error persists, investigate other Server Components or how props are passed
// to Client Components that might indirectly lead to enumeration of these special objects.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
