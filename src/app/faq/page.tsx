
"use client";

import React, { useContext } from 'react';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { FaqSection } from '@/components/FaqSection'; // Assuming FaqSection can be used directly

export default function FaqPage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Erro ao carregar dados da loja...</p>
        </main>
    );
  }

  const { faqItems, getSectionStyle, isMounted } = context;
  const faqSectionStyle = getSectionStyle('faq');

  if (!isMounted) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Carregando Perguntas Frequentes...</p>
        </main>
    );
  }

  return (
    <main className="flex-grow" style={faqSectionStyle}>
      <div id="faq-container" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 scroll-mt-20">
        {faqItems.length > 0 ? (
          <FaqSection faqItems={faqItems} />
        ) : (
          <p className="text-center text-muted-foreground py-8">Nenhuma pergunta frequente cadastrada no momento.</p>
        )}
      </div>
    </main>
  );
}
