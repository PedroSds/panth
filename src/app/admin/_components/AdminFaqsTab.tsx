
"use client";
import React, { useState, useEffect } from 'react';
import type { FaqItem } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AdminFaqForm } from '@/components/admin/AdminFaqForm';
import { AdminFaqList } from '@/components/admin/AdminFaqList';
import { useToast } from '@/hooks/use-toast';
import { initialFaqData as fallbackFaqData, FAQ_LOCAL_STORAGE_KEY } from '@/data/mockData';

export default function AdminFaqsTab() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedFaqs = localStorage.getItem(FAQ_LOCAL_STORAGE_KEY);
    if (storedFaqs) {
      try {
        const parsedFaqs = JSON.parse(storedFaqs) as FaqItem[];
        setFaqItems(Array.isArray(parsedFaqs) ? parsedFaqs : [...fallbackFaqData]);
      } catch (error) {
        console.error("Error parsing FAQs from localStorage:", error);
        setFaqItems([...fallbackFaqData]);
      }
    } else {
      setFaqItems([...fallbackFaqData]);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(FAQ_LOCAL_STORAGE_KEY, JSON.stringify(faqItems));
    }
  }, [faqItems, isMounted]);

  const handleAddFaq = () => {
    setEditingFaq(null);
    setIsFormOpen(true);
  };

  const handleEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setIsFormOpen(true);
  };

  const handleSubmitFaq = (data: FaqItem | Omit<FaqItem, "id">) => {
    if ('id' in data && data.id) { // Editing
      setFaqItems(prev => prev.map(item => (item.id === data.id ? data : item)));
      toast({ title: "FAQ Atualizado!", description: "A pergunta foi atualizada com sucesso." });
    } else { // Adding
      const newFaq: FaqItem = {
        ...data,
        id: `faq-${new Date().getTime()}-${Math.random().toString(36).substring(2, 7)}`,
      };
      setFaqItems(prev => [newFaq, ...prev]);
      toast({ title: "FAQ Adicionado!", description: "Nova pergunta adicionada com sucesso." });
    }
    setIsFormOpen(false);
    setEditingFaq(null);
  };

  const handleDeleteFaq = (faqId: string) => {
    setFaqItems(prev => prev.filter(item => item.id !== faqId));
    toast({ title: "FAQ Removido!", description: "A pergunta foi removida com sucesso." });
  };
  
  if (!isMounted) {
    return <div className="p-4 text-center">Carregando gerenciamento de Perguntas Frequentes...</div>;
  }

  return (
    <div className="space-y-6 p-1 md:p-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight">Gerenciar Perguntas Frequentes (FAQ)</h2>
            <p className="text-muted-foreground">Adicione, edite ou remova perguntas e respostas do FAQ.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if (!isOpen) setEditingFaq(null); }}>
          <DialogTrigger asChild>
            <Button onClick={handleAddFaq} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Pergunta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingFaq ? "Editar Pergunta do FAQ" : "Adicionar Nova Pergunta ao FAQ"}</DialogTitle>
              <DialogDescription>
                {editingFaq ? "Modifique a pergunta, resposta ou ícone." : "Preencha os detalhes da nova pergunta e resposta."}
              </DialogDescription>
            </DialogHeader>
            <AdminFaqForm 
                onSubmitFaq={handleSubmitFaq} 
                initialData={editingFaq} 
                onClose={() => { setIsFormOpen(false); setEditingFaq(null); }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <AdminFaqList 
        faqItems={faqItems} 
        onEdit={handleEditFaq} 
        onDelete={handleDeleteFaq}
      />
    </div>
  );
}
