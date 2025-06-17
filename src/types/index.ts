import type { LucideIcon } from 'lucide-react';

// Define a type for valid Lucide icon names used in categories
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
  icon: CategoryIconName; // Changed from LucideIcon to string
  description: string;
}

export interface Account {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  details: string[];
  isSold: boolean;
  image: string;
  imageHint: string;
}

export interface CustomAccountFormData {
  desiredNickname: string;
  desiredLogin: string;
  desiredPassword?: string;
}
