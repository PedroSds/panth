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

// This defines the configuration for each platform (name, placeholder, default icon)
export interface SocialPlatformConfigEntry {
  key: SocialMediaKey;
  name: string;
  placeholder: string; // For the URL input in admin
  lucideIcon?: LucideIcon; // Fallback Lucide icon component
}

// This defines the actual data stored and used, including user-provided URL and SVG
export interface SocialLink extends SocialPlatformConfigEntry {
  url: string;         // User-defined URL, initially empty
  customSvg?: string;   // User-uploaded SVG string, initially empty or undefined
}

// This type is no longer a simple Record, it's an array of SocialLink objects.
// The old SocialMediaLinks type can be removed or considered deprecated.
// For clarity, we won't reuse SocialMediaLinks for the array type.
