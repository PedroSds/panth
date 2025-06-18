
import Link from 'next/link';
import { DEFAULT_LOGO_IMAGE_URL } from '@/data/mockData';

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const effectiveLogoUrl = logoUrl || DEFAULT_LOGO_IMAGE_URL;

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto"> {/* Padding horizontal removido daqui */}
        <div className="flex items-center justify-between h-20">
          {/* Logotipo */}
          <Link
            href="/#page-top"
            className="pl-4 sm:pl-6 lg:pl-8 flex items-center text-primary hover:opacity-80 transition-opacity" // Padding esquerdo adicionado aqui
            aria-label="Voltar para o início da página PanthStore"
          >
            <img
              src={effectiveLogoUrl}
              alt="PanthStore Logo"
              style={{
                width: '292px',
                height: '70px',
                objectFit: 'contain',
                display: 'block',
              }}
              data-ai-hint="store logo"
            />
          </Link>

          {/* Navegação */}
          <nav className="pr-4 sm:pr-6 lg:pr-8 flex items-center"> {/* Padding direito adicionado aqui */}
            <ul className="flex items-center space-x-4 sm:space-x-6">
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
