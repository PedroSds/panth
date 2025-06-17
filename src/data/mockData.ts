
import type { Account } from '@/types';

export const WHATSAPP_PHONE_NUMBER = '5500000000000'; // Replace with actual WhatsApp number e.g. 55119XXXXXXXX

export const accountsData: Account[] = [
  {
    id: 'unr001',
    name: 'Conta Unranked Padrão #1',
    price: 75,
    details: ['Lvl 30+', '10+ normal games jogados', 'Pronta para Ranqueada'],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'league of legends unranked'
  },
  {
    id: 'unr002',
    name: 'Conta Unranked Padrão #2',
    price: 75,
    details: ['Lvl 30+', '10+ normal games jogados', 'Pronta para Ranqueada'],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'lol account'
  },
  {
    id: 'unr003',
    name: 'Conta Unranked Padrão #3',
    price: 80, // Slight variation for example
    details: ['Lvl 30+', '15+ normal games jogados', 'Pronta para Ranqueada'],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'new account'
  },
  {
    id: 'unr004',
    name: 'Conta Unranked Padrão #4',
    price: 70,
    details: ['Lvl 30+', '10+ normal games jogados', 'Pronta para Ranqueada'],
    isSold: true, // Example of a sold account
    image: 'https://placehold.co/300x200.png',
    imageHint: 'gaming account'
  },
   {
    id: 'unr005',
    name: 'Conta Unranked Padrão #5',
    price: 75,
    details: ['Lvl 30+', '10+ normal games jogados', 'Pronta para Ranqueada'],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'unranked smurf'
  },
];
