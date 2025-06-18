
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
import type { FeedbackItem } from "@/types";
import React, { useEffect } from "react";

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).max(50, { message: "Nome muito longo." }),
  imageUrl: z.string().url({ message: "URL da imagem inválida." }).optional().or(z.literal('')),
  text: z.string().max(500, { message: "O texto do feedback não deve exceder 500 caracteres." }).optional(),
}).refine(data => {
  // If imageUrl is provided, text is optional.
  // If imageUrl is not provided, text is required.
  if (!data.imageUrl && (!data.text || data.text.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "É necessário fornecer uma URL de imagem ou um texto para o feedback.",
  path: ["text"], // Show the error under the text field or a general form error
});


type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

interface AdminFeedbackFormProps {
  onSubmitFeedback: (data: FeedbackItem | Omit<FeedbackItem, "id">) => void;
  initialData?: FeedbackItem | null;
  onClose: () => void;
}

export function AdminFeedbackForm({ onSubmitFeedback, initialData, onClose }: AdminFeedbackFormProps) {
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      text: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        imageUrl: initialData.imageUrl || "",
        text: initialData.text || "",
      });
    } else {
      form.reset({
        name: "",
        imageUrl: "",
        text: "",
      });
    }
  }, [initialData, form]);

  function onSubmit(data: FeedbackFormData) {
    const processedData: Partial<FeedbackItem> = {
      name: data.name.trim(),
      imageUrl: data.imageUrl?.trim() || undefined,
      text: data.text?.trim() || undefined,
    };

    // Ensure that if imageUrl is empty string, it's set to undefined
    if (processedData.imageUrl === '') {
        delete processedData.imageUrl;
    }
    // Ensure that if text is empty string, it's set to undefined
    if (processedData.text === '') {
        delete processedData.text;
    }

    if (initialData) {
      onSubmitFeedback({ ...initialData, ...processedData } as FeedbackItem);
    } else {
      onSubmitFeedback(processedData as Omit<FeedbackItem, "id">);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Ex: João Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem (Opcional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://i.imgur.com/imagem.png" {...field} />
              </FormControl>
              <FormDescription>
                Se fornecida, a imagem será exibida. Use links do Imgur ou similares.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto do Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o feedback do cliente aqui..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>
                Obrigatório se nenhuma URL de imagem for fornecida.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Salvar Alterações" : "Adicionar Feedback"}</Button>
        </div>
      </form>
    </Form>
  );
}
