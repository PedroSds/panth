
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Account, FaqItem, SocialLink } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  accountsData as fallbackAccountsData, 
  DEFAULT_WHATSAPP_PHONE_NUMBER, 
  initialFaqData as fallbackFaqData, 
  FAQ_LOCAL_STORAGE_KEY, 
  DEFAULT_BANNER_IMAGE_URL, 
  BANNER_IMAGE_URL_LOCAL_STORAGE_KEY, 
  SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY, 
  initialSocialLinksData, 
  socialPlatformConfig,
  DEFAULT_LOGO_IMAGE_URL,
  LOGO_IMAGE_URL_LOCAL_STORAGE_KEY,
  DEFAULT_YOUTUBE_VIDEO_URL,
  YOUTUBE_VIDEO_URL_LOCAL_STORAGE_KEY
} from '@/data/mockData';
import { AccountCard } from '@/components/AccountCard';
import { FaqSection } from '@/components/FaqSection';
import { ContactSection } from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export default function HomePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const [logoImageUrl, setLogoImageUrl] = useState(DEFAULT_LOGO_IMAGE_URL);
  const [bannerImageUrl, setBannerImageUrl] = useState(DEFAULT_BANNER_IMAGE_URL);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(DEFAULT_YOUTUBE_VIDEO_URL);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinksData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load Accounts
    const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        const parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        setAccounts(Array.isArray(parsedAccounts) ? parsedAccounts : fallbackAccountsData.map(acc => ({ ...acc })));
      } catch (error) {
        console.error("Error parsing accounts from localStorage for homepage:", error);
        setAccounts(fallbackAccountsData.map(acc => ({ ...acc })));
      }
    } else {
      setAccounts(fallbackAccountsData.map(acc => ({ ...acc })));
    }

    // Load FAQs
    const storedFaqData = localStorage.getItem(FAQ_LOCAL_STORAGE_KEY);
    if (storedFaqData) {
      try {
        const parsedFaqs = JSON.parse(storedFaqData) as FaqItem[];
        setFaqItems(Array.isArray(parsedFaqs) ? parsedFaqs : [...fallbackFaqData]);
      } catch (error) {
        console.error("Error parsing FAQs from localStorage for homepage:", error);
        setFaqItems([...fallbackFaqData]);
      }
    } else {
      setFaqItems([...fallbackFaqData]);
    }

    // Load WhatsApp Number
    const storedWhatsAppNumber = localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY);
    setWhatsAppNumber(storedWhatsAppNumber || DEFAULT_WHATSAPP_PHONE_NUMBER);

    // Load Logo Image URL
    const storedLogoImageUrl = localStorage.getItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY);
    setLogoImageUrl(storedLogoImageUrl || DEFAULT_LOGO_IMAGE_URL);

    // Load Banner Image URL
    const storedBannerImageUrl = localStorage.getItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY);
    setBannerImageUrl(storedBannerImageUrl || DEFAULT_BANNER_IMAGE_URL);

    // Load YouTube Video URL
    const storedYoutubeVideoUrl = localStorage.getItem(YOUTUBE_VIDEO_URL_LOCAL_STORAGE_KEY);
    setYoutubeVideoUrl(storedYoutubeVideoUrl || DEFAULT_YOUTUBE_VIDEO_URL);

    // Load Social Media Links
    const storedSocialLinksData = localStorage.getItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY);
    if (storedSocialLinksData) {
        try {
            const parsedStoredLinks = JSON.parse(storedSocialLinksData) as Partial<SocialLink>[];
            const mergedLinks = socialPlatformConfig.map(configPlatform => {
                const storedPlatform = parsedStoredLinks.find(p => p.key === configPlatform.key);
                return {
                    ...configPlatform,
                    url: storedPlatform?.url || '', 
                };
            });
            setSocialLinks(mergedLinks);
        } catch (error) {
            console.error("Error parsing social media links from localStorage for homepage:", error);
            setSocialLinks(initialSocialLinksData.map(link => ({...link})));
        }
    } else {
        setSocialLinks(initialSocialLinksData.map(link => ({...link})));
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar logoUrl={DEFAULT_LOGO_IMAGE_URL} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Carregando loja...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const visibleAndUnsoldAccounts = accounts.filter(acc => (!acc.isSold || acc.isCustomService) && acc.isVisible);
  const hasActiveSocialLinks = socialLinks.some(p => p.url && p.url.trim() !== '');
  const hasPrimaryContent = visibleAndUnsoldAccounts.length > 0 || (isMounted && youtubeVideoUrl);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar logoUrl={logoImageUrl} />
      <main className="flex-grow">
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="relative text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${isMounted ? bannerImageUrl : DEFAULT_BANNER_IMAGE_URL})` }}
          data-ai-hint="game hero background"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-40">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-4 text-shadow-lg">
              COMPRE SUA SMURF DE LEAGUE OF LEGENDS
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-200 mb-10 max-w-3xl mx-auto text-shadow-md">
              100% SEGURA DE BANIMENTOS
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary-foreground px-10 py-6 text-lg font-semibold">
              <Link href="/#available-accounts">VER CONTAS DISPONÍVEIS</Link>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-full text-background overflow-hidden leading-[0px]" style={{ transform: 'translateY(1px)'}}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-auto block "
                 style={{ minHeight: '40px', maxHeight: '120px' }}
            >
              <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="currentColor"></path>
            </svg>
          </div>
        </section>

        <section aria-labelledby="available-accounts-heading" className="py-12 md:py-16 lg:py-20">
          <div id="available-accounts" className="container mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
            {visibleAndUnsoldAccounts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {visibleAndUnsoldAccounts.map(account => (
                    <AccountCard key={account.id} account={account} whatsAppPhoneNumber={whatsAppNumber} />
                ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">Nenhuma conta ou serviço disponível no momento. Volte em breve!</p>
            )}
          </div>
        </section>

        {isMounted && youtubeVideoUrl && (
          <section id="youtube-video" aria-labelledby="youtube-video-heading" className="py-12 md:py-16 lg:py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex flex-col items-center sm:flex-row sm:items-center">
                  <Youtube className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mb-2 sm:mb-0 sm:mr-3" />
                  <h2 id="youtube-video-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
                    Confira nosso Destaque
                  </h2>
                </div>
              </div>
              <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg shadow-2xl overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  src={youtubeVideoUrl}
                  title="Vídeo do YouTube em destaque"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
        )}
        
        {/* SVG Divider before FAQ section */}
        {hasPrimaryContent && faqItems.length > 0 && (
          <div className="w-full text-background overflow-hidden leading-[0px]" style={{ transform: 'translateY(1px)'}}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-auto block" style={{ minHeight: '40px', maxHeight: '120px' }}>
              <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="currentColor"></path>
            </svg>
          </div>
        )}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section id="faq-container" className="py-12 md:py-16 lg:py-20">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FaqSection faqItems={faqItems} />
             </div>
          </section>
        )}

        {/* SVG Divider before Contact section */}
        {((faqItems.length > 0 && hasActiveSocialLinks) || // Case: FAQ was shown, and Contact will be shown
          (faqItems.length === 0 && hasPrimaryContent && hasActiveSocialLinks) // Case: FAQ NOT shown, but primary content was, and Contact will be shown
         ) && (
          <div className="w-full text-background overflow-hidden leading-[0px]" style={{ transform: 'translateY(1px)'}}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-auto block" style={{ minHeight: '40px', maxHeight: '120px' }}>
              <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="currentColor"></path>
            </svg>
          </div>
        )}
        
        {/* Contact Section */}
        {hasActiveSocialLinks && (
           <ContactSection socialLinks={socialLinks} />
        )}

        {/* Fallback content if no main sections are visible */}
        {visibleAndUnsoldAccounts.length === 0 && !hasActiveSocialLinks && faqItems.length === 0 && (!isMounted || !youtubeVideoUrl) && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <p className="text-muted-foreground">Nenhum conteúdo disponível no momento. Volte em breve!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

    