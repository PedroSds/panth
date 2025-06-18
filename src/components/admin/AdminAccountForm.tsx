
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
import { CUSTOM_ACCOUNT_SERVICE_ID } from "@/data/mockData";


const accountFormSchema = z.object({
  mainName: z.string().min(5, { message: "Nome principal deve ter pelo menos 5 caracteres." }).max(70),
  nameSuffix: z.string().max(50).optional(),
  price: z.coerce.number().min(0, { message: "Preço deve ser positivo." }),
  details: z.string().min(10, { message: "Detalhes devem ter pelo menos 10 caracteres." }),
  image: z.string().url({ message: "URL da imagem inválida." }).or(z.literal("")),
  isVisible: z.boolean().default(true),
  isSold: z.boolean().default(false),
  automaticDeliveryLink: z.string().url({ message: "URL inválida para entrega automática." }).optional().or(z.literal('')),
});

type AccountFormData = z.infer<typeof accountFormSchema>;

interface AdminAccountFormProps {
  onSubmitAccount: (data: Account | Omit<Account, "id" | "isSold">) => void;
  initialData?: Account | null;
  onClose: () => void;
  isEditingCustomService?: boolean;
}

export function AdminAccountForm({ onSubmitAccount, initialData, onClose, isEditingCustomService }: AdminAccountFormProps) {
  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      mainName: "",
      nameSuffix: "",
      price: 0,
      details: "",
      image: "https://placehold.co/300x200.png",
      isVisible: true,
      isSold: false,
      automaticDeliveryLink: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      const nameParts = initialData.name.match(/^(.*?)\s*\((.*?)\)$/);
      let mainName = initialData.name;
      let nameSuffix = "";

      if (nameParts && nameParts.length === 3) {
        mainName = nameParts[1].trim();
        nameSuffix = nameParts[2].trim();
      }
      
      form.reset({
        mainName: mainName,
        nameSuffix: nameSuffix,
        price: initialData.price,
        details: initialData.details.join("\n"),
        image: initialData.image,
        isVisible: initialData.isVisible,
        isSold: initialData.isSold,
        automaticDeliveryLink: initialData.automaticDeliveryLink || "",
      });
    } else {
       form.reset({ 
        mainName: "",
        nameSuffix: "",
        price: 0,
        details: "",
        image: "https://placehold.co/300x200.png",
        isVisible: true,
        isSold: false,
        automaticDeliveryLink: "",
      });
    }
  }, [initialData, form]);

  function onSubmit(data: AccountFormData) {
    let finalName = data.mainName.trim();
    if (data.nameSuffix && data.nameSuffix.trim() !== "") {
      finalName = `${finalName} (${data.nameSuffix.trim()})`;
    }

    const processedData = {
      ...data,
      name: finalName,
      details: data.details.split("\n").map(d => d.trim()).filter(d => d.length > 0),
      automaticDeliveryLink: data.automaticDeliveryLink?.trim() === '' ? undefined : data.automaticDeliveryLink?.trim(),
    };

    const { mainName: _mn, nameSuffix: _ns, ...accountDataForSubmit } = processedData;


    if (initialData) {
      // Preserve isCustomService flag if editing the custom service
      const existingFlags = initialData.id === CUSTOM_ACCOUNT_SERVICE_ID ? { isCustomService: true } : {};
      // Ensure 'isSold' is not set for custom service from the form, its 'isSold' from mockData is effectively the default.
      // For actual accounts, isSold comes from the form.
      const finalIsSold = initialData.id === CUSTOM_ACCOUNT_SERVICE_ID ? initialData.isSold : accountDataForSubmit.isSold;

      onSubmitAccount({ 
        ...initialData, 
        ...accountDataForSubmit, 
        ...existingFlags,
        isSold: finalIsSold 
      });
    } else {
      onSubmitAccount(accountDataForSubmit as Omit<Account, "id" | "isSold">);
    }
    form.reset(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="mainName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Principal {isEditingCustomService ? "do Serviço" : "da Conta"}</FormLabel>
              <FormControl>
                <Input placeholder={isEditingCustomService ? "Ex: Crie sua Conta Personalizada" : "Ex: UNRANKED LVL 30+"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="nameSuffix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo {isEditingCustomService ? "do Serviço" : "da Conta"} (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder={isEditingCustomService ? "Ex: Serviço de Upar" : "Ex: PRONTA PARA RANQUEADA"} {...field} />
              </FormControl>
              <FormDescription>Texto que aparecerá entre parênteses e com menos destaque.</FormDescription>
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
                <Textarea placeholder={isEditingCustomService ? "Descreva os detalhes do serviço..." : "10.000+ essências azuis\nBaús para abrir"} className="min-h-[100px]" {...field} />
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
              <FormDescription>Use URLs do placehold.co ou outra URL de imagem pública (Ex: Imgur).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditingCustomService && (
          <FormField
            control={form.control}
            name="automaticDeliveryLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de Entrega Automática (opcional)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://seu-link-de-venda.com/produto" {...field} />
                </FormControl>
                <FormDescription>Se preenchido, um botão para compra com entrega automática aparecerá no card da conta.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex items-center space-x-4">
            <FormField
            control={form.control}
            name="isVisible"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
                <div className="space-y-0.5">
                    <FormLabel>Visível na Loja?</FormLabel>
                    <FormDescription>
                    Controla se {isEditingCustomService ? "o serviço" : "a conta"} aparece na página principal.
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
            
            {initialData?.id !== CUSTOM_ACCOUNT_SERVICE_ID && (
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
            )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{initialData ? "Salvar Alterações" : "Adicionar Conta"}</Button>
        </div>
      </form>
    </Form>
  );
}
