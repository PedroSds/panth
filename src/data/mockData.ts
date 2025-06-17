
import type { Account } from '@/types';

export const DEFAULT_WHATSAPP_PHONE_NUMBER = '5500000000000'; // Replace with actual WhatsApp number e.g. 55119XXXXXXXX

export const accountsData: Account[] = [
  {
    id: 'pronta001',
    name: 'UNRANKED LVL 30+ (PRONTA PARA RANQUEADA)',
    price: 85,
    details: [
      '10.000+ essências azuis',
      'Baús para abrir',
      'Capsulas para abrir',
      'MMR perfeito',
      '10 normal games jogados'
    ],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'lol ready',
    isVisible: true,
  },
  {
    id: 'pronta002',
    name: 'UNRANKED LVL 30+ (PRONTA PARA RANQUEADA)',
    price: 90,
    details: [
      '10.000+ essências azuis',
      'Baús para abrir',
      'Capsulas para abrir',
      'MMR perfeito',
      '10 normal games jogados'
    ],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'league account',
    isVisible: true,
  },
  {
    id: 'simples001',
    name: 'UNRANKED LVL 30+ (SIMPLES)',
    price: 65,
    details: [
      '10.000+ essências azuis',
      'Baús para abrir',
      'Capsulas para abrir',
      'MMR perfeito',
      'Precisa jogar 10 normal games para ir ranqueada'
    ],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'lol smurf',
    isVisible: true,
  },
];
