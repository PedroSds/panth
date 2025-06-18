
"use client";

import type { FaqItem, LucideIconName } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star, Clock, CalendarDays, Anchor, Wallet, CreditCard, HelpCircle, Info, MessageSquare, ShieldQuestion, BookOpen, Tag, Users, Truck, ShieldCheck, CircleDollarSign,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  faqItems: FaqItem[];
}

const iconMap: Record<LucideIconName, LucideIcon> = {
  Star,
  Clock,
  CalendarDays,
  Anchor,
  Wallet,
  CreditCard,
  HelpCircle,
  Info,
  MessageSquare,
  ShieldQuestion,
  BookOpen,
  Tag,
  Users,
  Truck,
  ShieldCheck,
  CircleDollarSign,
};

export function FaqSection({ faqItems }: FaqSectionProps) {
  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center">
          <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-accent mr-2 sm:mr-3" />
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
            Perguntas Frequentes (FAQ)
          </h2>
        </div>
      </div>
      <Accordion type="multiple" className="w-full max-w-3xl mx-auto space-y-3">
        {faqItems.map((item) => {
          const IconComponent = iconMap[item.icon] || HelpCircle;
          return (
            <AccordionItem value={item.id} key={item.id} className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
              <AccordionTrigger className={cn(
                "p-4 sm:p-6 hover:no-underline text-left font-semibold text-primary hover:bg-secondary/10 transition-colors w-full",
                "[&[data-state=open]>svg.lucide-chevron-down]:text-primary [&[data-state=closed]>svg.lucide-chevron-down]:text-primary/70"
              )}>
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-accent flex-shrink-0" />
                  <span className="flex-grow">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 sm:p-6 pt-0 bg-background">
                <p className="text-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

