
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StoreDataProvider, StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext'; // Import context
import {
  DEFAULT_FAVICON_ICO_URL,
  FAVICON_ICO_URL_LOCAL_STORAGE_KEY,
  DEFAULT_FAVICON_PNG_URL,
  FAVICON_PNG_URL_LOCAL_STORAGE_KEY,
  DEFAULT_FAVICON_SVG_URL,
  FAVICON_SVG_URL_LOCAL_STORAGE_KEY,
  DEFAULT_APPLE_ICON_URL,
  APPLE_ICON_URL_LOCAL_STORAGE_KEY,
  DEFAULT_LOGO_IMAGE_URL // Added missing import
} from '@/data/mockData';

// RootLayoutContent handles dynamic parts that need context
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const context = useContext(StoreDataContext);

  // Favicon states are now local to this component, but could be from context if preferred
  const [faviconIcoUrl, setFaviconIcoUrl] = useState(DEFAULT_FAVICON_ICO_URL);
  const [faviconPngUrl, setFaviconPngUrl] = useState(DEFAULT_FAVICON_PNG_URL);
  const [faviconSvgUrl, setFaviconSvgUrl] = useState(DEFAULT_FAVICON_SVG_URL);
  const [appleIconUrl, setAppleIconUrl] = useState(DEFAULT_APPLE_ICON_URL);
  const [isMountedForFavicon, setIsMountedForFavicon] = useState(false); // Renamed to avoid conflict

  useEffect(() => {
    document.title = 'PanthStore';
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', 'Encontre sua conta perfeita de League of Legends!');

    setFaviconIcoUrl(localStorage.getItem(FAVICON_ICO_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_ICO_URL);
    setFaviconPngUrl(localStorage.getItem(FAVICON_PNG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_PNG_URL);
    setFaviconSvgUrl(localStorage.getItem(FAVICON_SVG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_SVG_URL);
    setAppleIconUrl(localStorage.getItem(APPLE_ICON_URL_LOCAL_STORAGE_KEY) || DEFAULT_APPLE_ICON_URL);
    
    setIsMountedForFavicon(true);
  }, []);

  // Ensure context is loaded before rendering Navbar
  const logoUrl = context?.isMounted ? context.logoImageUrl : DEFAULT_LOGO_IMAGE_URL;

  return (
    <html lang="pt-BR">
      <head>
        {isMountedForFavicon && faviconIcoUrl && faviconIcoUrl.trim() !== '' && <link key="favicon-ico" rel="icon" href={faviconIcoUrl} sizes="any" />}
        {isMountedForFavicon && faviconPngUrl && faviconPngUrl.trim() !== '' && <link key="favicon-png" rel="icon" href={faviconPngUrl} type="image/png" />}
        {isMountedForFavicon && faviconSvgUrl && faviconSvgUrl.trim() !== '' && <link key="favicon-svg" rel="icon" href={faviconSvgUrl} type="image/svg+xml" />}
        {isMountedForFavicon && appleIconUrl && appleIconUrl.trim() !== '' && <link key="apple-icon" rel="apple-touch-icon" href={appleIconUrl} />}
        
        {!isMountedForFavicon && (
            <>
                <link key="default-favicon-ico" rel="icon" href={DEFAULT_FAVICON_ICO_URL} sizes="any" />
                <link key="default-favicon-png" rel="icon" href={DEFAULT_FAVICON_PNG_URL} type="image/png" />
                <link key="default-favicon-svg" rel="icon" href={DEFAULT_FAVICON_SVG_URL} type="image/svg+xml" />
                <link key="default-apple-icon" rel="apple-touch-icon" href={DEFAULT_APPLE_ICON_URL} />
            </>
        )}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" id="page-top">
        <Navbar logoUrl={logoUrl} />
        <div className="flex-grow">
            {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreDataProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </StoreDataProvider>
  );
}
