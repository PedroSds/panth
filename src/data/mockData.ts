import type { Category, Account } from '@/types';

export const WHATSAPP_PHONE_NUMBER = '5500000000000'; // Replace with actual WhatsApp number e.g. 55119XXXXXXXX

export const categoriesData: Category[] = [
  { id: 'lutador', name: 'Lutadores', icon: 'Swords', description: 'Contas com foco em campeões de combate corpo a corpo.' },
  { id: 'tanque', name: 'Tanques', icon: 'Shield', description: 'Contas com campeões de alta durabilidade e controle.' },
  { id: 'mago', name: 'Magos', icon: 'WandSparkles', description: 'Contas especializadas em dano mágico à distância.' },
  { id: 'atirador', name: 'Atiradores', icon: 'Crosshair', description: 'Contas com ênfase em causadores de dano físico à distância.' },
  { id: 'assassino', name: 'Assassinos', icon: 'VenetianMask', description: 'Contas com campeões de alto dano explosivo.' },
  { id: 'suporte', name: 'Suportes', icon: 'HeartPulse', description: 'Contas focadas em proteger e auxiliar aliados.' },
];

export const accountsData: Account[] = [
  { id: 'acc001', categoryId: 'lutador', name: 'Yasuo Imortal', price: 250, details: ['Skin Lendária Yasuo', 'Maestria 7', 'Elo: Diamante I'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'sword warrior' },
  { id: 'acc002', categoryId: 'lutador', name: 'Irelia Celestial', price: 220, details: ['Skin Divina Irelia', '25 Campeões', 'Elo: Platina IV'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'female warrior' },
  { id: 'acc003', categoryId: 'lutador', name: 'Sett Chefão', price: 180, details: ['Skin Sett Reinos Mech', 'Ícone Exclusivo', 'Elo: Ouro II'], isSold: true, image: 'https://placehold.co/300x200.png', imageHint: 'strong fighter' },
  { id: 'acc004', categoryId: 'tanque', name: 'Malphite Indestrutível', price: 150, details: ['Skin Shamrock Malphite', '15k Essência Azul', 'Elo: Prata III'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'rock monster' },
  { id: 'acc005', categoryId: 'tanque', name: 'Leona Solar Eclipse', price: 280, details: ['Skin Eclipse Solar Leona', 'Borda de Honra', 'Elo: Diamante III'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'sun knight' },
  { id: 'acc006', categoryId: 'mago', name: 'Lux Elementalista PRO', price: 450, details: ['Skin Ultimate Lux', 'Todos Campeões Magos', 'Elo: Mestre'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'magic girl' },
  { id: 'acc007', categoryId: 'mago', name: 'Ahri Florescer Espiritual', price: 200, details: ['Skin Florescer Ahri', 'Ícones KDA', 'Elo: Platina V'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'fox spirit' },
  { id: 'acc008', categoryId: 'atirador', name: 'Jinx Caos Intergalático', price: 260, details: ['Skin Lendária Jinx Odisseia', 'Maestria 7', 'Elo: Diamante IV'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'crazy shooter' },
  { id: 'acc009', categoryId: 'atirador', name: 'Kai\'Sa KDA ALL OUT', price: 300, details: ['Skin KDA Kai\'Sa Prestígio', 'Todas skins KDA', 'Elo: Mestre'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'pop star' },
  { id: 'acc010', categoryId: 'assassino', name: 'Zed Lâmina Sombria', price: 270, details: ['Skin Campeonato Zed', 'Full Chromas', 'Elo: Diamante II'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'ninja shadow' },
  { id: 'acc011', categoryId: 'suporte', name: 'Thresh Guardião Estelar', price: 190, details: ['Skin Guardião Estelar Thresh', 'Sentinelas Míticas', 'Elo: Ouro I'], isSold: false, image: 'https://placehold.co/300x200.png', imageHint: 'soul warden' },
  { id: 'acc012', categoryId: 'suporte', name: 'Soraka Emissária da Luz', price: 210, details: ['Skin Emissária da Luz Soraka', 'Ícones de Caridade', 'Elo: Platina II'], isSold: true, image: 'https://placehold.co/300x200.png', imageHint: 'star healer' },
];
