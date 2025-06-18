
"use client";

import type { SocialLink } from '@/types';
import { Share2 } from 'lucide-react';
import Link from 'next/link';

interface ContactSectionProps {
  socialLinks: SocialLink[];
}

export function ContactSection({ socialLinks }: ContactSectionProps) {
  const activeLinks = socialLinks.filter(link => link.url && link.url.trim() !== '');

  if (activeLinks.length === 0) {
    return null;
  }

  const count = activeLinks.length;
  let gridLayoutClasses = "";

  if (count === 1) {
    gridLayoutClasses = "grid grid-cols-1 gap-4 max-w-sm mx-auto";
  } else if (count === 2) {
    gridLayoutClasses = "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto";
  } else { // 3 or more
    gridLayoutClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto";
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-10">
          <Share2 className="h-8 w-8 text-accent mr-3" />
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-center text-primary">
            Nossas Redes Sociais
          </h2>
        </div>
        <div className={gridLayoutClasses}>
          {activeLinks.map((link) => {
            const LucideIconComponent = link.lucideIcon;
            return (
              <Link
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-4 rounded-lg shadow-md hover:bg-muted transition-colors flex items-center justify-center space-x-3 border border-border"
                aria-label={`Visite nosso ${link.name}`}
              >
                {LucideIconComponent && (
                  <LucideIconComponent className="h-6 w-6 text-accent" />
                )}
                <span className="text-lg font-semibold text-primary">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
