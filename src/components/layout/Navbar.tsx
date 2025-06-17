import Link from 'next/link';
import { ShieldCheck } from 'lucide-react'; // Using a generic "trust" icon for PanthStore

export function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-2xl font-headline font-bold">PanthStore</span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-4 sm:space-x-6">
              {/* Link para contas foi removido pois não há mais seção de categorias */}
              <li>
                <Link href="/#custom-account" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Pedido Personalizado
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
