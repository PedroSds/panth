
"use client";

import type { FaqItem } from "@/types";
import { AdminFaqItem } from "./AdminFaqItem";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdminFaqListProps {
  faqItems: FaqItem[];
  onEdit: (faqItem: FaqItem) => void;
  onDelete: (faqId: string) => void;
}

export function AdminFaqList({ faqItems, onEdit, onDelete }: AdminFaqListProps) {
  if (faqItems.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Nenhuma pergunta cadastrada no FAQ.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow-md">
      <Table>
        <TableCaption>Lista de perguntas e respostas do FAQ. As alterações são salvas nesta sessão.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Ícone</TableHead>
            <TableHead>Pergunta</TableHead>
            <TableHead>Resposta (Prévia)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqItems.map((faqItem) => (
            <AdminFaqItem
              key={faqItem.id}
              faqItem={faqItem}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
