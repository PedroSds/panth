
"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { socialPlatformConfig, initialSocialLinksData, SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY, SECTION_STYLES_LOCAL_STORAGE_KEY, initialSectionStyles, sectionConfig } from '@/data/mockData';
import type { SocialLink, PageSectionStyles, SectionIdentifier, SectionBackgroundStyle, SocialMediaKey } from '@/types';
import { Save, Link as LinkIcon, Palette } from 'lucide-react';

export default function AdminStorefrontTab() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinksData.map(link => ({...link})));
  const [currentSectionStyles, setCurrentSectionStyles] = useState<PageSectionStyles>({...initialSectionStyles});
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedSocialLinksData = localStorage.getItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY);
    if (storedSocialLinksData) {
        try {
            const parsedStoredLinks = JSON.parse(storedSocialLinksData) as {key: SocialMediaKey, url: string}[];
            const mergedLinks = socialPlatformConfig.map(configPlatform => {
                const storedPlatform = parsedStoredLinks.find(p => p.key === configPlatform.key);
                return { ...configPlatform, url: storedPlatform?.url || '' };
            });
            setSocialLinks(mergedLinks);
        } catch (error) {
            console.error("Error parsing social media links from localStorage:", error);
            setSocialLinks(initialSocialLinksData.map(link => ({...link}))); // Ensure full structure
        }
    } else {
        setSocialLinks(initialSocialLinksData.map(link => ({...link}))); // Ensure full structure
    }

    const storedSectionStylesData = localStorage.getItem(SECTION_STYLES_LOCAL_STORAGE_KEY);
    if (storedSectionStylesData) {
      try {
        const parsedStyles = JSON.parse(storedSectionStylesData) as PageSectionStyles;
        const validatedStyles: PageSectionStyles = { ...initialSectionStyles };
         for (const config of sectionConfig) {
          if (parsedStyles[config.key]) {
            validatedStyles[config.key] = parsedStyles[config.key];
          }
        }
        setCurrentSectionStyles(validatedStyles);
      } catch (error) {
        console.error("Error parsing section styles from localStorage:", error);
        setCurrentSectionStyles({...initialSectionStyles});
      }
    } else {
      setCurrentSectionStyles({...initialSectionStyles});
    }
    setIsMounted(true);
  }, []);


  const handleSocialLinkChange = (key: SocialLink['key'], value: string) => {
    setSocialLinks(prevLinks => 
      prevLinks.map(link => link.key === key ? { ...link, url: value } : link)
    );
  };

  const handleSectionStyleChange = (sectionKey: SectionIdentifier, property: keyof SectionBackgroundStyle, value: string) => {
    setCurrentSectionStyles(prevStyles => ({
      ...prevStyles,
      [sectionKey]: {
        ...(prevStyles[sectionKey] || {}), // Ensure object exists
        [property]: value,
      }
    }));
  };

  const handleSaveStorefrontSettings = () => {
    if (!isMounted) return;
    // Save only key and url for social links to keep it lean
    localStorage.setItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY, JSON.stringify(socialLinks.map(({key, url}) => ({key, url}))));
    localStorage.setItem(SECTION_STYLES_LOCAL_STORAGE_KEY, JSON.stringify(currentSectionStyles));
    toast({
      title: "Aparência da Loja Salva!",
      description: "As configurações de links sociais e fundos de seção foram atualizadas.",
    });
  };

  if (!isMounted) {
    return <div className="p-4 text-center">Carregando configurações de aparência da loja...</div>;
  }

  return (
    <div className="space-y-8 p-1 md:p-2">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Aparência da Loja</h2>
        <p className="text-muted-foreground">Configure links de redes sociais e a aparência das seções da sua loja.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-lg"><LinkIcon className="mr-2 h-5 w-5 text-primary" /> Links de Redes Sociais</CardTitle>
          <CardDescription>Adicione os links para suas redes sociais. Eles aparecerão na seção de contato. Deixe em branco para não exibir.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {socialLinks.map(link => {
            const LucideIconComponent = link.lucideIcon;
            return (
              <div key={link.key} className="space-y-1">
                <Label htmlFor={`social-${link.key}`} className="flex items-center text-sm">
                  {LucideIconComponent && <LucideIconComponent className="mr-2 h-4 w-4 text-muted-foreground" />}
                  {link.name}
                </Label>
                <Input
                  id={`social-${link.key}`}
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(link.key, e.target.value)}
                  placeholder={link.placeholder}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-lg"><Palette className="mr-2 h-5 w-5 text-primary" /> Aparência das Seções</CardTitle>
          <CardDescription>Personalize o fundo de cada seção da página inicial. Use cores HEX (ex: #FFFFFF) ou URLs de imagem. Se ambos forem preenchidos para uma seção, a imagem terá prioridade.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sectionConfig.map(section => (
            <div key={section.key} className="p-4 border rounded-lg shadow-inner bg-muted/30">
              <h3 className="text-md font-medium mb-3 text-primary">{section.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor={`section-bgcolor-${section.key}`} className="text-sm">Cor de Fundo (Ex: #000000)</Label>
                  <Input 
                    id={`section-bgcolor-${section.key}`}
                    value={currentSectionStyles[section.key]?.bgColor || ''}
                    onChange={(e) => handleSectionStyleChange(section.key, 'bgColor', e.target.value)}
                    placeholder="#FFFFFF"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`section-bgimage-${section.key}`} className="text-sm">URL da Imagem de Fundo</Label>
                  <Input 
                    id={`section-bgimage-${section.key}`}
                    value={currentSectionStyles[section.key]?.bgImageUrl || ''}
                    onChange={(e) => handleSectionStyleChange(section.key, 'bgImageUrl', e.target.value)}
                    placeholder="https://exemplo.com/fundo.jpg"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveStorefrontSettings} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações de Aparência
        </Button>
      </div>
    </div>
  );
}
