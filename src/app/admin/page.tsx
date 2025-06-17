
"use client";

import type { Account } from "@/types"; // Category não é mais necessária aqui
import { accountsData as initialAccountsData, DEFAULT_WHATSAPP_PHONE_NUMBER } from "@/data/mockData";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, RefreshCw, Save, Phone } from "lucide-react";
import { AdminAccountList } from "@/components/admin/AdminAccountList";
import { AdminAccountForm } from "@/components/admin/AdminAccountForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export default function AdminPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [whatsAppNumberInput, setWhatsAppNumberInput] = useState('');
  const [currentWhatsAppNumber, setCurrentWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const { toast } = useToast();

  useEffect(() => {
    const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        const parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        setAccounts(Array.isArray(parsedAccounts) ? parsedAccounts : initialAccountsData.map(acc => ({ ...acc })));
      } catch (error) {
        console.error("Error parsing accounts from localStorage:", error);
        setAccounts(initialAccountsData.map(acc => ({ ...acc })));
      }
    } else {
      setAccounts(initialAccountsData.map(acc => ({ ...acc })));
    }

    const storedWhatsAppNumber = localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY);
    const initialNumber = storedWhatsAppNumber || DEFAULT_WHATSAPP_PHONE_NUMBER;
    setCurrentWhatsAppNumber(initialNumber);
    setWhatsAppNumberInput(initialNumber); 

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(ACCOUNTS_LOCAL_STORAGE_KEY, JSON.stringify(accounts));
    }
  }, [accounts, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(WHATSAPP_LOCAL_STORAGE_KEY, currentWhatsAppNumber);
    }
  }, [currentWhatsAppNumber, isMounted]);


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
        acc.id === updatedAccountData.id ? { ...updatedAccountData } : acc
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
    setEditingAccount({...account});
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  }

  const resetToMockData = () => {
    const freshMockAccounts = initialAccountsData.map(acc => ({...acc }));
    setAccounts(freshMockAccounts);
    setCurrentWhatsAppNumber(DEFAULT_WHATSAPP_PHONE_NUMBER);
    setWhatsAppNumberInput(DEFAULT_WHATSAPP_PHONE_NUMBER);
    toast({ title: "Dados Resetados", description: "A lista de contas e o número do WhatsApp foram resetados para os valores iniciais." });
  }

  const handleSaveWhatsAppNumber = () => {
    if (whatsAppNumberInput.trim() && /^\d+$/.test(whatsAppNumberInput.trim())) {
      setCurrentWhatsAppNumber(whatsAppNumberInput.trim());
      toast({ title: "Sucesso!", description: "Número do WhatsApp atualizado." });
    } else {
      toast({ title: "Erro", description: "Por favor, insira um número de WhatsApp válido (apenas dígitos).", variant: "destructive"});
    }
  };

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
                setEditingAccount(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button onClick={openAddForm}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
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

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center"><Phone className="mr-2 h-5 w-5 text-primary"/>Configurar Número do WhatsApp</CardTitle>
            <CardDescription>Este número será usado para os links de "Comprar via WhatsApp" e "Solicitar via WhatsApp". Use apenas dígitos (ex: 5511999998888).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-grow">
                <Label htmlFor="whatsapp-number" className="font-semibold">Número do WhatsApp</Label>
                <Input
                  id="whatsapp-number"
                  type="tel"
                  placeholder="Ex: 5511999998888"
                  value={whatsAppNumberInput}
                  onChange={(e) => setWhatsAppNumberInput(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleSaveWhatsAppNumber}>
                <Save className="mr-2 h-4 w-4" /> Salvar Número
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Número atual: <span className="font-semibold text-foreground">{currentWhatsAppNumber || "Não configurado"}</span></p>
          </CardContent>
        </Card>

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
