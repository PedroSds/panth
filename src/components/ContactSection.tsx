
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

// New Inline SVG for WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.52C8.75 21.33 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM16.64 14.47C16.39 14.86 15.35 15.43 14.98 15.48C14.61 15.53 14.08 15.73 13.45 15.34C12.82 14.95 11.98 14.18 11.18 13.2C10.24 12.1 9.54 11.12 9.3 10.73C9.06 10.34 8.78 9.9 8.93 9.6C9.07 9.31 9.35 9.08 9.59 8.87C9.81 8.68 9.96 8.55 10.11 8.3C10.25 8.08 10.2 7.9 10.06 7.71L9.52 6.29C9.43 6.05 9.14 5.96 8.9 6.06C8.65 6.15 8.27 6.38 8 6.65C7.73 6.93 7.38 7.28 7.38 7.87C7.38 8.46 7.74 9.3 7.84 9.45C7.94 9.6 8.75 11 10.17 12.16C11.59 13.32 12.47 13.66 13.12 13.89C13.77 14.12 14.47 14.07 14.81 13.83C15.2 13.55 16.11 12.87 16.34 12.35C16.56 11.82 16.56 11.38 16.47 11.24C16.37 11.09 16.15 11 15.87 10.86C15.59 10.72 14.58 10.23 14.34 10.13C14.1 10.04 13.96 9.99 13.81 10.24C13.67 10.48 13.2 11.08 13.06 11.24C12.92 11.38 12.77 11.43 12.5 11.29C12.23 11.15 11.37 10.85 10.48 9.94C9.74 9.18 9.26 8.4 9.07 8.05C8.87 7.71 9.02 7.51 9.17 7.36C9.3 7.23 9.44 7.07 9.59 6.93C9.73 6.78 9.92 6.61 10.06 6.52C10.21 6.42 10.3 6.25 10.26 6.06C10.21 5.86 9.73 4.6 9.49 4.12C9.26 3.66 9.02 3.61 8.84 3.61C8.66 3.61 8.43 3.61 8.25 3.61C8.07 3.61 7.79 3.66 7.56 3.9C7.34 4.14 6.91 4.6 6.91 5.49C6.91 6.38 7.57 7.22 7.71 7.41C7.86 7.61 8.67 9.01 10.09 10.17C11.1 11 11.71 11.37 12.21 11.6C12.74 11.84 13.11 11.81 13.39 11.76C13.71 11.69 14.47 11.26 14.66 10.98C14.85 10.69 14.85 10.4 14.8 10.3C14.75 10.2 14.66 10.15 14.47 10.11C14.28 10.06 13.77 9.88 13.58 9.83C13.39 9.79 13.25 9.83 13.15 9.98C13.06 10.12 12.73 10.59 12.59 10.78C12.45 10.98 12.3 11.02 12.08 10.93C11.64 10.73 10.83 10.4 10.14 9.68C9.34 8.86 8.78 7.9 8.78 7.36C8.78 6.96 8.87 6.66 8.97 6.47C9.07 6.27 9.31 6.03 9.59 5.89C9.87 5.75 10.11 5.7 10.3 5.7C10.5 5.7 10.93 5.75 11.07 5.99L11.31 6.42C11.45 6.66 11.5 6.9 11.6 7.09C11.69 7.28 11.74 7.48 11.74 7.62C11.74 7.71 11.69 7.81 11.64 7.9C11.6 8 11.5 8.09 11.41 8.19C11.31 8.28 11.17 8.42 11.03 8.57C10.74 8.86 10.6 9 10.6 9.2C10.6 9.39 10.65 9.54 10.74 9.63C10.84 9.73 10.94 9.78 11.03 9.83C11.13 9.88 11.46 9.97 11.9 10.17C12.34 10.36 12.58 10.46 12.73 10.6C12.87 10.75 12.97 10.89 12.97 11.03C12.97 11.13 12.97 11.22 12.92 11.32C12.87 11.41 12.73 11.55 12.54 11.69C12.35 11.84 12.06 12.03 11.48 12.22C10.89 12.41 10.5 12.46 10.36 12.51C10.22 12.55 9.84 12.69 9.84 12.98C9.84 13.22 10.13 13.45 10.27 13.6C10.42 13.74 10.51 13.79 10.66 13.89C10.8 13.98 10.95 14.07 11.15 14.17C11.34 14.26 11.48 14.36 11.58 14.41C11.68 14.45 11.82 14.55 11.92 14.6C12.26 14.79 12.45 14.93 12.84 15.08C13.23 15.22 13.53 15.27 13.77 15.27C14.01 15.27 14.34 15.22 14.58 15.13C14.82 15.03 15.39 14.73 15.68 14.39C15.97 14.05 16.26 13.86 16.5 13.76C16.74 13.66 16.99 13.69 17.18 13.89L17.18 14.47L16.64 14.47Z" />
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

