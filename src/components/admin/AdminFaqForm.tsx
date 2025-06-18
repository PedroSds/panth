
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FaqItem, LucideIconName } from "@/types";
import { useEffect } from "react";
import { faqIconList } from "@/data/mockData";

const faqFormSchema = z.object({
  question: z.string().min(5, { message: "A pergunta deve ter pelo menos 5 caracteres." }).max(200),
  answer: z.string().min(10, { message: "A resposta deve ter pelo menos 10 caracteres." }).max(1000),
  icon: z.custom<LucideIconName>((val) => faqIconList.some(icon => icon.value === val), {
    message: "Ícone inválido selecionado.",
  }),
});

type FaqFormData = z.infer<typeof faqFormSchema>;

interface AdminFaqFormProps {
  onSubmitFaq: (data: FaqItem | Omit<FaqItem, "id">) => void;
  initialData?: FaqItem | null;
  onClose: () => void;
}

export function AdminFaqForm({ onSubmitFaq, initialData, onClose }: AdminFaqFormProps) {
  const form = useForm<FaqFormData>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      icon: "HelpCircle" as LucideIconName,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        question: initialData.question,
        answer: initialData.answer,
        icon: initialData.icon,
      });
    } else {
      form.reset({
        question: "",
        answer: "",
        icon: "HelpCircle" as LucideIconName,
      });
    }
  }, [initialData, form]);

  function onSubmit(data: FaqFormData) {
    if (initialData) {
      onSubmitFaq({ ...initialData, ...data });
    } else {
      onSubmitFaq(data as Omit<FaqItem, "id">);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pergunta</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Como funciona a entrega?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resposta</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: A entrega é feita via WhatsApp..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ícone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um ícone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {faqIconList.map((iconOption) => (
                    <SelectItem key={iconOption.value} value={iconOption.value}>
                      {iconOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha um ícone para representar a pergunta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Salvar Alterações" : "Adicionar Pergunta"}</Button>
        </div>
      </form>
    </Form>
  );
}
