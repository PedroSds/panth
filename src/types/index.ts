
export interface Account {
  id: string;
  name: string;
  price: number;
  details: string[];
  isSold: boolean;
  image: string;
  imageHint: string;
  isVisible: boolean; // Added for admin control
}

export interface CustomAccountFormData {
  desiredNickname: string;
  desiredLogin: string;
  desiredPassword?: string;
}
