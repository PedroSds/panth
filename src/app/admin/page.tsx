
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

const LOCAL_STORAGE_KEY = 'panthStoreAccounts';

export default function AdminPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedAccountsData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        const parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        if (Array.isArray(parsedAccounts)) {
          setAccounts(parsedAccounts);
        } else {
          // Data in localStorage is corrupted or not an array, fallback to initial
          const initialData = initialAccountsData.map(acc => ({ ...acc }));
          setAccounts(initialData);
        }
      } catch (error) {
        console.error("Error parsing accounts from localStorage:", error);
        // Fallback to initial data on error
        const initialData = initialAccountsData.map(acc => ({ ...acc }));
        setAccounts(initialData);
      }
    } else {
      // No data in localStorage, use initial mock data
      const initialData = initialAccountsData.map(acc => ({ ...acc }));
      setAccounts(initialData);
    }
    setIsMounted(true);
  }, []); // Runs once on component mount

  useEffect(() => {
    if (isMounted) {
      // Save accounts to localStorage whenever they change, but only after initial mount and data load
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));
    }
  }, [accounts, isMounted]); // Re-run when accounts or isMounted status changes


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
      // isSold is already part of newAccountData from the form
    };
    setAccounts((prevAccounts) => [newAccount, ...prevAccounts]);
    toast({ title: "Sucesso!", description: "Nova conta adicionada." });
    setIsFormOpen(false);
  };

  const handleUpdateAccount = (updatedAccountData: Account) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === updatedAccountData.id ? { ...updatedAccountData } : acc // Ensure full update
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
    setEditingAccount({...account}); // Pass a copy to avoid direct state mutation if form changes it
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  }

  const resetToMockData = () => {
    const freshMockData = initialAccountsData.map(acc => ({...acc}));
    setAccounts(freshMockData);
    // localStorage will be updated by the useEffect hook watching 'accounts'
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
            <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
              setIsFormOpen(isOpen);
              if (!isOpen) {
                setEditingAccount(null); // Clear editing account when dialog closes
              }
            }}>
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
