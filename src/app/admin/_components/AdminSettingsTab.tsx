
"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  DEFAULT_WHATSAPP_PHONE_NUMBER, 
  DEFAULT_LOGO_IMAGE_URL, 
  DEFAULT_BANNER_IMAGE_URL, 
  DEFAULT_VIDEO_URL,
  DEFAULT_FAVICON_ICO_URL,
  DEFAULT_FAVICON_PNG_URL,
  DEFAULT_FAVICON_SVG_URL,
  DEFAULT_APPLE_ICON_URL,
  FAVICON_ICO_URL_LOCAL_STORAGE_KEY,
  FAVICON_PNG_URL_LOCAL_STORAGE_KEY,
  FAVICON_SVG_URL_LOCAL_STORAGE_KEY,
  APPLE_ICON_URL_LOCAL_STORAGE_KEY
} from '@/data/mockData';
import { Save, Phone, Image as ImageIcon, Youtube as YoutubeIcon, Star as FaviconIcon } from 'lucide-react';

const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';
const LOGO_IMAGE_URL_LOCAL_STORAGE_KEY = 'panthStoreLogoImageUrl';
const BANNER_IMAGE_URL_LOCAL_STORAGE_KEY = 'panthStoreBannerImageUrl';
const VIDEO_URL_LOCAL_STORAGE_KEY = 'panthStoreVideoUrl';

export default function AdminSettingsTab() {
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [logoImageUrl, setLogoImageUrl] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [faviconIcoUrl, setFaviconIcoUrl] = useState('');
  const [faviconPngUrl, setFaviconPngUrl] = useState('');
  const [faviconSvgUrl, setFaviconSvgUrl] = useState('');
  const [appleIconUrl, setAppleIconUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setWhatsAppNumber(localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY) || DEFAULT_WHATSAPP_PHONE_NUMBER);
    setLogoImageUrl(localStorage.getItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY) || DEFAULT_LOGO_IMAGE_URL);
    setBannerImageUrl(localStorage.getItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY) || DEFAULT_BANNER_IMAGE_URL);
    setVideoUrl(localStorage.getItem(VIDEO_URL_LOCAL_STORAGE_KEY) || DEFAULT_VIDEO_URL);
    setFaviconIcoUrl(localStorage.getItem(FAVICON_ICO_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_ICO_URL);
    setFaviconPngUrl(localStorage.getItem(FAVICON_PNG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_PNG_URL);
    setFaviconSvgUrl(localStorage.getItem(FAVICON_SVG_URL_LOCAL_STORAGE_KEY) || DEFAULT_FAVICON_SVG_URL);
    setAppleIconUrl(localStorage.getItem(APPLE_ICON_URL_LOCAL_STORAGE_KEY) || DEFAULT_APPLE_ICON_URL);
    setIsMounted(true);
  }, []);

  const handleSaveSettings = () => {
    if (!isMounted) return;
    localStorage.setItem(WHATSAPP_LOCAL_STORAGE_KEY, whatsAppNumber);
    localStorage.setItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY, logoImageUrl);
    localStorage.setItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY, bannerImageUrl);
    localStorage.setItem(VIDEO_URL_LOCAL_STORAGE_KEY, videoUrl);
    localStorage.setItem(FAVICON_ICO_URL_LOCAL_STORAGE_KEY, faviconIcoUrl);
    localStorage.setItem(FAVICON_PNG_URL_LOCAL_STORAGE_KEY, faviconPngUrl);
    localStorage.setItem(FAVICON_SVG_URL_LOCAL_STORAGE_KEY, faviconSvgUrl);
    localStorage.setItem(APPLE_ICON_URL_LOCAL_STORAGE_KEY, appleIconUrl);
    toast({
      title: "Configurações Salvas!",
      description: "As configurações gerais da loja foram atualizadas.",
    });
  };
  
  if (!isMounted) {
    return <div className="p-4 text-center">Carregando configurações gerais...</div>;
  }

  return (
    <div className="space-y-8 p-1 md:p-2">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Configurações Gerais da Loja</h2>
        <p className="text-muted-foreground">Ajuste informações importantes como contato, mídias e favicons.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Phone className="mr-2 h-5 w-5 text-primary" /> Contato Principal</CardTitle>
            <CardDescription>Número de WhatsApp para contato e pedidos personalizados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Label htmlFor="whatsAppNumber">WhatsApp (ex: 5511999998888)</Label>
              <Input 
                id="whatsAppNumber" 
                value={whatsAppNumber} 
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                placeholder={DEFAULT_WHATSAPP_PHONE_NUMBER}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><YoutubeIcon className="mr-2 h-5 w-5 text-primary" /> Vídeo em Destaque</CardTitle>
            <CardDescription>URL do vídeo do YouTube para incorporar na página inicial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
              <Label htmlFor="videoUrl">URL do Vídeo (formato de incorporar)</Label>
              <Input 
                id="videoUrl" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/seu-video-id"
              />
              <p className="text-xs text-muted-foreground pt-1">
                Ex: <code>https://www.youtube.com/embed/ID_DO_VIDEO</code>. Deixe em branco para não exibir.
              </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-lg"><ImageIcon className="mr-2 h-5 w-5 text-primary" /> Imagens da Loja</CardTitle>
          <CardDescription>URLs para o logotipo no cabeçalho e o banner principal da página inicial.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label htmlFor="logoImageUrl">URL do Logotipo</Label>
            <Input 
              id="logoImageUrl" 
              value={logoImageUrl} 
              onChange={(e) => setLogoImageUrl(e.target.value)}
              placeholder={DEFAULT_LOGO_IMAGE_URL}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bannerImageUrl">URL do Banner da Página Inicial</Label>
            <Input 
              id="bannerImageUrl" 
              value={bannerImageUrl} 
              onChange={(e) => setBannerImageUrl(e.target.value)}
              placeholder={DEFAULT_BANNER_IMAGE_URL}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-lg"><FaviconIcon className="mr-2 h-5 w-5 text-primary" /> Favicons da Loja</CardTitle>
          <CardDescription>URLs para os favicons. Use URLs absolutas (ex: https://...). Deixe em branco para usar os padrões.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <Label htmlFor="faviconIcoUrl">URL do Favicon .ico (Ex: /favicon.ico ou URL completa)</Label>
            <Input 
              id="faviconIcoUrl" 
              value={faviconIcoUrl} 
              onChange={(e) => setFaviconIcoUrl(e.target.value)}
              placeholder={DEFAULT_FAVICON_ICO_URL}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="faviconPngUrl">URL do Favicon .png (Ex: /icon.png ou URL completa)</Label>
            <Input 
              id="faviconPngUrl" 
              value={faviconPngUrl} 
              onChange={(e) => setFaviconPngUrl(e.target.value)}
              placeholder={DEFAULT_FAVICON_PNG_URL}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="faviconSvgUrl">URL do Favicon .svg (Ex: /icon.svg ou URL completa)</Label>
            <Input 
              id="faviconSvgUrl" 
              value={faviconSvgUrl} 
              onChange={(e) => setFaviconSvgUrl(e.target.value)}
              placeholder={DEFAULT_FAVICON_SVG_URL}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="appleIconUrl">URL do Apple Touch Icon (Ex: /apple-icon.png ou URL completa)</Label>
            <Input 
              id="appleIconUrl" 
              value={appleIconUrl} 
              onChange={(e) => setAppleIconUrl(e.target.value)}
              placeholder={DEFAULT_APPLE_ICON_URL}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveSettings} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações Gerais
        </Button>
      </div>
    </div>
  );
}
