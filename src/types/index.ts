
export interface Account {
  id: string;
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
