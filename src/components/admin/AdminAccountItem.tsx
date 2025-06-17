
"use client";
import type { Account } from "@/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminAccountItemProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleVisibility: (accountId: string) => void;
}

export function AdminAccountItem({ account, onEdit, onDelete, onToggleVisibility }: AdminAccountItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{account.name}</TableCell>
      <TableCell>{account.price.toFixed(2)}</TableCell>
      <TableCell>
        <Badge variant={account.isSold ? "destructive" : "secondary"}>
          {account.isSold ? "Sim" : "Não"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Switch
            id={`visibility-${account.id}`}
            checked={account.isVisible}
            onCheckedChange={() => onToggleVisibility(account.id)}
            aria-label={account.isVisible ? "Tornar invisível" : "Tornar visível"}
          />
           {account.isVisible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-red-500" />}
        </div>
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(account)} aria-label="Editar conta">
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(account.id)} aria-label="Excluir conta">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
