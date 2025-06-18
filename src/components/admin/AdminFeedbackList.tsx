
"use client";

import type { FeedbackItem } from "@/types";
import { AdminFeedbackItem } from "./AdminFeedbackItem";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdminFeedbackListProps {
  feedbackItems: FeedbackItem[];
  onEdit: (feedbackItem: FeedbackItem) => void;
  onDelete: (feedbackId: string) => void;
}

export function AdminFeedbackList({ feedbackItems, onEdit, onDelete }: AdminFeedbackListProps) {
  if (feedbackItems.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Nenhum feedback cadastrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow-md">
      <Table>
        <TableCaption>Lista de feedbacks de clientes. As alterações são salvas nesta sessão.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Nome do Cliente</TableHead>
            <TableHead className="w-1/3">Conteúdo (Imagem/Texto)</TableHead>
            <TableHead className="text-right w-1/3">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackItems.map((item) => (
            <AdminFeedbackItem
              key={item.id}
              feedbackItem={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
