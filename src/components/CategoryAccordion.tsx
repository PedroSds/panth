"use client";

import type { Category, Account, CategoryIconName } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccountCard } from '@/components/AccountCard';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Swords, Shield, WandSparkles, Crosshair, VenetianMask, HeartPulse, type LucideIcon, HelpCircle } from 'lucide-react';

interface CategoryAccordionProps {
  categories: Category[];
  accounts: Account[];
  whatsAppPhoneNumber: string;
}

const iconMap: Record<CategoryIconName, LucideIcon> = {
  Swords,
  Shield,
  WandSparkles,
  Crosshair,
  VenetianMask,
  HeartPulse,
};

export function CategoryAccordion({ categories, accounts, whatsAppPhoneNumber }: CategoryAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {categories.map((category) => {
        const categoryAccounts = accounts.filter(acc => acc.categoryId === category.id);
        const IconComponent = iconMap[category.icon] || HelpCircle; // Fallback to HelpCircle if icon name is not found

        return (
          <AccordionItem value={category.id} key={category.id} className="bg-card rounded-xl shadow-lg overflow-hidden border-none">
            <AccordionTrigger className="p-6 hover:no-underline text-lg font-headline font-semibold text-primary hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <IconComponent className="h-7 w-7 text-primary" />
                <span>{category.name} ({categoryAccounts.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 bg-background">
              <p className="text-muted-foreground mb-6">{category.description}</p>
              {categoryAccounts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAccounts.map(account => (
                    <AccountCard key={account.id} account={account} whatsAppPhoneNumber={whatsAppPhoneNumber} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma conta disponível nesta categoria no momento.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
