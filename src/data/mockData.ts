
import type { Account, Category } from '@/types';

export const DEFAULT_WHATSAPP_PHONE_NUMBER = '5500000000000'; // Replace with actual WhatsApp number e.g. 55119XXXXXXXX

// categoriesData não é mais usada diretamente pela HomePage ou AdminForm, mas pode ser mantida se o CategoryAccordion for usado em outro lugar.
// Se não, pode ser removida. Por enquanto, vamos deixar, pois o componente CategoryAccordion ainda existe.
export const categoriesData: Category[] = [
  {
    id: 'cat_pronta',
    name: 'Contas Prontas para Ranqueada',
    description: 'Contas nível 30+ com normal games jogados, prontas para suas partidas ranqueadas.',
    icon: 'Swords',
  },
  {
    id: 'cat_simples',
    name: 'Contas Simples (Unranked)',
    description: 'Contas nível 30+ que precisam de alguns normal games antes de entrar nas ranqueadas.',
    icon: 'Shield',
  },
  {
    id: 'cat_skins',
    name: 'Contas com Skins Raras',
    description: 'Contas selecionadas com skins raras e valiosas.',
    icon: 'VenetianMask',
  },
];

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
    // categoryId: 'cat_pronta', // Removido
  },
  {
    id: 'pronta002',
    name: 'UNRANKED LVL 30+ (PRONTA)',
    price: 90,
    details: [
      '15.000+ essências azuis',
      'Baús e Cápsulas',
      'MMR Excelente',
      'Pronta para Ranqueadas'
    ],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'league account',
    isVisible: true,
    // categoryId: 'cat_pronta', // Removido
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
    // categoryId: 'cat_simples', // Removido
  },
  {
    id: 'skins001',
    name: 'CONTA GOLD IV (VAYNE PRESTÍGIO)',
    price: 250,
    details: [
      'Vayne Sentinela Prestígio',
      'Yasuo True Damage',
      'Elo: Gold IV',
      '50+ Campeões'
    ],
    isSold: false,
    image: 'https://placehold.co/300x200.png',
    imageHint: 'rare skin',
    isVisible: true,
    // categoryId: 'cat_skins', // Removido
  }
];
