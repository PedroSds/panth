
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
