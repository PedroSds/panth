
"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { Button } from '@/components/ui/button';
import { AccountCard } from '@/components/AccountCard';
import { FaqSection } from '@/components/FaqSection';
import { ContactSection } from '@/components/ContactSection';
import { Film } from 'lucide-react';
import { DEFAULT_BANNER_IMAGE_URL, CUSTOM_ACCOUNT_SERVICE_ID } from '@/data/mockData';

export default function HomePage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <p>Erro ao carregar dados da loja...</p>
      </main>
    );
  }

  const {
    accounts,
    faqItems,
    whatsAppNumber,
    bannerImageUrl,
    videoUrl,
    socialLinks,
    isMounted,
    getSectionStyle,
  } = context;

  const effectiveBannerImageUrl = isMounted ? bannerImageUrl : DEFAULT_BANNER_IMAGE_URL;

  const accountsSectionStyleValues = getSectionStyle('accounts');
  const videoSectionStyle = getSectionStyle('video');
  const faqSectionStyle = getSectionStyle('faq');
  const contactSectionStyle = getSectionStyle('contact');
  
  const bodyBackgroundColor = typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue('--background') 
      ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--background')})` 
      : getComputedStyle(document.body).backgroundColor || 'hsl(0 0% 96%)'
    : 'hsl(0 0% 96%)';

  const waveFillColor = accountsSectionStyleValues.backgroundColor || bodyBackgroundColor;

  const waveContainerStyle: React.CSSProperties = {
    transform: 'translateY(1px)', 
    color: waveFillColor,
  };

  const visibleAndUnsoldAccounts = accounts.filter(acc => (!acc.isSold || acc.isCustomService) && acc.isVisible);
  const showVideoSection = videoUrl && videoUrl.trim() !== '';
  const hasActiveSocialLinks = socialLinks.some(p => p.url && p.url.trim() !== '');

  if (!isMounted) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <p>Carregando dados da loja...</p>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section
        id="inicio" // ID alterado de "hero" para "inicio"
        aria-labelledby="hero-heading"
        className="relative text-white bg-cover bg-center scroll-mt-20" // Adicionado scroll-mt-20
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
            <Link href="/#contas">VER CONTAS DISPONÍVEIS</Link>
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

      {/* Available Accounts Section */}
      <section
        id="contas"
        className="scroll-mt-24 pb-12 md:pb-16 lg:pb-20 pt-0"
        style={accountsSectionStyleValues}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0">
          {visibleAndUnsoldAccounts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
              {visibleAndUnsoldAccounts.map(account => (
                <AccountCard key={account.id} account={account} whatsAppPhoneNumber={whatsAppNumber} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhuma conta ou serviço disponível no momento. Volte em breve!</p>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section id="video-player" className="scroll-mt-24 py-12 md:py-16 lg:py-20" style={videoSectionStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex flex-col items-center sm:flex-row sm:items-center">
              <Film className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mb-2 sm:mb-0 sm:mr-3" />
              <h2 id="video-heading-mainpage" className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
                Como comprar com segurança:
              </h2>
            </div>
          </div>
          {showVideoSection ? (
            <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg shadow-2xl overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Vídeo em destaque"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md">
              </iframe>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum vídeo configurado no momento.</p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 py-12 md:py-16 lg:py-20" style={faqSectionStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {faqItems.length > 0 ? (
            <FaqSection faqItems={faqItems} />
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhuma pergunta frequente cadastrada no momento.</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 py-12 md:py-16 lg:py-20" style={contactSectionStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {hasActiveSocialLinks ? (
            <ContactSection socialLinks={socialLinks} />
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhuma informação de contato configurada no momento.</p>
          )}
        </div>
      </section>
    </main>
  );
}
