
"use client";

import React, { useState, useEffect } from 'react';
import type { Account } from '@/types'; // Category não é mais necessária aqui
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomAccountForm } from '@/components/CustomAccountForm';
import { accountsData as fallbackAccountsData, /* categoriesData as fallbackCategoriesData, */ DEFAULT_WHATSAPP_PHONE_NUMBER } from '@/data/mockData';
import { Separator } from '@/components/ui/separator';
import { AccountCard } from '@/components/AccountCard'; // Importar AccountCard
// import { CategoryAccordion } from '@/components/CategoryAccordion'; // Removido

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
// const CATEGORIES_LOCAL_STORAGE_KEY = 'panthStoreCategories'; // Removido
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export default function HomePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  // const [categories, setCategories] = useState<Category[]>([]); // Removido
  const [whatsAppNumber, setWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        const parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        setAccounts(Array.isArray(parsedAccounts) ? parsedAccounts : fallbackAccountsData.map(acc => ({...acc})));
      } catch (error) {
        console.error("Error parsing accounts from localStorage for homepage:", error);
        setAccounts(fallbackAccountsData.map(acc => ({...acc})));
      }
    } else {
      setAccounts(fallbackAccountsData.map(acc => ({...acc})));
    }

    // Categories não são mais carregadas aqui
    // setCategories(fallbackCategoriesData);

    const storedWhatsAppNumber = localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY);
    setWhatsAppNumber(storedWhatsAppNumber || DEFAULT_WHATSAPP_PHONE_NUMBER);

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

  const visibleAndUnsoldAccounts = accounts.filter(acc => !acc.isSold && acc.isVisible);

  // activeCategories não é mais necessário
  // const activeCategories = categories.filter(category => 
  //   visibleAndUnsoldAccounts.some(account => account.categoryId === category.id)
  // );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="hero" aria-labelledby="hero-heading" className="mb-12 text-center">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">
            PanthStore
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encontre sua conta de League of Legends perfeita! Navegue por nossas contas disponíveis ou peça uma conta personalizada.
          </p>
        </section>

        <Separator className="my-12" />

        <section id="available-accounts" aria-labelledby="available-accounts-heading" className="mb-12">
          <h2 id="available-accounts-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-center mb-8 text-foreground">
            Contas Disponíveis
          </h2>
          {visibleAndUnsoldAccounts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleAndUnsoldAccounts.map(account => (
                <AccountCard key={account.id} account={account} whatsAppPhoneNumber={whatsAppNumber} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Nenhuma conta disponível no momento. Volte em breve!</p>
          )}
        </section>
        
        <Separator className="my-12" />

        <section id="custom-account" aria-labelledby="custom-account-heading" className="pb-12 pt-8">
          <CustomAccountForm whatsAppPhoneNumber={whatsAppNumber} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
