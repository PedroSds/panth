
"use client";

import Image from 'next/image';
import { BadgeCheck, ShoppingCart, ExternalLink } from 'lucide-react';
import type { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AccountCardProps {
  account: Account;
  whatsAppPhoneNumber: string;
}

export function AccountCard({ account, whatsAppPhoneNumber }: AccountCardProps) {
  const handlePurchase = () => {
    const message = `Olá, tenho interesse na conta "${account.name}" (ID: ${account.id}) no valor de R$${account.price.toFixed(2)}. Poderia me passar mais informações?`;
    const whatsappUrl = `https://wa.me/${whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nameParts = account.name.match(/^(.*?)\s*\((.*?)\)$/);
  let mainName = account.name;
  let subTitle: string | null = null;

  if (nameParts && nameParts.length === 3) {
    mainName = nameParts[1].trim();
    subTitle = nameParts[2].trim();
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative w-full">
          <Image
            src={account.image}
            alt={`Imagem da conta ${account.name}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={account.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <CardTitle className={`text-xl font-headline font-semibold text-primary ${subTitle ? 'mb-1' : 'mb-2'}`}>{mainName}</CardTitle>
        {subTitle && (
          <p className="text-sm font-medium text-muted-foreground mb-2">{subTitle}</p>
        )}
        <CardDescription className="text-2xl font-bold text-accent mb-3">
          R$ {account.price.toFixed(2)}
        </CardDescription>
        <ul className="space-y-1 text-sm text-muted-foreground mb-4">
          {account.details.map((detail, index) => (
            <li key={index} className="flex items-center">
              <BadgeCheck className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 border-t">
        <Button
          onClick={handlePurchase}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label={`Comprar conta ${account.name}`}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Comprar via WhatsApp
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
