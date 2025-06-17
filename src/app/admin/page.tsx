
"use client";

import type { Account } from "@/types";
import { accountsData as initialAccountsData } from "@/data/mockData";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import { AdminAccountList } from "@/components/admin/AdminAccountList";
import { AdminAccountForm } from "@/components/admin/AdminAccountForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AdminPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setAccounts(initialAccountsData.map(acc => ({...acc}))); // Deep copy to allow modification
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Carregando painel de administração...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddAccount = (newAccountData: Omit<Account, "id" | "isSold">) => {
    const newAccount: Account = {
      ...newAccountData,
      id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      isSold: false,
    };
    setAccounts((prevAccounts) => [newAccount, ...prevAccounts]);
    toast({ title: "Sucesso!", description: "Nova conta adicionada." });
    setIsFormOpen(false);
  };

  const handleUpdateAccount = (updatedAccountData: Account) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === updatedAccountData.id ? { ...acc, ...updatedAccountData } : acc
      )
    );
    toast({ title: "Sucesso!", description: "Conta atualizada." });
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((acc) => acc.id !== accountId)
    );
    toast({
      title: "Conta Removida",
      description: `A conta com ID ${accountId} foi removida.`,
      variant: "destructive",
    });
  };

  const handleToggleVisibility = (accountId: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === accountId ? { ...acc, isVisible: !acc.isVisible } : acc
      )
    );
    toast({ title: "Visibilidade Alterada", description: "A visibilidade da conta foi atualizada." });
  };
  
  const openEditForm = (account: Account) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  }

  const resetToMockData = () => {
    setAccounts(initialAccountsData.map(acc => ({...acc})));
    toast({ title: "Dados Resetados", description: "A lista de contas foi resetada para os dados iniciais." });
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Painel de Administração</h1>
          <div className="flex gap-2">
            <Button onClick={resetToMockData} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Resetar Dados
            </Button>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddForm}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingAccount ? "Editar Conta" : "Adicionar Nova Conta"}</DialogTitle>
                </DialogHeader>
                <AdminAccountForm
                  onSubmitAccount={editingAccount ? handleUpdateAccount : handleAddAccount}
                  initialData={editingAccount}
                  onClose={() => {
                    setIsFormOpen(false);
                    setEditingAccount(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <AdminAccountList
          accounts={accounts}
          onEdit={openEditForm}
          onDelete={handleDeleteAccount}
          onToggleVisibility={handleToggleVisibility}
        />
      </main>
      <Footer />
    </div>
  );
}
