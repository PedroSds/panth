
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/#page-top" className="flex items-center text-primary hover:opacity-80 transition-opacity -ml-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.imgur.com/4RDlzjM.png"
              alt="PanthStore Logo"
              style={{
                width: '292px',
                height: '70px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>
          <nav className="flex items-center"> {/* Adicionado flex items-center aqui */}
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
