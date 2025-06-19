
"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { Button } from '@/components/ui/button';
import { DEFAULT_BANNER_IMAGE_URL } from '@/data/mockData'; // For fallback before mount

export default function HomePage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Erro ao carregar dados da loja...</p>
        </main>
    );
  }

  const { bannerImageUrl, isMounted, getSectionStyle } = context;
  const effectiveBannerImageUrl = isMounted ? bannerImageUrl : DEFAULT_BANNER_IMAGE_URL;

  // For the wave, use a generic background color or the body background.
  // The 'accounts' section is now on a separate page.
  const bodyBackgroundColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.body).backgroundColor || 'hsl(var(--background))'
    : 'hsl(var(--background))';
  
  const waveContainerStyle: React.CSSProperties = {
    transform: 'translateY(1px)',
    color: bodyBackgroundColor,
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${effectiveBannerImageUrl})` }}
        data-ai-hint="game hero background"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-64 lg:pb-72">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-4 text-shadow-lg">
            COMPRE SUA SMURF DE LEAGUE OF LEGENDS
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-200 mb-10 max-w-3xl mx-auto text-shadow-md">
            100% SEGURA DE BANIMENTOS
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground px-10 py-6 text-lg font-semibold">
            <Link href="/contas">VER CONTAS DISPONÍVEIS</Link>
          </Button>
        </div>
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0px]" 
          style={waveContainerStyle}
        >
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-auto block " style={{ minHeight: '40px', maxHeight: '120px' }}>
            <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>
      
      {/* Placeholder for additional home-specific content if needed in the future */}
      {/* Example: Call to action or brief intro */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Bem-vindo à PanthStore!</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua fonte confiável para contas de League of Legends. Explore nossas contas prontas ou solicite uma personalizada.
          </p>
        </div>
      </section>
    </main>
  );
}
