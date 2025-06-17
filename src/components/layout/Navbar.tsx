
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Aumentado de h-16 para h-20 */}
          <Link href="/" className="flex items-center text-primary hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.imgur.com/4RDlzjM.png"
              alt="PanthStore Logo"
              style={{
                width: '266px', // Aumentado
                height: '64px', // Aumentado
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>
          <nav>
            <ul className="flex items-center space-x-4 sm:space-x-6">
              <li>
                <Link href="/#custom-account" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Pedido Personalizado
                </Link>
              </li>
              {/* Admin link removido */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
