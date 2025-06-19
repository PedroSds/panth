
"use client";

import { useState, useContext } from 'react';
import Link from 'next/link';
import { DEFAULT_LOGO_IMAGE_URL } from '@/data/mockData';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl: logoUrlProp }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const effectiveLogoUrl = logoUrlProp || DEFAULT_LOGO_IMAGE_URL;

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/#contas", label: "Contas" },
    { href: "/#video-player", label: "Vídeo" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contato" },
  ];

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/" 
            className="flex items-center text-primary hover:opacity-80 transition-opacity"
            aria-label="Voltar para o início da página PanthStore"
          >
            <img
              src={effectiveLogoUrl}
              alt="PanthStore Logo"
              style={{
                height: '70px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              data-ai-hint="store logo"
            />
          </Link>

          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-4 md:space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-medium text-foreground hover:text-primary hover:underline underline-offset-4 active:text-accent active:font-semibold transition-all duration-200 ease-in-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="h-14 w-14" aria-label="Abrir menu de navegação">
                  <Menu className="h-14 w-14" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-card">
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                <nav className="flex flex-col space-y-5 pt-8 text-lg">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
