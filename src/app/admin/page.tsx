
"use client";

import type { Account, FaqItem } from "@/types";
import { accountsData as initialAccountsData, customAccountServiceData, DEFAULT_WHATSAPP_PHONE_NUMBER, CUSTOM_ACCOUNT_SERVICE_ID, initialFaqData, FAQ_LOCAL_STORAGE_KEY } from "@/data/mockData";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, RefreshCw, Save, Phone, HelpCircleIcon } from "lucide-react";
import { AdminAccountList } from "@/components/admin/AdminAccountList";
import { AdminAccountForm } from "@/components/admin/AdminAccountForm";
import { AdminFaqList } from "@/components/admin/AdminFaqList";
import { AdminFaqForm } from "@/components/admin/AdminFaqForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export default function AdminPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false);
  const [isFaqFormOpen, setIsFaqFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [editingFaqItem, setEditingFaqItem] = useState<FaqItem | null>(null);
  const [whatsAppNumberInput, setWhatsAppNumberInput] = useState('');
  const [currentWhatsAppNumber, setCurrentWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const { toast } = useToast();

  useEffect(() => {
    // Load Accounts
    const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        let parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        const customServiceIndex = parsedAccounts.findIndex(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID);

        if (customServiceIndex > -1) {
          const storedCustomService = parsedAccounts[customServiceIndex];
          parsedAccounts[customServiceIndex] = {
            ...customAccountServiceData, // Start with defaults
            ...storedCustomService,     // Override with stored editable fields
            id: CUSTOM_ACCOUNT_SERVICE_ID, // Ensure correct ID
            isCustomService: true,         // Ensure it's marked as custom service
            isSold: customAccountServiceData.isSold, // Reset isSold to its default
          };
        } else {
          parsedAccounts.unshift({ ...customAccountServiceData });
        }
        setAccounts(Array.isArray(parsedAccounts) ? parsedAccounts : initialAccountsData.map(acc => ({ ...acc })));
      } catch (error) {
        console.error("Error parsing accounts from localStorage:", error);
        setAccounts(initialAccountsData.map(acc => ({ ...acc })));
      }
    } else {
      setAccounts(initialAccountsData.map(acc => ({ ...acc })));
    }

    // Load FAQs
    const storedFaqData = localStorage.getItem(FAQ_LOCAL_STORAGE_KEY);
    if (storedFaqData) {
      try {
        const parsedFaqs = JSON.parse(storedFaqData) as FaqItem[];
        setFaqItems(Array.isArray(parsedFaqs) ? parsedFaqs : [...initialFaqData]);
      } catch (error) {
        console.error("Error parsing FAQs from localStorage:", error);
        setFaqItems([...initialFaqData]);
      }
    } else {
      setFaqItems([...initialFaqData]);
    }

    // Load WhatsApp Number
    const storedWhatsAppNumber = localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY);
    const initialNumber = storedWhatsAppNumber || DEFAULT_WHATSAPP_PHONE_NUMBER;
    setCurrentWhatsAppNumber(initialNumber);
    setWhatsAppNumberInput(initialNumber);

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(ACCOUNTS_LOCAL_STORAGE_KEY, JSON.stringify(accounts));
      } catch (error) {
        console.error("Error saving accounts to localStorage:", error);
        toast({ title: "Erro ao salvar contas", description: "Não foi possível salvar as alterações das contas localmente.", variant: "destructive" });
      }
    }
  }, [accounts, isMounted, toast]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(FAQ_LOCAL_STORAGE_KEY, JSON.stringify(faqItems));
      } catch (error) {
        console.error("Error saving FAQs to localStorage:", error);
        toast({ title: "Erro ao salvar FAQs", description: "Não foi possível salvar as alterações do FAQ localmente.", variant: "destructive" });
      }
    }
  }, [faqItems, isMounted, toast]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(WHATSAPP_LOCAL_STORAGE_KEY, currentWhatsAppNumber);
      } catch (error) {
        console.error("Error saving WhatsApp number to localStorage:", error);
        toast({ title: "Erro ao salvar WhatsApp", description: "Não foi possível salvar o número do WhatsApp localmente.", variant: "destructive" });
      }
    }
  }, [currentWhatsAppNumber, isMounted, toast]);


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

  // Account Handlers
  const handleAddAccount = (newAccountData: Omit<Account, "id" | "isSold">) => {
    const newAccount: Account = {
      ...newAccountData,
      id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      isSold: false,
    };
    if (newAccount.isCustomService) delete newAccount.isCustomService;
    setAccounts((prevAccounts) => [newAccount, ...prevAccounts]);
    toast({ title: "Sucesso!", description: "Nova conta adicionada." });
    setIsAccountFormOpen(false);
  };

  const handleUpdateAccount = (updatedAccountData: Account) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === updatedAccountData.id ? { ...acc, ...updatedAccountData } : acc
      )
    );
    toast({ title: "Sucesso!", description: "Conta atualizada." });
    setIsAccountFormOpen(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (accountId: string) => {
    if (accountId === CUSTOM_ACCOUNT_SERVICE_ID) {
      toast({ title: "Ação não permitida", description: "O serviço de conta personalizada não pode ser excluído.", variant: "destructive" });
      return;
    }
    setAccounts((prevAccounts) => prevAccounts.filter((acc) => acc.id !== accountId));
    toast({ title: "Conta Removida", description: `A conta com ID ${accountId} foi removida.`, variant: "destructive" });
  };

  const handleToggleVisibility = (accountId: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === accountId ? { ...acc, isVisible: !acc.isVisible } : acc
      )
    );
    toast({ title: "Visibilidade Alterada", description: "A visibilidade da conta/serviço foi atualizada." });
  };

  const openEditAccountForm = (account: Account) => {
    setEditingAccount({ ...account });
    setIsAccountFormOpen(true);
  };

  const openAddAccountForm = () => {
    setEditingAccount(null);
    setIsAccountFormOpen(true);
  }

  // FAQ Handlers
  const handleAddFaqItem = (newFaqItemData: Omit<FaqItem, "id">) => {
    const newFaqItem: FaqItem = {
      ...newFaqItemData,
      id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setFaqItems((prevFaqs) => [newFaqItem, ...prevFaqs]);
    toast({ title: "Sucesso!", description: "Nova pergunta adicionada ao FAQ." });
    setIsFaqFormOpen(false);
  };

  const handleUpdateFaqItem = (updatedFaqItemData: FaqItem) => {
    setFaqItems((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === updatedFaqItemData.id ? { ...faq, ...updatedFaqItemData } : faq
      )
    );
    toast({ title: "Sucesso!", description: "Pergunta do FAQ atualizada." });
    setIsFaqFormOpen(false);
    setEditingFaqItem(null);
  };

  const handleDeleteFaqItem = (faqId: string) => {
    setFaqItems((prevFaqs) => prevFaqs.filter((faq) => faq.id !== faqId));
    toast({ title: "Pergunta Removida", description: `A pergunta com ID ${faqId} foi removida do FAQ.`, variant: "destructive" });
  };

  const openEditFaqForm = (faqItem: FaqItem) => {
    setEditingFaqItem({ ...faqItem });
    setIsFaqFormOpen(true);
  };

  const openAddFaqForm = () => {
    setEditingFaqItem(null);
    setIsFaqFormOpen(true);
  };


  // General Admin Handlers
  const resetToMockData = () => {
    const freshMockAccounts = initialAccountsData.map(acc => ({ ...acc }));
    setAccounts(freshMockAccounts);
    setFaqItems([...initialFaqData]);
    setCurrentWhatsAppNumber(DEFAULT_WHATSAPP_PHONE_NUMBER);
    setWhatsAppNumberInput(DEFAULT_WHATSAPP_PHONE_NUMBER);
    toast({ title: "Dados Resetados", description: "Os dados foram resetados para os valores iniciais." });
  }

  const handleSaveWhatsAppNumber = () => {
    if (whatsAppNumberInput.trim() && /^\d+$/.test(whatsAppNumberInput.trim())) {
      setCurrentWhatsAppNumber(whatsAppNumberInput.trim());
      toast({ title: "Sucesso!", description: "Número do WhatsApp atualizado." });
    } else {
      toast({ title: "Erro", description: "Por favor, insira um número de WhatsApp válido (apenas dígitos).", variant: "destructive" });
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (a.id === CUSTOM_ACCOUNT_SERVICE_ID) return -1;
    if (b.id === CUSTOM_ACCOUNT_SERVICE_ID) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Painel de Administração</h1>
          <Button onClick={resetToMockData} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Resetar Dados
          </Button>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center"><Phone className="mr-2 h-5 w-5 text-primary" />Configurar Número do WhatsApp</CardTitle>
            <CardDescription>Este número será usado para os links de compra/solicitação. Use apenas dígitos (ex: 5511999998888).</CardDescription>
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

        <Separator className="my-12" />

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks mr-2 h-5 w-5 text-primary"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
                Gerenciar Contas e Serviços
              </CardTitle>
              <Dialog open={isAccountFormOpen} onOpenChange={(isOpen) => {
                setIsAccountFormOpen(isOpen);
                if (!isOpen) setEditingAccount(null);
              }}>
                <DialogTrigger asChild>
                  <Button onClick={openAddAccountForm} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Conta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingAccount ? "Editar Conta/Serviço" : "Adicionar Nova Conta"}</DialogTitle>
                  </DialogHeader>
                  <AdminAccountForm
                    onSubmitAccount={editingAccount ? handleUpdateAccount : handleAddAccount}
                    initialData={editingAccount}
                    onClose={() => {
                      setIsAccountFormOpen(false);
                      setEditingAccount(null);
                    }}
                    isEditingCustomService={editingAccount?.id === CUSTOM_ACCOUNT_SERVICE_ID}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>Adicione, edite ou remova contas e serviços disponíveis na loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAccountList
              accounts={sortedAccounts}
              onEdit={openEditAccountForm}
              onDelete={handleDeleteAccount}
              onToggleVisibility={handleToggleVisibility}
            />
          </CardContent>
        </Card>

        <Separator className="my-12" />

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <HelpCircleIcon className="mr-2 h-5 w-5 text-primary" />
                Gerenciar Perguntas Frequentes (FAQ)
              </CardTitle>
              <Dialog open={isFaqFormOpen} onOpenChange={(isOpen) => {
                setIsFaqFormOpen(isOpen);
                if (!isOpen) setEditingFaqItem(null);
              }}>
                <DialogTrigger asChild>
                  <Button onClick={openAddFaqForm} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Pergunta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingFaqItem ? "Editar Pergunta do FAQ" : "Adicionar Nova Pergunta ao FAQ"}</DialogTitle>
                  </DialogHeader>
                  <AdminFaqForm
                    onSubmitFaq={editingFaqItem ? handleUpdateFaqItem : handleAddFaqItem}
                    initialData={editingFaqItem}
                    onClose={() => {
                      setIsFaqFormOpen(false);
                      setEditingFaqItem(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>Adicione, edite ou remova perguntas e respostas da seção FAQ da loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminFaqList
              faqItems={faqItems}
              onEdit={openEditFaqForm}
              onDelete={handleDeleteFaqItem}
            />
          </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
