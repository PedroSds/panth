
"use client";

import type { Account, FaqItem, SocialLink, PageSectionStyles, SectionIdentifier, SectionBackgroundStyle, SectionConfig, FeedbackItem } from "@/types";
import { 
  accountsData as initialAccountsData, 
  customAccountServiceData, 
  DEFAULT_WHATSAPP_PHONE_NUMBER, 
  CUSTOM_ACCOUNT_SERVICE_ID, 
  initialFaqData, 
  FAQ_LOCAL_STORAGE_KEY, 
  BANNER_IMAGE_URL_LOCAL_STORAGE_KEY, 
  DEFAULT_BANNER_IMAGE_URL, 
  SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY, 
  socialPlatformConfig, 
  initialSocialLinksData,
  LOGO_IMAGE_URL_LOCAL_STORAGE_KEY,
  DEFAULT_LOGO_IMAGE_URL,
  DEFAULT_VIDEO_URL,
  VIDEO_URL_LOCAL_STORAGE_KEY,
  SECTION_STYLES_LOCAL_STORAGE_KEY,
  initialSectionStyles,
  sectionConfig,
  FEEDBACKS_LOCAL_STORAGE_KEY,
  initialFeedbacksData
} from "@/data/mockData";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, HelpCircleIcon, Image as ImageIcon, Share2, ChevronDown, ListChecks, Palette, Film, Brush, Trash2Icon, StarIcon } from "lucide-react";
import { AdminAccountList } from "@/components/admin/AdminAccountList";
import { AdminAccountForm } from "@/components/admin/AdminAccountForm";
import { AdminFaqList } from "@/components/admin/AdminFaqList";
import { AdminFaqForm } from "@/components/admin/AdminFaqForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";


const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

const getVideoEmbedUrl = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  let videoId = null;

  const youtubeRegexes = [
    /[?&]v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/
  ];
  for (const regex of youtubeRegexes) {
    const match = url.match(regex);
    if (match && match[1]) {
      videoId = match[1];
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) { 
        return `https://www.youtube.com/embed/${videoId}`;
      }
      videoId = null; 
    }
  }

  const wistiaMatch = url.match(/(?:wistia\.com\/medias\/|wi\.st\/)\/?([a-z0-9]+)/);
  if (wistiaMatch && wistiaMatch[1]) {
    videoId = wistiaMatch[1];
    if (/^[a-z0-9]+$/.test(videoId)) {
      return `https://fast.wistia.net/embed/iframe/${videoId}`;
    }
  }
  
  return null;
};


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
  
  const [logoImageUrlInput, setLogoImageUrlInput] = useState('');
  const [currentLogoImageUrl, setCurrentLogoImageUrl] = useState(DEFAULT_LOGO_IMAGE_URL);
  
  const [bannerImageUrlInput, setBannerImageUrlInput] = useState('');
  const [currentBannerImageUrl, setCurrentBannerImageUrl] = useState(DEFAULT_BANNER_IMAGE_URL);

  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState(DEFAULT_VIDEO_URL);
  
  const [editableSocialLinks, setEditableSocialLinks] = useState<SocialLink[]>(initialSocialLinksData.map(link => ({...link})));

  const [sectionCustomStyles, setSectionCustomStyles] = useState<PageSectionStyles>(initialSectionStyles);
  // Temporary state for section style inputs, to avoid updating main state on every keystroke
  const [tempSectionStyles, setTempSectionStyles] = useState<PageSectionStyles>(initialSectionStyles);


  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    // Load Accounts
    try {
      const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
      if (storedAccountsData) {
        let parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        const customServiceIndex = parsedAccounts.findIndex(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID);

        if (customServiceIndex > -1) {
          const storedCustomService = parsedAccounts[customServiceIndex];
          parsedAccounts[customServiceIndex] = {
            ...customAccountServiceData, 
            ...storedCustomService,     
            id: CUSTOM_ACCOUNT_SERVICE_ID, 
            isCustomService: true,         
            isSold: customAccountServiceData.isSold, 
          };
        } else {
          parsedAccounts.unshift({ ...customAccountServiceData });
        }
        setAccounts(Array.isArray(parsedAccounts) ? parsedAccounts : initialAccountsData.map(acc => ({ ...acc })));
      } else {
        setAccounts(initialAccountsData.map(acc => ({ ...acc })));
      }
    } catch (error) {
      console.error("Error parsing accounts from localStorage:", error);
      setAccounts(initialAccountsData.map(acc => ({ ...acc })));
      toast({ title: "Erro ao carregar contas", description: "Não foi possível carregar as contas salvas.", variant: "destructive" });
    }

    // Load FAQs
    try {
      const storedFaqData = localStorage.getItem(FAQ_LOCAL_STORAGE_KEY);
      if (storedFaqData) {
        const parsedFaqs = JSON.parse(storedFaqData) as FaqItem[];
        setFaqItems(Array.isArray(parsedFaqs) ? parsedFaqs : [...initialFaqData]);
      } else {
        setFaqItems([...initialFaqData]);
      }
    } catch (error) {
      console.error("Error parsing FAQs from localStorage:", error);
      setFaqItems([...initialFaqData]);
      toast({ title: "Erro ao carregar FAQs", description: "Não foi possível carregar os FAQs salvos.", variant: "destructive" });
    }
    
    // Load WhatsApp Number, Logo, Banner, Video, Social Links
    const storedWhatsAppNumber = localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY);
    const initialNumber = storedWhatsAppNumber || DEFAULT_WHATSAPP_PHONE_NUMBER;
    setCurrentWhatsAppNumber(initialNumber);
    setWhatsAppNumberInput(initialNumber);

    const storedLogoImageUrl = localStorage.getItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY);
    const initialLogoUrl = storedLogoImageUrl || DEFAULT_LOGO_IMAGE_URL;
    setCurrentLogoImageUrl(initialLogoUrl);
    setLogoImageUrlInput(initialLogoUrl);

    const storedBannerImageUrl = localStorage.getItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY);
    const initialBannerUrl = storedBannerImageUrl || DEFAULT_BANNER_IMAGE_URL;
    setCurrentBannerImageUrl(initialBannerUrl);
    setBannerImageUrlInput(initialBannerUrl);

    const storedVideoUrl = localStorage.getItem(VIDEO_URL_LOCAL_STORAGE_KEY);
    const initialVideoUrl = storedVideoUrl || DEFAULT_VIDEO_URL;
    setCurrentVideoUrl(initialVideoUrl);
    setVideoUrlInput(initialVideoUrl);

    try {
      const storedSocialLinks = localStorage.getItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY);
      if (storedSocialLinks) {
        const parsedLinks = JSON.parse(storedSocialLinks) as Array<Pick<SocialLink, 'key' | 'url'>>;
        const mergedLinks = socialPlatformConfig.map(configPlatform => {
            const storedPlatform = parsedLinks.find(p => p.key === configPlatform.key);
            const defaultPlatformData = initialSocialLinksData.find(initLink => initLink.key === configPlatform.key) || configPlatform;
            return {
                ...configPlatform, 
                url: storedPlatform?.url || defaultPlatformData.url || '',
            };
        });
        setEditableSocialLinks(mergedLinks);
      } else {
         setEditableSocialLinks(socialPlatformConfig.map(link => ({...link, url: initialSocialLinksData.find(il => il.key === link.key)?.url || ''})));
      }
    } catch (error) {
      console.error("Error parsing social media links from localStorage:", error);
      setEditableSocialLinks(initialSocialLinksData.map(link => ({...link})));
      toast({ title: "Erro ao carregar links sociais", description: "Não foi possível carregar os links de redes sociais salvos.", variant: "destructive" });
    }

    // Load Section Styles
    try {
      const storedSectionStyles = localStorage.getItem(SECTION_STYLES_LOCAL_STORAGE_KEY);
      if (storedSectionStyles) {
        const parsedStyles = JSON.parse(storedSectionStyles) as PageSectionStyles;
        // Ensure all keys from sectionConfig are present
        const validatedStyles: PageSectionStyles = { ...initialSectionStyles };
        for (const config of sectionConfig) {
          if (parsedStyles[config.key]) {
            validatedStyles[config.key] = parsedStyles[config.key];
          }
        }
        setSectionCustomStyles(validatedStyles);
        setTempSectionStyles(JSON.parse(JSON.stringify(validatedStyles))); // Deep copy for temp state
      } else {
        setSectionCustomStyles(initialSectionStyles);
        setTempSectionStyles(JSON.parse(JSON.stringify(initialSectionStyles)));
      }
    } catch (error) {
      console.error("Error parsing section styles from localStorage:", error);
      setSectionCustomStyles(initialSectionStyles);
      setTempSectionStyles(JSON.parse(JSON.stringify(initialSectionStyles)));
      toast({ title: "Erro ao carregar estilos de seção", description: "Configurações de estilo personalizadas não puderam ser carregadas.", variant: "destructive" });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ensure this runs only once on mount


  // Save Effects for Accounts, FAQs, WhatsApp, Logo, Banner, Video, Social Links, Section Styles
  useEffect(() => { if (isMounted) localStorage.setItem(ACCOUNTS_LOCAL_STORAGE_KEY, JSON.stringify(accounts)); }, [accounts, isMounted]);
  useEffect(() => { if (isMounted) localStorage.setItem(FAQ_LOCAL_STORAGE_KEY, JSON.stringify(faqItems)); }, [faqItems, isMounted]);
  useEffect(() => { if (isMounted) localStorage.setItem(WHATSAPP_LOCAL_STORAGE_KEY, currentWhatsAppNumber); }, [currentWhatsAppNumber, isMounted]);
  useEffect(() => { if (isMounted) localStorage.setItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY, currentLogoImageUrl); }, [currentLogoImageUrl, isMounted]);
  useEffect(() => { if (isMounted) localStorage.setItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY, currentBannerImageUrl); }, [currentBannerImageUrl, isMounted]);
  useEffect(() => { if (isMounted) localStorage.setItem(VIDEO_URL_LOCAL_STORAGE_KEY, currentVideoUrl); }, [currentVideoUrl, isMounted]);
  useEffect(() => {
    if (isMounted) {
      const linksToStore = editableSocialLinks.map(({ key, url }) => ({ key, url }));
      localStorage.setItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY, JSON.stringify(linksToStore));
    }
  }, [editableSocialLinks, isMounted]);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(SECTION_STYLES_LOCAL_STORAGE_KEY, JSON.stringify(sectionCustomStyles));
    }
  }, [sectionCustomStyles, isMounted]);


  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar logoUrl={DEFAULT_LOGO_IMAGE_URL} />
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
    setAccounts((prevAccounts) => prevAccounts.map((acc) => acc.id === updatedAccountData.id ? { ...acc, ...updatedAccountData } : acc));
    toast({ title: "Sucesso!", description: "Conta atualizada." });
    setIsAccountFormOpen(false); setEditingAccount(null);
  };
  const handleDeleteAccount = (accountId: string) => {
    if (accountId === CUSTOM_ACCOUNT_SERVICE_ID) {
      toast({ title: "Ação não permitida", description: "O serviço de conta personalizada não pode ser excluído.", variant: "destructive" });
      return;
    }
    setAccounts((prevAccounts) => prevAccounts.filter((acc) => acc.id !== accountId));
    toast({ title: "Conta Removida", variant: "destructive" });
  };
  const handleToggleVisibility = (accountId: string) => {
    setAccounts((prevAccounts) => prevAccounts.map((acc) => acc.id === accountId ? { ...acc, isVisible: !acc.isVisible } : acc));
    toast({ title: "Visibilidade Alterada" });
  };
  const openEditAccountForm = (account: Account) => { setEditingAccount({ ...account }); setIsAccountFormOpen(true); };
  const openAddAccountForm = () => { setEditingAccount(null); setIsAccountFormOpen(true); }

  // FAQ Handlers
  const handleAddFaqItem = (newFaqItemData: Omit<FaqItem, "id">) => {
    const newFaqItem: FaqItem = { ...newFaqItemData, id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}` };
    setFaqItems((prevFaqs) => [newFaqItem, ...prevFaqs]);
    toast({ title: "Sucesso!", description: "Nova pergunta adicionada ao FAQ." });
    setIsFaqFormOpen(false);
  };
  const handleUpdateFaqItem = (updatedFaqItemData: FaqItem) => {
    setFaqItems((prevFaqs) => prevFaqs.map((faq) => faq.id === updatedFaqItemData.id ? { ...faq, ...updatedFaqItemData } : faq));
    toast({ title: "Sucesso!", description: "Pergunta do FAQ atualizada." });
    setIsFaqFormOpen(false); setEditingFaqItem(null);
  };
  const handleDeleteFaqItem = (faqId: string) => {
    setFaqItems((prevFaqs) => prevFaqs.filter((faq) => faq.id !== faqId));
    toast({ title: "Pergunta Removida", variant: "destructive" });
  };
  const openEditFaqForm = (faqItem: FaqItem) => { setEditingFaqItem({ ...faqItem }); setIsFaqFormOpen(true); };
  const openAddFaqForm = () => { setEditingFaqItem(null); setIsFaqFormOpen(true); };

  // Other Save Handlers (WhatsApp, Logo, Banner, Video, Social Links)
  const handleSaveWhatsAppNumber = () => {
    if (whatsAppNumberInput.trim() && /^\d+$/.test(whatsAppNumberInput.trim())) {
      setCurrentWhatsAppNumber(whatsAppNumberInput.trim());
      toast({ title: "Sucesso!", description: "Número do WhatsApp atualizado." });
    } else {
      toast({ title: "Erro", description: "Por favor, insira um número de WhatsApp válido (apenas dígitos).", variant: "destructive" });
    }
  };
  const handleSaveLogoImageUrl = () => {
    try { new URL(logoImageUrlInput.trim()); setCurrentLogoImageUrl(logoImageUrlInput.trim()); toast({ title: "Sucesso!", description: "URL da imagem do logotipo atualizada." });
    } catch (error) { toast({ title: "Erro", description: "URL inválida para a imagem do logotipo.", variant: "destructive" }); }
  };
  const handleSaveBannerImageUrl = () => {
    try { new URL(bannerImageUrlInput.trim()); setCurrentBannerImageUrl(bannerImageUrlInput.trim()); toast({ title: "Sucesso!", description: "URL da imagem do banner atualizada." });
    } catch (error) { toast({ title: "Erro", description: "URL inválida para a imagem do banner.", variant: "destructive" }); }
  };
  const handleSaveVideoUrl = () => {
    const trimmedUrl = videoUrlInput.trim();
    if (trimmedUrl === '') { setCurrentVideoUrl(''); toast({ title: "Sucesso!", description: "URL do vídeo removida." }); return; }
    const embedUrl = getVideoEmbedUrl(trimmedUrl);
    if (embedUrl) { setCurrentVideoUrl(embedUrl); toast({ title: "Sucesso!", description: "URL do vídeo atualizada." });
    } else { toast({ title: "Erro de Validação", description: "URL do YouTube ou Wistia inválida.", variant: "destructive" });}
  };
  const handleSocialLinkChange = (index: number, url: string) => {
    setEditableSocialLinks(prevLinks => 
      prevLinks.map((link, i) => i === index ? { ...link, url } : link)
    );
  };
  const handleSaveSocialLinks = () => {
    let allValid = true;
    for (const link of editableSocialLinks) {
        if (link.url && link.url.trim() !== '') {
            try { new URL(link.url.trim()); } catch (error) { allValid = false; toast({ title: "Erro de Validação de URL", description: `URL inválida para ${link.name}: ${link.url}`, variant: "destructive"}); break; }
        }
    }
    if (allValid) { 
      setSectionCustomStyles(prev => ({ ...prev })); // This forces update which triggers localStorage save
      toast({ title: "Sucesso!", description: "Configurações de redes sociais salvas." });
    }
  };

  const handleSectionStyleInputChange = (sectionKey: SectionIdentifier, field: keyof SectionBackgroundStyle, value: string) => {
    setTempSectionStyles(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [field]: value
      }
    }));
  };

  const handleSaveSectionStyle = (sectionKey: SectionIdentifier) => {
    const currentStyle = tempSectionStyles[sectionKey];
    if (currentStyle?.bgColor && currentStyle.bgColor.trim() !== '' && currentStyle?.bgImageUrl && currentStyle.bgImageUrl.trim() !== '') {
      toast({
        title: "Erro de Validação",
        description: `Para a seção "${sectionConfig.find(s => s.key === sectionKey)?.label}", forneça uma cor OU uma URL de imagem, não ambos.`,
        variant: "destructive",
      });
      return;
    }
    // Validate hex color if present
    if (currentStyle?.bgColor && currentStyle.bgColor.trim() !== '' && !/^#([0-9A-Fa-f]{3,4}){1,2}$/.test(currentStyle.bgColor)) {
        toast({ title: "Erro de Validação", description: `Cor hexadecimal inválida para a seção "${sectionConfig.find(s => s.key === sectionKey)?.label}". Use formato #RRGGBB ou #RGB.`, variant: "destructive" });
        return;
    }
    // Validate URL if present
    if (currentStyle?.bgImageUrl && currentStyle.bgImageUrl.trim() !== '') {
        try {
            new URL(currentStyle.bgImageUrl);
        } catch (error) {
            toast({ title: "Erro de Validação", description: `URL da imagem de fundo inválida para a seção "${sectionConfig.find(s => s.key === sectionKey)?.label}".`, variant: "destructive" });
            return;
        }
    }

    setSectionCustomStyles(prev => ({
      ...prev,
      [sectionKey]: currentStyle && ((currentStyle.bgColor && currentStyle.bgColor.trim() !== '') || (currentStyle.bgImageUrl && currentStyle.bgImageUrl.trim() !== '')) ? { ...currentStyle } : undefined
    }));
    toast({ title: "Sucesso!", description: `Estilo da seção "${sectionConfig.find(s => s.key === sectionKey)?.label}" salvo.` });
  };

  const handleResetSectionStyle = (sectionKey: SectionIdentifier) => {
    setTempSectionStyles(prev => ({
      ...prev,
      [sectionKey]: {} // Reset temp state
    }));
    setSectionCustomStyles(prev => {
      const updatedStyles = { ...prev };
      delete updatedStyles[sectionKey]; // Remove the key to signify default
      return updatedStyles;
    });
    toast({ title: "Estilo Resetado", description: `Estilo da seção "${sectionConfig.find(s => s.key === sectionKey)?.label}" resetado para o padrão.` });
  };


  const sortedAccounts = [...accounts].sort((a, b) => {
    if (a.id === CUSTOM_ACCOUNT_SERVICE_ID) return -1; if (b.id === CUSTOM_ACCOUNT_SERVICE_ID) return 1; return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar logoUrl={currentLogoImageUrl} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Painel de Administração</h1>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary"/>Gerenciar Contas e Serviços</CardTitle>
              <Dialog open={isAccountFormOpen} onOpenChange={(isOpen) => { setIsAccountFormOpen(isOpen); if (!isOpen) setEditingAccount(null); }}>
                <DialogTrigger asChild><Button onClick={openAddAccountForm} size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Conta</Button></DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>{editingAccount ? "Editar Conta/Serviço" : "Adicionar Nova Conta"}</DialogTitle></DialogHeader>
                  <AdminAccountForm onSubmitAccount={editingAccount ? handleUpdateAccount : handleAddAccount} initialData={editingAccount} onClose={() => { setIsAccountFormOpen(false); setEditingAccount(null); }} isEditingCustomService={editingAccount?.id === CUSTOM_ACCOUNT_SERVICE_ID} />
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>Adicione, edite ou remova contas e serviços disponíveis na loja.</CardDescription>
          </CardHeader>
          <CardContent><AdminAccountList accounts={sortedAccounts} onEdit={openEditAccountForm} onDelete={handleDeleteAccount} onToggleVisibility={handleToggleVisibility}/></CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader><CardTitle className="text-xl flex items-center"><WhatsAppIcon className="mr-2 h-5 w-5 text-primary" />Configurar Número do WhatsApp</CardTitle><CardDescription>Use apenas dígitos (ex: 5511999998888).</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-grow"><Label htmlFor="whatsapp-number" className="font-semibold">Número do WhatsApp</Label><Input id="whatsapp-number" type="tel" placeholder="Ex: 5511999998888" value={whatsAppNumberInput} onChange={(e) => setWhatsAppNumberInput(e.target.value)} className="mt-1"/></div>
              <Button onClick={handleSaveWhatsAppNumber}><Save className="mr-2 h-4 w-4" /> Salvar Número</Button>
            </div>
            <p className="text-sm text-muted-foreground">Número atual: <span className="font-semibold text-foreground">{currentWhatsAppNumber || "Não configurado"}</span></p>
          </CardContent>
        </Card>
        
        <Card className="mb-8 shadow-lg">
          <CardHeader><CardTitle className="text-xl flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" />Configurar Logotipo da Navbar</CardTitle><CardDescription>Link direto para a imagem (ex: Imgur).</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-grow"><Label htmlFor="logo-image-url" className="font-semibold">URL da Imagem do Logotipo</Label><Input id="logo-image-url" type="url" placeholder="https://i.imgur.com/nomedaimagem.png" value={logoImageUrlInput} onChange={(e) => setLogoImageUrlInput(e.target.value)} className="mt-1"/></div>
              <Button onClick={handleSaveLogoImageUrl}><Save className="mr-2 h-4 w-4" /> Salvar URL</Button>
            </div>
            {currentLogoImageUrl && <div><p className="text-sm text-muted-foreground mb-2">Prévia:</p><img src={currentLogoImageUrl} alt="Logo preview" className="max-h-20 object-contain" data-ai-hint="store logo"/></div>}
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader><CardTitle className="text-xl flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-primary" />Configurar Imagem do Banner Principal</CardTitle><CardDescription>Link direto para a imagem (ex: Imgur).</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-grow"><Label htmlFor="banner-image-url" className="font-semibold">URL da Imagem do Banner</Label><Input id="banner-image-url" type="url" placeholder="https://i.imgur.com/nomedaimagem.png" value={bannerImageUrlInput} onChange={(e) => setBannerImageUrlInput(e.target.value)} className="mt-1"/></div>
              <Button onClick={handleSaveBannerImageUrl}><Save className="mr-2 h-4 w-4" /> Salvar URL</Button>
            </div>
            {currentBannerImageUrl && <div><p className="text-sm text-muted-foreground mb-2">Prévia:</p><img src={currentBannerImageUrl} alt="Banner preview" className="rounded-md border max-h-48 object-contain" data-ai-hint="hero background"/></div>}
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader><CardTitle className="text-xl flex items-center"><Film className="mr-2 h-5 w-5 text-primary" />Configurar Vídeo em Destaque</CardTitle><CardDescription>Insira a URL de um vídeo do YouTube ou Wistia (watch, medias, embed, etc.).</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-grow"><Label htmlFor="video-url" className="font-semibold">URL do Vídeo (YouTube/Wistia)</Label><Input id="video-url" type="url" placeholder="https://www.youtube.com/watch?v=VIDEO_ID ou https://user.wistia.com/medias/VIDEO_ID" value={videoUrlInput} onChange={(e) => setVideoUrlInput(e.target.value)} className="mt-1"/></div>
              <Button onClick={handleSaveVideoUrl}><Save className="mr-2 h-4 w-4" /> Salvar URL</Button>
            </div>
            {currentVideoUrl && 
              <div>
                <p className="text-sm text-muted-foreground mb-2">Prévia:</p>
                <div className="aspect-video w-full max-w-md mx-auto">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={currentVideoUrl} 
                    title="Video player preview" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                    className="rounded-md border">
                  </iframe>
                </div>
              </div>
            }
          </CardContent>
        </Card>
        
        <Accordion type="multiple" defaultValue={[]} className="w-full space-y-8">
          <AccordionItem value="section-styles-section" className="border-none overflow-hidden rounded-lg shadow-lg">
            <Card className="m-0 shadow-none border-none rounded-none">
              <AccordionPrimitive.Header className="flex items-center justify-between w-full text-left bg-card data-[state=closed]:rounded-b-lg transition-all duration-300 ease-in-out">
                <AccordionPrimitive.Trigger className={cn("flex flex-1 items-center justify-between p-6 font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary [&[data-state=closed]>svg]:text-primary/70 hover:bg-muted/50")}>
                  <div className="flex flex-1 flex-col text-left">
                    <div className="flex items-center">
                      <Brush className="mr-3 h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-card-foreground">Estilização das Seções</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 pl-8">
                      Personalize o fundo de seções da página inicial.
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="bg-card rounded-b-lg">
                <div className="p-6 space-y-6">
                  {sectionConfig.map((config) => (
                    <Card key={config.key} className="p-4 shadow-sm">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="text-lg">{config.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-4">
                        <div>
                          <Label htmlFor={`section-bgcolor-${config.key}`} className="font-semibold">Cor de Fundo (Hexadecimal)</Label>
                          <Input 
                            id={`section-bgcolor-${config.key}`} 
                            type="text" 
                            placeholder="#RRGGBB ou #RGB" 
                            value={tempSectionStyles[config.key]?.bgColor || ''}
                            onChange={(e) => handleSectionStyleInputChange(config.key, 'bgColor', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`section-bgimage-${config.key}`} className="font-semibold">URL da Imagem de Fundo</Label>
                          <Input 
                            id={`section-bgimage-${config.key}`} 
                            type="url" 
                            placeholder="https://exemplo.com/imagem.png" 
                            value={tempSectionStyles[config.key]?.bgImageUrl || ''}
                            onChange={(e) => handleSectionStyleInputChange(config.key, 'bgImageUrl', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                         { (tempSectionStyles[config.key]?.bgImageUrl && tempSectionStyles[config.key]?.bgImageUrl.trim() !== '' && tempSectionStyles[config.key]?.bgColor && tempSectionStyles[config.key]?.bgColor.trim() !== '') &&
                            <p className="text-xs text-destructive">Forneça uma cor OU uma URL de imagem, não ambos.</p>
                         }
                        <div className="flex justify-end space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleResetSectionStyle(config.key)}>
                            <Trash2Icon className="mr-2 h-4 w-4" /> Resetar
                          </Button>
                          <Button size="sm" onClick={() => handleSaveSectionStyle(config.key)}>
                            <Save className="mr-2 h-4 w-4" /> Salvar Estilo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="social-links-section" className="border-none overflow-hidden rounded-lg shadow-lg">
            <Card className="m-0 shadow-none border-none rounded-none">
              <AccordionPrimitive.Header className="flex items-center justify-between w-full text-left bg-card data-[state=closed]:rounded-b-lg transition-all duration-300 ease-in-out">
                <AccordionPrimitive.Trigger className={cn("flex flex-1 items-center justify-between p-6 font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary [&[data-state=closed]>svg]:text-primary/70 hover:bg-muted/50")}>
                  <div className="flex flex-1 flex-col text-left">
                    <div className="flex items-center">
                      <Share2 className="mr-3 h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-card-foreground">Configurar Links de Redes Sociais</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 pl-8">
                      Adicione os links para suas redes sociais.
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="bg-card rounded-b-lg">
                <div className="p-6 space-y-6">
                  <div className="flex justify-end mb-4"><Button onClick={handleSaveSocialLinks} size="sm"><Save className="mr-2 h-4 w-4" /> Salvar Redes</Button></div>
                  {editableSocialLinks.map((platformLink, index) => { const IconComponent = platformLink.lucideIcon; return (
                    <Card key={platformLink.key} className="p-4">
                      <CardHeader className="p-0 pb-3"><CardTitle className="text-lg flex items-center">{IconComponent && <IconComponent className="mr-2 h-5 w-5 text-secondary" />}{platformLink.name}</CardTitle></CardHeader>
                      <CardContent className="p-0"><Label htmlFor={`social-url-${platformLink.key}`} className="font-semibold sr-only">URL para {platformLink.name}</Label><Input id={`social-url-${platformLink.key}`} type="url" placeholder={platformLink.placeholder} value={platformLink.url} onChange={(e) => handleSocialLinkChange(index, e.target.value)} className="mt-1"/></CardContent>
                    </Card>
                  );})}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="faq-section" className="border-none overflow-hidden rounded-lg shadow-lg">
             <Card className="m-0 shadow-none border-none rounded-none">
                <AccordionPrimitive.Header className="flex items-center justify-between w-full text-left bg-card data-[state=closed]:rounded-b-lg transition-all duration-300 ease-in-out">
                  <AccordionPrimitive.Trigger className={cn("flex flex-1 items-center justify-between p-6 font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary [&[data-state=closed]>svg]:text-primary/70 hover:bg-muted/50")}>
                    <div className="flex flex-1 flex-col text-left">
                        <div className="flex items-center">
                          <HelpCircleIcon className="mr-3 h-5 w-5 text-primary" />
                          <h3 className="text-xl font-semibold text-card-foreground">Gerenciar Perguntas Frequentes (FAQ)</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 pl-8">
                          Adicione, edite ou remova perguntas e respostas.
                        </p>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="bg-card rounded-b-lg">
                  <div className="p-6">
                    <div className="flex justify-end mb-4">
                      <Dialog open={isFaqFormOpen} onOpenChange={(isOpen) => { setIsFaqFormOpen(isOpen); if (!isOpen) setEditingFaqItem(null); }}>
                        <DialogTrigger asChild><Button onClick={openAddFaqForm} size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Pergunta</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                          <DialogHeader><DialogTitle>{editingFaqItem ? "Editar Pergunta do FAQ" : "Adicionar Nova Pergunta ao FAQ"}</DialogTitle></DialogHeader>
                          <AdminFaqForm onSubmitFaq={editingFaqItem ? handleUpdateFaqItem : handleAddFaqItem} initialData={editingFaqItem} onClose={() => { setIsFaqFormOpen(false); setEditingFaqItem(null); }} />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <AdminFaqList faqItems={faqItems} onEdit={openEditFaqForm} onDelete={handleDeleteFaqItem} />
                  </div>
                </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

      </main>
      <Footer />
    </div>
  );
}
