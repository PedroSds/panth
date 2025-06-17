
"use client";

import type { Account } from "@/types";
import { AdminAccountItem } from "./AdminAccountItem";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdminAccountListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleVisibility: (accountId: string) => void;
}

export function AdminAccountList({ accounts, onEdit, onDelete, onToggleVisibility }: AdminAccountListProps) {
  if (accounts.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Nenhuma conta cadastrada.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow-md">
      <Table>
        <TableCaption>Lista de contas cadastradas. As alterações são salvas apenas nesta sessão.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            <TableHead>Preço (R$)</TableHead>
            <TableHead>Vendida / Tipo</TableHead>
            <TableHead>Visível</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <AdminAccountItem
              key={account.id}
              account={account}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleVisibility={onToggleVisibility}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
