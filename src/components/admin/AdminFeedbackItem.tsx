
"use client";
import Image from 'next/image';
import type { FeedbackItem } from "@/types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit3, Trash2, Image as ImageIcon, MessageSquareText } from "lucide-react";

interface AdminFeedbackItemProps {
  feedbackItem: FeedbackItem;
  onEdit: (feedbackItem: FeedbackItem) => void;
  onDelete: (feedbackId: string) => void;
}

export function AdminFeedbackItem({ feedbackItem, onEdit, onDelete }: AdminFeedbackItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium w-1/3">
        {feedbackItem.name}
      </TableCell>
      <TableCell className="w-1/3">
        {feedbackItem.imageUrl ? (
          <div className="flex items-center space-x-2">
            <ImageIcon className="h-4 w-4 text-secondary" />
            <span className="text-xs truncate max-w-[150px] hover:underline" title={feedbackItem.imageUrl}>
              <a href={feedbackItem.imageUrl} target="_blank" rel="noopener noreferrer">
                Ver Imagem
              </a>
            </span>
            {feedbackItem.imageUrl && (
              <div className="relative h-10 w-10 ml-2">
                <Image 
                  src={feedbackItem.imageUrl} 
                  alt={`Preview de ${feedbackItem.name}`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-sm"
                  data-ai-hint="feedback image preview"
                />
              </div>
            )}
          </div>
        ) : feedbackItem.text ? (
          <div className="flex items-center space-x-2">
            <MessageSquareText className="h-4 w-4 text-secondary" />
            <span className="text-xs italic truncate max-w-[200px]" title={feedbackItem.text}>
              "{feedbackItem.text}"
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Nenhum conteúdo</span>
        )}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(feedbackItem)}
          aria-label="Editar feedback"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(feedbackItem.id)}
          aria-label="Excluir feedback"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
