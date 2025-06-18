
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Account, FaqItem } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { accountsData as fallbackAccountsData, DEFAULT_WHATSAPP_PHONE_NUMBER, initialFaqData as fallbackFaqData, FAQ_LOCAL_STORAGE_KEY, DEFAULT_BANNER_IMAGE_URL, BANNER_IMAGE_URL_LOCAL_STORAGE_KEY } from '@/data/mockData';
import { AccountCard } from '@/components/AccountCard';
import { FaqSection } from '@/components/FaqSection';
import { Button } from '@/components/ui/button';

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export default function HomePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const [bannerImageUrl, setBannerImageUrl] = useState(DEFAULT_BANNER_IMAGE_URL);
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

    // Load Banner Image URL
    const storedBannerImageUrl = localStorage.getItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY);
    setBannerImageUrl(storedBannerImageUrl || DEFAULT_BANNER_IMAGE_URL);

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Carregando loja...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const visibleAndUnsoldAccounts = accounts.filter(acc => (!acc.isSold || acc.isCustomService) && acc.isVisible);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
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
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-semibold">
              <Link href="/#available-accounts">Ver Contas Disponíveis</Link>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-full text-background overflow-hidden leading-[0px]" style={{ transform: 'translateY(1px)'}}>
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-auto block "
                 style={{ minHeight: '60px', maxHeight: '150px' }}
            >
              <path d="M0,20 Q720,70 1440,20 L1440,100 L0,100 Z" fill="currentColor"></path>
            </svg>
          </div>
        </section>

        <section id="available-accounts" aria-labelledby="available-accounts-heading" className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="available-accounts-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-center mb-8 text-foreground">
                Contas e Serviços Disponíveis
            </h2>
            {visibleAndUnsoldAccounts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleAndUnsoldAccounts.map(account => (
                    <AccountCard key={account.id} account={account} whatsAppPhoneNumber={whatsAppNumber} />
                ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">Nenhuma conta ou serviço disponível no momento. Volte em breve!</p>
            )}
          </div>
        </section>

        {/* Wave Divider between Accounts and FAQ */}
        {visibleAndUnsoldAccounts.length > 0 && faqItems.length > 0 && (
          <div className="w-full text-background overflow-hidden leading-[0px]" style={{ transform: 'translateY(1px)'}}>
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-auto block" style={{ minHeight: '60px', maxHeight: '150px' }}>
              <path d="M0,20 Q720,70 1440,20 L1440,100 L0,100 Z" fill="currentColor"></path>
            </svg>
          </div>
        )}

        {faqItems.length > 0 && (
          <section id="faq" className="py-12 md:py-16 lg:py-20">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FaqSection faqItems={faqItems} />
             </div>
          </section>
        )}

        {/* Fallback message if both accounts and FAQ are empty and were not rendered above */}
        {visibleAndUnsoldAccounts.length === 0 && faqItems.length === 0 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <p className="text-muted-foreground">Nenhum conteúdo disponível no momento. Volte em breve!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
