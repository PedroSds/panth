
'use client'; // Tornando este um Client Component

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_FAVICON_ICO_URL, 
  FAVICON_ICO_URL_LOCAL_STORAGE_KEY,
  DEFAULT_FAVICON_PNG_URL,
  FAVICON_PNG_URL_LOCAL_STORAGE_KEY,
  DEFAULT_FAVICON_SVG_URL,
  FAVICON_SVG_URL_LOCAL_STORAGE_KEY,
  DEFAULT_APPLE_ICON_URL,
  APPLE_ICON_URL_LOCAL_STORAGE_KEY
} from '@/data/mockData';

// Não podemos exportar 'metadata' de um Client Component.
// O título e a descrição serão definidos dinamicamente no useEffect.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [faviconIcoUrl, setFaviconIcoUrl] = useState(DEFAULT_FAVICON_ICO_URL);
  const [faviconPngUrl, setFaviconPngUrl] = useState(DEFAULT_FAVICON_PNG_URL);
  const [faviconSvgUrl, setFaviconSvgUrl] = useState(DEFAULT_FAVICON_SVG_URL);
  const [appleIconUrl, setAppleIconUrl] = useState(DEFAULT_APPLE_ICON_URL);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Definir título e meta descrição dinamicamente
    document.title = 'PanthStore';
    
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', 'Encontre sua conta perfeita de League of Legends!');

    // Carregar URLs de favicon do localStorage
    setFaviconIcoUrl(localStorage.getItem(FAVICON_ICO_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_ICO_URL);
    setFaviconPngUrl(localStorage.getItem(FAVICON_PNG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_PNG_URL);
    setFaviconSvgUrl(localStorage.getItem(FAVICON_SVG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_SVG_URL);
    setAppleIconUrl(localStorage.getItem(APPLE_ICON_URL_LOCAL_STORAGE_KEY) || DEFAULT_APPLE_ICON_URL);
    
    setIsMounted(true);
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        {/* Favicons dinâmicos baseados no localStorage */}
        {isMounted && faviconIcoUrl && faviconIcoUrl.trim() !== '' && <link rel="icon" href={faviconIcoUrl} sizes="any" />}
        {isMounted && faviconPngUrl && faviconPngUrl.trim() !== '' && <link rel="icon" href={faviconPngUrl} type="image/png" />}
        {isMounted && faviconSvgUrl && faviconSvgUrl.trim() !== '' && <link rel="icon" href={faviconSvgUrl} type="image/svg+xml" />}
        {isMounted && appleIconUrl && appleIconUrl.trim() !== '' && <link rel="apple-touch-icon" href={appleIconUrl} />}
        
        {/* Fallback para favicons estáticos se os do localStorage não forem válidos ou não estiverem montados */}
        {!isMounted && (
            <>
                <link rel="icon" href={DEFAULT_FAVICON_ICO_URL} sizes="any" />
                <link rel="icon" href={DEFAULT_FAVICON_PNG_URL} type="image/png" />
                <link rel="icon" href={DEFAULT_FAVICON_SVG_URL} type="image/svg+xml" />
                <link rel="apple-touch-icon" href={DEFAULT_APPLE_ICON_URL} />
            </>
        )}

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
