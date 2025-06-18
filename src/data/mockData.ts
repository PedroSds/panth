
import type { Account, FaqItem, LucideIconName, SocialPlatformConfigEntry, SocialLink } from '@/types';
import { Instagram, Twitter, Youtube, Send, MessageCircle, Phone } from 'lucide-react';

export const DEFAULT_WHATSAPP_PHONE_NUMBER = '5500000000000';
export const CUSTOM_ACCOUNT_SERVICE_ID = 'custom-account-service';
export const FAQ_LOCAL_STORAGE_KEY = 'panthStoreFaqItems';
export const DEFAULT_BANNER_IMAGE_URL = 'https://noticias.maisesports.com.br/wp-content/uploads/2018/11/honra-riot.png';
export const BANNER_IMAGE_URL_LOCAL_STORAGE_KEY = 'panthStoreBannerImageUrl';
export const SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY = 'panthStoreSocialLinksData';


export const customAccountServiceData: Account = {
  id: CUSTOM_ACCOUNT_SERVICE_ID,
  name: 'Crie sua Conta Personalizada (Serviço de Upar)',
  price: 50,
  details: [
    'Iremos upar uma conta do 0 ao 30 pra você',
    'Você escolhe o nome para login e o primeiro nickname',
    'Capsulas adquiridas serão preservadas pra você abrir',
    'Baùs adquiridos serão preservados para você abrir',
    'Prazo de entrega de 3 dias após o pagamento',
  ],
  isSold: false,
  image: 'https://placehold.co/300x200.png',
  imageHint: 'custom service account',
  isVisible: true,
  isCustomService: true,
};


export const accountsData: Account[] = [
  customAccountServiceData,
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
  }
];

export const initialFaqData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Quem somos?',
    answer: 'Somos a PanthStore, sua loja especializada em contas de League of Legends. Oferecemos contas prontas e serviços de personalização para você começar a jogar no seu nível desejado com segurança e rapidez.',
    icon: 'Users',
  },
  {
    id: 'faq-2',
    question: 'Qual o tempo de entrega?',
    answer: 'Para contas prontas, a entrega dos dados é feita imediatamente após a confirmação do pagamento via WhatsApp. Para contas personalizadas (serviço de upar), o prazo é de até 3 dias úteis.',
    icon: 'Clock',
  },
  {
    id: 'faq-3',
    question: 'Qual o horário de funcionamento?',
    answer: 'Nosso atendimento online via WhatsApp funciona das 10:00 às 22:00, de Segunda a Sábado. Compras podem ser iniciadas a qualquer momento.',
    icon: 'CalendarDays',
  },
  {
    id: 'faq-4',
    question: 'Qual é a garantia de vocês?',
    answer: 'Oferecemos garantia total sobre as contas e serviços. Caso haja qualquer problema com o acesso ou características da conta que não correspondam ao anunciado, entre em contato conosco para suporte e resolução.',
    icon: 'ShieldCheck',
  },
  {
    id: 'faq-5',
    question: 'Quais as formas de pagamento?',
    answer: 'Aceitamos pagamentos via PIX, transferência bancária e PicPay. Todos os detalhes são combinados diretamente pelo WhatsApp para sua segurança e comodidade.',
    icon: 'CircleDollarSign',
  },
];

export const faqIconList: { value: LucideIconName; label: string }[] = [
  { value: 'Users', label: 'Pessoas (Quem Somos)' },
  { value: 'Clock', label: 'Relógio (Tempo)' },
  { value: 'CalendarDays', label: 'Calendário (Horário)' },
  { value: 'ShieldCheck', label: 'Escudo (Garantia)' },
  { value: 'CircleDollarSign', label: 'Dinheiro (Pagamento)' },
  { value: 'CreditCard', label: 'Cartão de Crédito' },
  { value: 'Wallet', label: 'Carteira' },
  { value: 'Truck', label: 'Caminhão (Entrega)' },
  { value: 'HelpCircle', label: 'Interrogação (Ajuda)' },
  { value: 'Info', label: 'Informação' },
  { value: 'MessageSquare', label: 'Balão de Fala' },
  { value: 'ShieldQuestion', label: 'Escudo com Interrogação' },
  { value: 'BookOpen', label: 'Livro Aberto' },
  { value: 'Tag', label: 'Etiqueta (Preço/Promoção)' },
  { value: 'Star', label: 'Estrela (Destaque)' },
  { value: 'Anchor', label: 'Âncora (Estabilidade/Confiança)' },
];

export const socialPlatformConfig: SocialPlatformConfigEntry[] = [
  { key: 'discord', name: 'Discord', placeholder: 'https://discord.gg/seu-servidor', lucideIcon: MessageCircle },
  { key: 'whatsapp', name: 'WhatsApp', placeholder: 'https://wa.me/5511999998888', lucideIcon: Phone },
  { key: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/seuusuario', lucideIcon: Instagram },
  { key: 'twitter', name: 'Twitter (X)', placeholder: 'https://twitter.com/seuusuario', lucideIcon: Twitter },
  { key: 'youtube', name: 'Youtube', placeholder: 'https://youtube.com/seu-canal', lucideIcon: Youtube },
  { key: 'telegram', name: 'Telegram', placeholder: 'https://t.me/seuusuario', lucideIcon: Send },
];

export const initialSocialLinksData: SocialLink[] = socialPlatformConfig.map(platform => {
  return {
    ...platform,
    url: '',
  };
});
