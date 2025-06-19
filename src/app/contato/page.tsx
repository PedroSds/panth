
"use client";

import React, { useContext } from 'react';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { ContactSection } from '@/components/ContactSection'; // Assuming ContactSection can be used directly

export default function ContatoPage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Erro ao carregar dados da loja...</p>
        </main>
    );
  }

  const { socialLinks, getSectionStyle, isMounted } = context;
  const contactSectionStyle = getSectionStyle('contact');

  if (!isMounted) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Carregando informações de contato...</p>
        </main>
    );
  }
  
  const hasActiveSocialLinks = socialLinks.some(p => p.url && p.url.trim() !== '');

  return (
    <main className="flex-grow" style={contactSectionStyle}>
      <div id="contact-outer-wrapper" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 scroll-mt-20">
        {hasActiveSocialLinks ? (
          <ContactSection socialLinks={socialLinks} />
        ) : (
          <p className="text-center text-muted-foreground py-8">Nenhuma informação de contato configurada no momento.</p>
        )}
      </div>
    </main>
  );
}
