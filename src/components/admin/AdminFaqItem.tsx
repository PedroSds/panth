
"use client";
import type { FaqItem, LucideIconName } from "@/types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit3, Trash2, Star, Clock, CalendarDays, Anchor, Wallet, CreditCard, HelpCircle, Info, MessageSquare, ShieldQuestion, BookOpen, Tag, Users, Truck, ShieldCheck, CircleDollarSign, type LucideIcon } from "lucide-react";

interface AdminFaqItemProps {
  faqItem: FaqItem;
  onEdit: (faqItem: FaqItem) => void;
  onDelete: (faqId: string) => void;
}

const iconMap: Record<LucideIconName, LucideIcon> = {
  Star,
  Clock,
  CalendarDays,
  Anchor,
  Wallet,
  CreditCard,
  HelpCircle,
  Info,
  MessageSquare,
  ShieldQuestion,
  BookOpen,
  Tag,
  Users,
  Truck,
  ShieldCheck,
  CircleDollarSign,
};

export function AdminFaqItem({ faqItem, onEdit, onDelete }: AdminFaqItemProps) {
  const IconComponent = iconMap[faqItem.icon] || HelpCircle;

  return (
    <TableRow>
      <TableCell className="font-medium w-[50px]">
        <IconComponent className="h-5 w-5 text-primary" />
      </TableCell>
      <TableCell className="font-medium">{faqItem.question}</TableCell>
      <TableCell className="text-sm text-muted-foreground truncate max-w-xs">{faqItem.answer}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(faqItem)}
          aria-label="Editar pergunta do FAQ"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(faqItem.id)}
          aria-label="Excluir pergunta do FAQ"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
