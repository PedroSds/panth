
"use client";
import React, { useState, useEffect } from 'react';
import type { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AdminAccountForm } from '@/components/admin/AdminAccountForm';
import { AdminAccountList } from '@/components/admin/AdminAccountList';
import { useToast } from '@/hooks/use-toast';
import { accountsData as fallbackAccountsData, CUSTOM_ACCOUNT_SERVICE_ID } from '@/data/mockData';

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';

export default function AdminAccountsTab() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedAccounts = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccounts) {
      try {
        const parsedAccounts = JSON.parse(storedAccounts) as Account[];
        if (Array.isArray(parsedAccounts)) {
          const customServiceFromStorage = parsedAccounts.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID);
          const otherAccounts = parsedAccounts.filter(acc => acc.id !== CUSTOM_ACCOUNT_SERVICE_ID);
          
          const fallbackCustomService = fallbackAccountsData.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID)!;

          let currentCustomService;
          if (customServiceFromStorage) {
              currentCustomService = { 
                  ...fallbackCustomService, // Pega a estrutura base e valores padrão
                  ...customServiceFromStorage, // Sobrescreve com os dados do localStorage (incluindo nome, detalhes, preço, imagem, isVisible, automaticDeliveryLink atualizados)
                  id: CUSTOM_ACCOUNT_SERVICE_ID, // Garante o ID correto
                  isCustomService: true, // Garante la flag correta
                  isSold: fallbackCustomService.isSold // Garante que isSold para o serviço personalizado não seja alterado (vem do fallback)
              };
          } else {
              currentCustomService = { ...fallbackCustomService }; // Se não há nada no storage, usa o fallback
          }
            
          setAccounts([currentCustomService, ...otherAccounts].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0) ));
        } else {
          setAccounts([...fallbackAccountsData].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0) ));
        }
      } catch (error) {
        console.error("Error parsing accounts from localStorage:", error);
        setAccounts([...fallbackAccountsData].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0) ));
      }
    } else {
      setAccounts([...fallbackAccountsData].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0) ));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
          localStorage.setItem(ACCOUNTS_LOCAL_STORAGE_KEY, JSON.stringify(accounts));
      } catch (error) {
          console.error("Error stringifying accounts to localStorage:", error);
          toast({
              variant: "destructive",
              title: "Erro ao Salvar",
              description: "Não foi possível salvar as contas no armazenamento local.",
          });
      }
    }
  }, [accounts, isMounted, toast]);

  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleSubmitAccount = (data: Account | Omit<Account, "id" | "isSold">) => {
    if ('id' in data && data.id) { 
      setAccounts(prevAccounts =>
        prevAccounts.map(acc => (acc.id === data.id ? { ...acc, ...data } as Account : acc))
      );
      toast({ title: "Conta/Serviço Atualizado!", description: `"${data.name}" foi atualizado(a) com sucesso.` });
    } else { 
      const newAccount: Account = {
        ...data,
        id: `acc-${new Date().getTime()}-${Math.random().toString(36).substring(2, 7)}`,
        isSold: false, 
        isCustomService: false, // New accounts are not custom services by default
      } as Account;
      // Ensure custom service remains first if present, then new accounts, then others
      setAccounts(prevAccounts => {
        const customService = prevAccounts.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID);
        const otherAccounts = prevAccounts.filter(acc => acc.id !== CUSTOM_ACCOUNT_SERVICE_ID);
        return customService ? [customService, newAccount, ...otherAccounts] : [newAccount, ...otherAccounts];
      });
      toast({ title: "Conta Adicionada!", description: `"${newAccount.name}" foi adicionada com sucesso.` });
    }
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (accountId: string) => {
    if (accountId === CUSTOM_ACCOUNT_SERVICE_ID) {
      toast({ variant: "destructive", title: "Ação não permitida", description: "O serviço de conta personalizada não pode ser excluído." });
      return;
    }
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    toast({ title: "Conta Excluída!", description: "A conta foi removida com sucesso." });
  };
  
  const handleToggleVisibility = (accountId: string) => {
    setAccounts(prev => prev.map(acc => acc.id === accountId ? { ...acc, isVisible: !acc.isVisible } : acc));
    toast({ title: "Visibilidade Alterada!", description: "A visibilidade foi atualizada." });
  };

  if (!isMounted) {
    return <div className="p-4 text-center">Carregando gerenciamento de contas e serviços...</div>;
  }
  
  const isEditingCustomService = editingAccount?.id === CUSTOM_ACCOUNT_SERVICE_ID;

  return (
    <div className="space-y-6 p-1 md:p-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight">Gerenciar Contas e Serviços</h2>
            <p className="text-muted-foreground">Adicione, edite ou remova contas e o serviço de conta personalizada.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if (!isOpen) setEditingAccount(null); }}>
          <DialogTrigger asChild>
            <Button onClick={handleAddAccount} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingAccount ? (isEditingCustomService ? "Editar Serviço Personalizado" : "Editar Conta") : "Adicionar Nova Conta"}</DialogTitle>
              <DialogDescription>
                {editingAccount ? (isEditingCustomService ? "Modifique os detalhes do serviço de conta personalizada." : "Modifique os detalhes da conta selecionada.") : "Preencha os detalhes da nova conta a ser vendida."}
              </DialogDescription>
            </DialogHeader>
            <AdminAccountForm 
                onSubmitAccount={handleSubmitAccount} 
                initialData={editingAccount} 
                onClose={() => { setIsFormOpen(false); setEditingAccount(null); }}
                isEditingCustomService={isEditingCustomService}
            />
          </DialogContent>
        </Dialog>
      </div>
      <AdminAccountList 
        accounts={accounts} 
        onEdit={handleEditAccount} 
        onDelete={handleDeleteAccount}
        onToggleVisibility={handleToggleVisibility}
      />
    </div>
  );
}
