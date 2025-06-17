
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
// Card components are no longer needed here as this form is now inside a Dialog in AccountCard
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from 'lucide-react'; // MessageSquare icon is now in AccountCard DialogHeader
import type { CustomAccountFormData } from "@/types";


const formSchema = z.object({
  accountLogin: z.string().min(3, { message: "O nome de login deve ter pelo menos 3 caracteres." }).max(100, {message: "Nome de login muito longo."}),
  nickname: z.string().min(3, { message: "O nickname deve ter pelo menos 3 caracteres." }).max(50, { message: "Nickname muito longo."}),
  description: z.string().max(500, { message: "Descrição muito longa. Máximo 500 caracteres."}).optional(),
});

interface CustomAccountFormProps {
  whatsAppPhoneNumber: string;
  // onCloseDialog?: () => void; // Optional: if needed to close dialog from within form
}

export function CustomAccountForm({ whatsAppPhoneNumber /*, onCloseDialog */ }: CustomAccountFormProps) {
  const { toast } = useToast();
  const form = useForm<CustomAccountFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountLogin: "",
      nickname: "",
      description: "",
    },
  });

  function onSubmit(data: CustomAccountFormData) {
    let message = `Olá, gostaria de solicitar uma conta personalizada com as seguintes características:\n\n`;
    message += `Nome de Login Desejado: ${data.accountLogin}\n`;
    message += `Nickname Desejado no Jogo: ${data.nickname}\n`;
    if (data.description && data.description.trim() !== "") {
      message += `Descrição Adicional: ${data.description}\n`;
    }
    message += `\nAguardo contato para discutirmos os detalhes e o orçamento.`;

    const whatsappUrl = `https://wa.me/${whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecionando para WhatsApp!",
      description: "Seu pedido de conta personalizada está pronto para ser enviado.",
    });
    form.reset();
    // onCloseDialog?.(); // Call if passed
  }

  return (
    // The outer Card has been removed as this form will be placed inside a Dialog
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4 pb-2"> {/* Added pt-4 pb-2 for spacing inside dialog */}
        <FormField
          control={form.control}
          name="accountLogin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Nome de Login Desejado</FormLabel>
              <FormControl>
                <Input placeholder="Ex: meuLoginSupremo42" {...field} />
              </FormControl>
              <FormDescription>
                Qual login você gostaria de usar para acessar a conta? (Não é o nick do jogo)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Nickname Desejado no Jogo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: PantheonInvencivel123" {...field} />
              </FormControl>
              <FormDescription>
                Como você quer ser chamado dentro do League of Legends?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Descrição Adicional (Opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ex: Gostaria de uma conta com foco em campeões magos, elo mínimo Prata, com algumas skins de Ahri se possível, etc." 
                  className="resize-none" 
                  rows={4}
                  {...field} />
              </FormControl>
              <FormDescription>
                Forneça quaisquer outros detalhes importantes sobre a conta que você procura.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
          <Send className="mr-2 h-5 w-5" />
          Solicitar Conta via WhatsApp
        </Button>
      </form>
    </Form>
  );
}
