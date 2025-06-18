
import Link from 'next/link';
import { DEFAULT_LOGO_IMAGE_URL } from '@/data/mockData';

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const effectiveLogoUrl = logoUrl || DEFAULT_LOGO_IMAGE_URL;

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6"> {/* Adjusted padding for responsiveness */}
        <div className="flex items-center justify-between h-20">
          {/* Logotipo */}
          <Link
            href="/#page-top"
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

          {/* Navegação */}
          <nav className="flex items-center">
            <ul className="flex items-center space-x-4 md:space-x-6"> {/* Responsive spacing for nav links */}
              <li>
                <Link
                  href="/#page-top"
                  className="text-base font-medium text-foreground hover:text-primary hover:underline underline-offset-4 active:text-accent active:font-semibold transition-all duration-200 ease-in-out"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#available-accounts"
                  className="text-base font-medium text-foreground hover:text-primary hover:underline underline-offset-4 active:text-accent active:font-semibold transition-all duration-200 ease-in-out"
                >
                  Contas
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-base font-medium text-foreground hover:text-primary hover:underline underline-offset-4 active:text-accent active:font-semibold transition-all duration-200 ease-in-out"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-base font-medium text-foreground hover:text-primary hover:underline underline-offset-4 active:text-accent active:font-semibold transition-all duration-200 ease-in-out"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
