
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
  categoryId?: string; // Optional: if categories can be nested or related
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
  categoryId?: string; // Added for categorizing accounts
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

export interface SocialLink {
  key: SocialMediaKey;
  name: string;
  url: string;
  placeholder: string;
  icon?: React.ComponentType<{ className?: string }>; // Lucide icons or custom
}

export type SocialMediaLinks = Record<SocialMediaKey, string>;
