
"use client";

import React, { useContext } from 'react';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { AccountCard } from '@/components/AccountCard';
import { CUSTOM_ACCOUNT_SERVICE_ID } from '@/data/mockData';

export default function ContasPage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Erro ao carregar dados da loja...</p>
        </main>
    );
  }

  const { accounts, whatsAppNumber, getSectionStyle, isMounted } = context;

  if (!isMounted) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Carregando contas...</p>
        </main>
    );
  }

  const visibleAndUnsoldAccounts = accounts.filter(acc => (!acc.isSold || acc.isCustomService) && acc.isVisible);
  const accountsSectionStyle = getSectionStyle('accounts');

  return (
    <main className="flex-grow" style={accountsSectionStyle}>
      <div id="available-accounts-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 scroll-mt-20"> {/* Added scroll-mt-20 for navbar offset */}
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-10 text-center">
          Contas e Serviços Disponíveis
        </h1>
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
    </main>
  );
}
