import type { LucideIcon } from 'lucide-react';

export type CategoryIconName =
  | 'Swords'
  | 'Shield'
  | 'WandSparkles'
  | 'Crosshair'
  | 'VenetianMask'
  | 'HeartPulse';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: CategoryIconName;
  categoryId?: string; 
}

export interface Account {
  id: string;
  name: string;
  price: number;
  details: string[];
  isSold: boolean;
  image: string;
  imageHint: string;
  isVisible: boolean;
  isCustomService?: boolean;
  categoryId?: string; 
}

export interface CustomAccountFormData {
  accountLogin: string;
  nickname: string;
  description?: string;
}

export type LucideIconName =
  | 'Star'
  | 'Clock'
  | 'CalendarDays'
  | 'Anchor'
  | 'Wallet'
  | 'CreditCard'
  | 'HelpCircle'
  | 'Info'
  | 'MessageSquare'
  | 'ShieldQuestion'
  | 'BookOpen'
  | 'Tag'
  | 'Users'
  | 'Truck'
  | 'ShieldCheck'
  | 'CircleDollarSign';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: LucideIconName;
}

export type SocialMediaKey = 'discord' | 'whatsapp' | 'instagram' | 'twitter' | 'youtube' | 'telegram';

export interface SocialPlatformConfigEntry {
  key: SocialMediaKey;
  name: string;
  placeholder: string; 
  lucideIcon?: LucideIcon; 
}

export interface SocialLink extends SocialPlatformConfigEntry {
  url: string;         
}
