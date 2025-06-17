"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageSquare } from 'lucide-react';
import type { CustomAccountFormData } from "@/types";


const formSchema = z.object({
  desiredNickname: z.string().min(3, { message: "Nickname deve ter pelo menos 3 caracteres." }).max(50),
  desiredLogin: z.string().min(3, { message: "Login desejado deve ter pelo menos 3 caracteres." }).max(100, {message: "Login muito longo. Descreva brevemente o tipo de conta ou campeões principais."}),
  desiredPassword: z.string().optional(), // Interpreting password as additional details
});

interface CustomAccountFormProps {
  whatsAppPhoneNumber: string;
}

export function CustomAccountForm({ whatsAppPhoneNumber }: CustomAccountFormProps) {
  const { toast } = useToast();
  const form = useForm<CustomAccountFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredNickname: "",
      desiredLogin: "",
      desiredPassword: "",
    },
  });

  function onSubmit(data: CustomAccountFormData) {
    let message = `Olá, gostaria de solicitar uma conta personalizada com as seguintes características:\n`;
    message += `Nickname Desejado: ${data.desiredNickname}\n`;
    message += `Login/Tipo de Conta: ${data.desiredLogin}\n`;
    if (data.desiredPassword) {
      message += `Detalhes Adicionais (Senha/Especificações): ${data.desiredPassword}\n`;
    }
    message += `\nAguardo contato.`;

    const whatsappUrl = `https://wa.me/${whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecionando para WhatsApp!",
      description: "Seu pedido de conta personalizada está pronto para ser enviado.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary border-2">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <MessageSquare className="h-8 w-8" />
        </div>
        <CardTitle id="custom-account-heading" className="text-2xl sm:text-3xl font-headline font-bold text-primary">Peça sua Conta Personalizada</CardTitle>
        <CardDescription className="text-md text-muted-foreground">
          Não encontrou o que procurava? Descreva a conta dos seus sonhos e faremos o possível para encontrá-la!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="desiredNickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nickname Desejado</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: PantheonInvencivel" {...field} />
                  </FormControl>
                  <FormDescription>
                    Qual nick você gostaria na sua nova conta?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredLogin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Login / Tipo de Conta / Campeões Principais</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Conta com Yasuo e Yone, Elo Ouro" {...field} />
                  </FormControl>
                  <FormDescription>
                    Especifique o login desejado, tipo de conta (ex: muitos campeões, skins raras) ou campeões que você mais quer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Senha / Detalhes Adicionais (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Skins específicas, elo mínimo, etc." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Forneça quaisquer outros detalhes importantes, como senha preferida (se aplicável), skins específicas, ou faixa de elo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Send className="mr-2 h-5 w-5" />
              Solicitar via WhatsApp
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
