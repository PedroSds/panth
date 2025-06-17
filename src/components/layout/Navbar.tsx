
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Image
              src="https://i.imgur.com/4RDlzjM.png"
              alt="PanthStore Logo"
              width={167}
              height={40}
              className="object-contain" // Added object-contain
              data-ai-hint="company logo"
            />
          </Link>
          <nav>
            <ul className="flex items-center space-x-4 sm:space-x-6">
              <li>
                <Link href="/#custom-account" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Pedido Personalizado
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
