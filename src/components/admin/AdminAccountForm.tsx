
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
import { Switch } from "@/components/ui/switch";
import type { Account } from "@/types";
import { useEffect } from "react";

const accountFormSchema = z.object({
  name: z.string().min(5, { message: "Nome deve ter pelo menos 5 caracteres." }).max(100),
  price: z.coerce.number().min(0, { message: "Preço deve ser positivo." }),
  details: z.string().min(10, { message: "Detalhes devem ter pelo menos 10 caracteres." }),
  image: z.string().url({ message: "URL da imagem inválida." }).or(z.literal("")),
  imageHint: z.string().max(50).optional(),
  isVisible: z.boolean().default(true),
  isSold: z.boolean().default(false),
});

type AccountFormData = z.infer<typeof accountFormSchema>;

interface AdminAccountFormProps {
  onSubmitAccount: (data: Account | Omit<Account, "id" | "isSold">) => void;
  initialData?: Account | null;
  onClose: () => void;
}

export function AdminAccountForm({ onSubmitAccount, initialData, onClose }: AdminAccountFormProps) {
  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      details: "",
      image: "https://placehold.co/300x200.png",
      imageHint: "game account",
      isVisible: true,
      isSold: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        details: initialData.details.join("\n"), // Convert array to string for textarea
      });
    } else {
       form.reset({ // Reset to default for new account
        name: "",
        price: 0,
        details: "",
        image: "https://placehold.co/300x200.png",
        imageHint: "game account",
        isVisible: true,
        isSold: false,
      });
    }
  }, [initialData, form]);

  function onSubmit(data: AccountFormData) {
    const processedData = {
      ...data,
      details: data.details.split("\n").map(d => d.trim()).filter(d => d.length > 0), // Convert string to array
    };

    if (initialData) {
      onSubmitAccount({ ...initialData, ...processedData });
    } else {
      onSubmitAccount(processedData);
    }
    form.reset(); // Reset form after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Conta</FormLabel>
              <FormControl>
                <Input placeholder="Ex: UNRANKED LVL 30+ (PRONTA)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Ex: 85.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalhes (um por linha)</FormLabel>
              <FormControl>
                <Textarea placeholder="10.000+ essências azuis\nBaús para abrir" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/300x200.png" {...field} />
              </FormControl>
              <FormDescription>Use URLs do placehold.co ou outra URL de imagem pública.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dica para IA da Imagem (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: lol account" {...field} />
              </FormControl>
              <FormDescription>Máximo 2 palavras para busca de imagem (ex: 'warrior sword').</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4">
            <FormField
            control={form.control}
            name="isVisible"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
                <div className="space-y-0.5">
                    <FormLabel>Visível na Loja?</FormLabel>
                    <FormDescription>
                    Controla se a conta aparece na página principal.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="isSold"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
                <div className="space-y-0.5">
                    <FormLabel>Marcada como Vendida?</FormLabel>
                     <FormDescription>
                     Indica se a conta já foi vendida.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                </FormItem>
            )}
            />
        </div>


        <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{initialData ? "Salvar Alterações" : "Adicionar Conta"}</Button>
        </div>
      </form>
    </Form>
  );
}
