
"use client";

import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border py-8 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear ? currentYear : ''} PanthStore. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          PanthStore é uma plataforma independente e não afiliada à Riot Games.
        </p>
      </div>
    </footer>
  );
}
