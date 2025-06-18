
"use client";

import Image from 'next/image';
import { BadgeCheck, ShoppingCart, Wrench, MessageSquare } from 'lucide-react';
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
            data-ai-hint="game account"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <CardTitle className={`text-2xl font-bold text-primary ${subTitle ? 'mb-1' : 'mb-2'}`}>{mainName}</CardTitle>
        {subTitle && (
          <p className="text-sm font-medium text-secondary mb-2">{subTitle}</p>
        )}
        
        <CardDescription className="text-2xl font-bold text-primary mb-3">
          R$ {account.price.toFixed(2)}
        </CardDescription>

        <ul className="space-y-1 text-sm text-primary mb-4">
          {account.details.map((detail, index) => (
            <li key={index} className="flex items-center">
              <BadgeCheck className="h-4 w-4 mr-2 text-secondary flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 border-t items-end">
        {account.isCustomService ? (
          <Dialog open={isCustomFormOpen} onOpenChange={setIsCustomFormOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label="Personalizar minha conta"
              >
                <Wrench className="h-5 w-5" />
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
          account.automaticDeliveryLink && account.automaticDeliveryLink.trim() !== '' ? (
            <Button
              asChild
              variant="success"
              className="w-full"
              aria-label={`Comprar ${account.name}`}
            >
              <a href={account.automaticDeliveryLink} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="h-5 w-5" />
                Comprar Conta
              </a>
            </Button>
          ) : (
            <div className="w-full text-center">
              <p className="text-sm text-muted-foreground">Detalhes sobre a compra via admin/config.</p>
            </div>
          )
        )}
      </CardFooter>
    </Card>
  );
}
