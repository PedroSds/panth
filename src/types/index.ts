
import type { LucideIcon as LucideIconType } from 'lucide-react'; // Renamed to avoid conflict
import type { SVGProps, ComponentType } from 'react';

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
  isVisible: boolean;
  isCustomService?: boolean;
  categoryId?: string;
  automaticDeliveryLink: string;
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

// Type for either a LucideIcon or a custom SVG component that accepts SVGProps
export type LucideOrCustomIcon = ComponentType<SVGProps<SVGSVGElement>>;


export interface SocialPlatformConfigEntry {
  key: SocialMediaKey;
  name: string;
  placeholder: string;
  lucideIcon: LucideOrCustomIcon;
}

export interface SocialLink extends SocialPlatformConfigEntry {
  url: string;
}

    