
"use client";

import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Account, FaqItem, SocialLink, PageSectionStyles, SectionIdentifier } from '@/types';
import {
  accountsData as fallbackAccountsData,
  DEFAULT_WHATSAPP_PHONE_NUMBER,
  initialFaqData as fallbackFaqData,
  FAQ_LOCAL_STORAGE_KEY,
  DEFAULT_BANNER_IMAGE_URL,
  BANNER_IMAGE_URL_LOCAL_STORAGE_KEY,
  SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY,
  initialSocialLinksData,
  socialPlatformConfig,
  DEFAULT_LOGO_IMAGE_URL,
  LOGO_IMAGE_URL_LOCAL_STORAGE_KEY,
  DEFAULT_VIDEO_URL,
  VIDEO_URL_LOCAL_STORAGE_KEY,
  SECTION_STYLES_LOCAL_STORAGE_KEY,
  initialSectionStyles,
  sectionConfig,
  CUSTOM_ACCOUNT_SERVICE_ID
} from '@/data/mockData';

const ACCOUNTS_LOCAL_STORAGE_KEY = 'panthStoreAccounts';
const WHATSAPP_LOCAL_STORAGE_KEY = 'panthStoreWhatsAppNumber';

export interface StoreDataContextType {
  accounts: Account[];
  faqItems: FaqItem[];
  whatsAppNumber: string;
  logoImageUrl: string;
  bannerImageUrl: string;
  videoUrl: string;
  socialLinks: SocialLink[];
  currentSectionStyles: PageSectionStyles;
  isMounted: boolean;
  getSectionStyle: (sectionKey: SectionIdentifier) => React.CSSProperties;
}

export const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

interface StoreDataProviderProps {
  children: ReactNode;
}

export function StoreDataProvider({ children }: StoreDataProviderProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState(DEFAULT_WHATSAPP_PHONE_NUMBER);
  const [logoImageUrl, setLogoImageUrl] = useState(DEFAULT_LOGO_IMAGE_URL);
  const [bannerImageUrl, setBannerImageUrl] = useState(DEFAULT_BANNER_IMAGE_URL);
  const [videoUrl, setVideoUrl] = useState(DEFAULT_VIDEO_URL);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinksData);
  const [currentSectionStyles, setCurrentSectionStyles] = useState<PageSectionStyles>(initialSectionStyles);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load Accounts
    const storedAccountsData = localStorage.getItem(ACCOUNTS_LOCAL_STORAGE_KEY);
    if (storedAccountsData) {
      try {
        const parsedAccounts = JSON.parse(storedAccountsData) as Account[];
        const customServiceFromStorage = parsedAccounts.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID);
        const otherAccounts = parsedAccounts.filter(acc => acc.id !== CUSTOM_ACCOUNT_SERVICE_ID);
        
        const fallbackCustomService = fallbackAccountsData.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID)!;

        let currentCustomService;
        if (customServiceFromStorage) {
            currentCustomService = {
                ...fallbackCustomService,      // 1. Start with fallback defaults (includes isCustomService, isSold, automaticDeliveryLink)
                ...customServiceFromStorage,   // 2. Override with stored custom values (name, details, price, image, isVisible)
                id: CUSTOM_ACCOUNT_SERVICE_ID, // 3. Ensure fixed properties that should not change
                isCustomService: true,
                isSold: fallbackCustomService.isSold, 
                automaticDeliveryLink: fallbackCustomService.automaticDeliveryLink
            };
        } else {
            currentCustomService = { ...fallbackCustomService };
        }
            
        setAccounts([currentCustomService, ...otherAccounts].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0) ));
      } catch (error) {
        console.error("Error parsing accounts from localStorage for context:", error);
        const customServiceOnError = fallbackAccountsData.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID)!;
        const otherAccountsOnError = fallbackAccountsData.filter(acc => acc.id !== CUSTOM_ACCOUNT_SERVICE_ID);
        setAccounts([customServiceOnError, ...otherAccountsOnError].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0)));
      }
    } else {
      const customServiceInitial = fallbackAccountsData.find(acc => acc.id === CUSTOM_ACCOUNT_SERVICE_ID)!;
      const otherAccountsInitial = fallbackAccountsData.filter(acc => acc.id !== CUSTOM_ACCOUNT_SERVICE_ID);
      setAccounts([customServiceInitial, ...otherAccountsInitial].sort((a, b) => (a.id === CUSTOM_ACCOUNT_SERVICE_ID ? -1 : b.id === CUSTOM_ACCOUNT_SERVICE_ID ? 1 : 0)));
    }

    // Load FAQs
    const storedFaqData = localStorage.getItem(FAQ_LOCAL_STORAGE_KEY);
    if (storedFaqData) {
      try {
        const parsedFaqs = JSON.parse(storedFaqData) as FaqItem[];
        setFaqItems(Array.isArray(parsedFaqs) ? parsedFaqs : [...fallbackFaqData]);
      } catch (error) {
        console.error("Error parsing FAQs from localStorage for context:", error);
        setFaqItems([...fallbackFaqData]);
      }
    } else {
      setFaqItems([...fallbackFaqData]);
    }

    setWhatsAppNumber(localStorage.getItem(WHATSAPP_LOCAL_STORAGE_KEY) || DEFAULT_WHATSAPP_PHONE_NUMBER);
    setLogoImageUrl(localStorage.getItem(LOGO_IMAGE_URL_LOCAL_STORAGE_KEY) || DEFAULT_LOGO_IMAGE_URL);
    setBannerImageUrl(localStorage.getItem(BANNER_IMAGE_URL_LOCAL_STORAGE_KEY) || DEFAULT_BANNER_IMAGE_URL);
    setVideoUrl(localStorage.getItem(VIDEO_URL_LOCAL_STORAGE_KEY) || DEFAULT_VIDEO_URL);

    const storedSocialLinksData = localStorage.getItem(SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY);
    if (storedSocialLinksData) {
        try {
            const parsedStoredLinks = JSON.parse(storedSocialLinksData) as Partial<SocialLink>[];
            const mergedLinks = socialPlatformConfig.map(configPlatform => {
                const storedPlatform = parsedStoredLinks.find(p => p.key === configPlatform.key);
                return { ...configPlatform, url: storedPlatform?.url || '' };
            });
            setSocialLinks(mergedLinks);
        } catch (error) {
            console.error("Error parsing social media links from localStorage for context:", error);
            setSocialLinks(initialSocialLinksData.map(link => ({...link})));
        }
    } else {
        setSocialLinks(initialSocialLinksData.map(link => ({...link})));
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
        console.error("Error parsing section styles from localStorage for context:", error);
        setCurrentSectionStyles(initialSectionStyles);
      }
    } else {
      setCurrentSectionStyles(initialSectionStyles);
    }

    setIsMounted(true);
  }, []);

  const getSectionStyle = (sectionKey: SectionIdentifier): React.CSSProperties => {
    if (!isMounted) return {}; // Return empty if not mounted to avoid using potentially uninitialized styles
    const style = currentSectionStyles[sectionKey];
    const cssProps: React.CSSProperties = {};
    if (style?.bgImageUrl && style.bgImageUrl.trim() !== '') {
      cssProps.backgroundImage = `url(${style.bgImageUrl})`;
      cssProps.backgroundSize = 'cover';
      cssProps.backgroundPosition = 'center';
      cssProps.backgroundRepeat = 'no-repeat';
    } else if (style?.bgColor && style.bgColor.trim() !== '') {
      cssProps.backgroundColor = style.bgColor;
    }
    return cssProps;
  };

  const value = {
    accounts,
    faqItems,
    whatsAppNumber,
    logoImageUrl,
    bannerImageUrl,
    videoUrl,
    socialLinks,
    currentSectionStyles,
    isMounted,
    getSectionStyle,
  };

  return (
    <StoreDataContext.Provider value={value}>
      {children}
    </StoreDataContext.Provider>
  );
}

