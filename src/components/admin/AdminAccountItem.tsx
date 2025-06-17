
"use client";
import type { Account } from "@/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit3, Trash2, Eye, EyeOff, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CUSTOM_ACCOUNT_SERVICE_ID } from "@/data/mockData";

interface AdminAccountItemProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleVisibility: (accountId: string) => void;
}

export function AdminAccountItem({ account, onEdit, onDelete, onToggleVisibility }: AdminAccountItemProps) {
  const isCustomService = account.id === CUSTOM_ACCOUNT_SERVICE_ID;

  return (
    <TableRow>
      <TableCell className="font-medium flex items-center">
        {isCustomService && <Wrench className="h-4 w-4 mr-2 text-primary" />}
        {account.name}
      </TableCell>
      <TableCell>{account.price.toFixed(2)}</TableCell>
      <TableCell>
        <Badge variant={account.isSold && !isCustomService ? "destructive" : (isCustomService ? "default" : "secondary")}>
            {isCustomService ? "Serviço" : (account.isSold ? "Sim" : "Não")}
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(account)} 
          aria-label="Editar conta ou serviço"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onDelete(account.id)} 
          aria-label="Excluir conta"
          disabled={isCustomService} 
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
