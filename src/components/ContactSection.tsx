
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

// Inline SVG for WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.52C8.75 21.33 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.64C16.57 3.64 20.31 7.38 20.31 11.91C20.31 16.44 16.57 20.18 12.04 20.18C10.48 20.18 8.99 19.72 7.76 18.9L7.32 18.66L4.49 19.55L5.41 16.81L5.15 16.36C4.22 14.96 3.77 13.28 3.77 11.91C3.77 7.38 7.51 3.64 12.04 3.64M17.46 14.85C17.18 15.24 16.26 15.76 15.82 15.81C15.38 15.86 14.79 16.04 14.16 15.65C13.48 15.24 12.62 14.46 11.69 13.46C10.59 12.29 9.83 11.29 9.59 10.89C9.35 10.5 9.06 10.06 9.21 9.76C9.35 9.47 9.63 9.24 9.87 9.03C10.09 8.84 10.24 8.71 10.39 8.46C10.53 8.24 10.48 8.06 10.34 7.87L9.8 6.45C9.71 6.21 9.42 6.12 9.18 6.22C8.93 6.31 8.55 6.54 8.28 6.81C8.01 7.09 7.66 7.44 7.66 8.03C7.66 8.62 8.02 9.46 8.12 9.61C8.22 9.76 9.03 11.16 10.45 12.32C11.87 13.48 12.75 13.82 13.4 14.05C14.05 14.28 14.75 14.23 15.09 13.99C15.48 13.71 16.39 13.03 16.62 12.51C16.84 11.98 16.84 11.54 16.75 11.4C16.65 11.25 16.43 11.16 16.15 11.02C15.87 10.88 14.86 10.39 14.62 10.29C14.38 10.2 14.24 10.15 14.09 10.4C13.95 10.64 13.48 11.24 13.34 11.4C13.2 11.54 13.05 11.59 12.78 11.45C12.51 11.31 11.65 11.01 10.76 10.1C10.02 9.34 9.54 8.56 9.35 8.21C9.15 7.87 9.3 7.67 9.45 7.52C9.58 7.39 9.72 7.23 9.87 7.09C10.01 6.94 10.2 6.77 10.34 6.68C10.49 6.58 10.58 6.41 10.54 6.22C10.49 6.02 10.01 4.76 9.77 4.28C9.54 3.82 9.3 3.77 9.12 3.77C8.94 3.77 8.71 3.77 8.53 3.77C8.35 3.77 8.07 3.82 7.84 4.06C7.62 4.3 7.19 4.76 7.19 5.65C7.19 6.54 7.85 7.38 7.99 7.57C8.14 7.77 8.95 9.17 10.37 10.33C11.38 11.16 11.99 11.53 12.49 11.76C13.02 12 13.39 11.97 13.67 11.92C13.99 11.85 14.75 11.42 14.94 11.14C15.13 10.85 15.13 10.56 15.08 10.46C15.03 10.36 14.94 10.31 14.75 10.27C14.56 10.22 14.05 10.04 13.86 9.99C13.67 9.95 13.53 9.99 13.43 10.14C13.34 10.28 13.01 10.75 12.87 10.94C12.73 11.14 12.58 11.18 12.36 11.09C11.92 10.89 11.11 10.56 10.42 9.84C9.62 9.02 9.06 8.06 9.06 7.52C9.06 7.12 9.15 6.82 9.25 6.63C9.35 6.43 9.59 6.19 9.87 6.05C10.15 5.91 10.39 5.86 10.58 5.86C10.78 5.86 11.21 5.91 11.35 6.15L11.59 6.58C11.73 6.82 11.78 7.06 11.88 7.25C11.97 7.44 12.02 7.64 12.02 7.78C12.02 7.87 11.97 7.97 11.92 8.06C11.88 8.16 11.78 8.25 11.69 8.35C11.59 8.44 11.45 8.58 11.31 8.73C11.02 9.02 10.88 9.16 10.88 9.36C10.88 9.55 10.93 9.7 11.02 9.79C11.12 9.89 11.22 9.94 11.31 9.99C11.41 10.04 11.74 10.13 12.18 10.33C12.62 10.52 12.86 10.62 13.01 10.76C13.15 10.91 13.25 11.05 13.25 11.19C13.25 11.29 13.25 11.38 13.2 11.48C13.15 11.57 13.01 11.71 12.82 11.85C12.63 12 12.34 12.19 11.76 12.38C11.17 12.57 10.78 12.62 10.64 12.67C10.5 12.71 10.12 12.85 10.12 13.14C10.12 13.38 10.41 13.61 10.55 13.76C10.7 13.9 10.79 13.95 10.94 14.05C11.08 14.14 11.23 14.23 11.43 14.33C11.62 14.42 11.76 14.52 11.86 14.57C11.96 14.61 12.1 14.71 12.2 14.76C12.54 14.95 12.73 15.09 13.12 15.24C13.51 15.38 13.81 15.43 14.05 15.43C14.29 15.43 14.62 15.38 14.86 15.29C15.1 15.19 15.67 14.89 15.96 14.55C16.25 14.21 16.54 14.02 16.78 13.92C17.02 13.82 17.27 13.85 17.46 14.05L17.46 14.85Z"></path>
  </svg>
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
            let IconComponent = platform.icon;
            if (platform.key === 'discord') {
              IconComponent = DiscordIcon;
            } else if (platform.key === 'whatsapp') {
              IconComponent = WhatsAppIcon;
            }
            
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
                <span className="text-lg font-medium text-primary">{platform.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

