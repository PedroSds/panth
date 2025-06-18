
"use client";

import type { SocialMediaLinks, SocialLink } from '@/types';
import { Share2 } from 'lucide-react';
import Link from 'next/link';

interface ContactSectionProps {
  socialLinks: SocialMediaLinks;
  socialPlatforms: SocialLink[]; // Config with names, placeholders, icons
}

// Inline SVG for Discord as lucide-react doesn't have a direct one
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.21.375-.444.864-.608 1.229a18.258 18.258 0 00-5.484 0 12.142 12.142 0 00-.622-1.229.076.076 0 00-.078-.037A19.791 19.791 0 003.683 4.37a.077.077 0 00-.035.079C3.135 6.446 2.23 10.631 4.294 13.3S8.166 17.44 11.941 17.44s7.648-2.562 9.677-5.279a.076.076 0 00-.035-.08c-.701-.396-1.237-.737-1.632-1.027a.073.073 0 00-.09-.004 11.275 11.275 0 01-2.47.852.076.076 0 00-.045.085 9.082 9.082 0 01-.47 1.471.075.075 0 00.018.095c.33.164.636.303.896.415a.076.076 0 00.093-.027c.36-.442.64-.99.846-1.536a.075.075 0 00-.017-.096 12.119 12.119 0 00-2.243-.88.076.076 0 00-.064.007c-.396.204-.77.415-1.104.612a.076.076 0 00-.027.067c.034.134.06.277.077.415a.075.075 0 00.086.067c2.011-.613 3.528-1.909 4.626-3.275a.075.075 0 00.008-.095C20.37 4.556 20.348 4.463 20.317 4.369zM8.02 12.31c-.925 0-1.678-.781-1.678-1.744s.753-1.744 1.678-1.744c.926 0 1.678.78 1.678 1.744s-.752 1.744-1.678 1.744zm7.963 0c-.925 0-1.678-.781-1.678-1.744s.753-1.744 1.678-1.744c.925 0 1.678.78 1.678 1.744s-.753 1.744-1.678 1.744z"/></svg>
);


export function ContactSection({ socialLinks, socialPlatforms }: ContactSectionProps) {
  const activeLinks = socialPlatforms.filter(platform => socialLinks[platform.key] && socialLinks[platform.key].trim() !== '');

  if (activeLinks.length === 0) {
    return null;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {activeLinks.map((platform) => {
            const IconComponent = platform.key === 'discord' ? DiscordIcon : platform.icon;
            return (
              <Link
                key={platform.key}
                href={socialLinks[platform.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card p-4 rounded-lg shadow-md hover:bg-muted transition-colors flex items-center justify-center space-x-3 border border-border"
                aria-label={`Visite nosso ${platform.name}`}
              >
                {IconComponent && <IconComponent className="h-6 w-6 text-accent" />}
                <span className="text-lg font-medium text-[hsl(var(--primary))]">{platform.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
