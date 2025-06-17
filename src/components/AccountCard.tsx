
"use client";

import Image from 'next/image';
import { BadgeCheck, ShoppingCart, ExternalLink, Wrench, MessageSquare } from 'lucide-react';
import type { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CustomAccountForm } from './CustomAccountForm';
import React, { useState } from 'react';


interface AccountCardProps {
  account: Account;
  whatsAppPhoneNumber: string;
}

export function AccountCard({ account, whatsAppPhoneNumber }: AccountCardProps) {
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);

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
        <CardTitle className={`text-2xl font-headline font-bold text-primary ${subTitle ? 'mb-1' : 'mb-2'}`}>{mainName}</CardTitle>
        {subTitle && (
          <p className="text-sm font-medium text-accent mb-2">{subTitle}</p>
        )}
        
        <CardDescription className="text-2xl font-bold text-primary mb-3">
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
        {account.isCustomService ? (
          <Dialog open={isCustomFormOpen} onOpenChange={setIsCustomFormOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label="Personalizar minha conta"
              >
                <Wrench className="mr-2 h-5 w-5" />
                Personalizar Minha Conta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <MessageSquare className="h-8 w-8" />
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-headline font-bold text-primary text-center">Solicite sua Conta Personalizada</DialogTitle>
                <DialogDescription className="text-md text-muted-foreground text-center">
                  Descreva a conta dos seus sonhos abaixo e enviaremos seu pedido via WhatsApp!
                </DialogDescription>
              </DialogHeader>
              <CustomAccountForm whatsAppPhoneNumber={whatsAppPhoneNumber} />
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            onClick={handlePurchase}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            aria-label={`Comprar conta ${account.name}`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Comprar via WhatsApp
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
