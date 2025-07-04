
import type { Account, FaqItem, LucideIconName, SocialPlatformConfigEntry, SocialLink, PageSectionStyles, SectionConfig } from '@/types';
import { Instagram, Twitter, Youtube, Send, Star, Brush } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { DiscordIcon } from '@/components/icons/DiscordIcon';


export const DEFAULT_WHATSAPP_PHONE_NUMBER = '5538998047553';
export const CUSTOM_ACCOUNT_SERVICE_ID = 'custom-account-service';
export const FAQ_LOCAL_STORAGE_KEY = 'panthStoreFaqItems';

export const DEFAULT_BANNER_IMAGE_URL = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pantheon_0.jpg';
export const BANNER_IMAGE_URL_LOCAL_STORAGE_KEY = 'panthStoreBannerImageUrl';

export const DEFAULT_LOGO_IMAGE_URL = 'https://i.imgur.com/4RDlzjM.png';
export const LOGO_IMAGE_URL_LOCAL_STORAGE_KEY = 'panthStoreLogoImageUrl';

export const SOCIAL_MEDIA_LINKS_LOCAL_STORAGE_KEY = 'panthStoreSocialLinksData';

export const DEFAULT_VIDEO_URL = 'https://fast.wistia.net/embed/iframe/p9nfm9gt03';
export const VIDEO_URL_LOCAL_STORAGE_KEY = 'panthStoreVideoUrl';

export const SECTION_STYLES_LOCAL_STORAGE_KEY = 'panthStoreSectionStyles';

// Favicon URLs and localStorage keys
export const DEFAULT_FAVICON_ICO_URL = 'https://i.imgur.com/cp6T8Ot.png';
export const FAVICON_ICO_URL_LOCAL_STORAGE_KEY = 'panthStoreFaviconIcoUrl';
export const DEFAULT_FAVICON_PNG_URL = 'https://i.imgur.com/cp6T8Ot.png';
export const FAVICON_PNG_URL_LOCAL_STORAGE_KEY = 'panthStoreFaviconPngUrl';
export const DEFAULT_FAVICON_SVG_URL = 'https://i.imgur.com/cp6T8Ot.png';
export const FAVICON_SVG_URL_LOCAL_STORAGE_KEY = 'panthStoreFaviconSvgUrl';
export const DEFAULT_APPLE_ICON_URL = 'https://i.imgur.com/cp6T8Ot.png';
export const APPLE_ICON_URL_LOCAL_STORAGE_KEY = 'panthStoreAppleIconUrl';


export const initialSectionStyles: PageSectionStyles = {
  accounts: undefined,
  video: undefined,
  faq: undefined,
  contact: undefined,
};

export const sectionConfig: SectionConfig[] = [
  { key: 'accounts', label: 'Contas Disponíveis' },
  { key: 'video', label: 'Vídeo em Destaque' },
  { key: 'faq', label: 'Perguntas Frequentes (FAQ)' },
  { key: 'contact', label: 'Entre em Contato' },
];


export const customAccountServiceData: Account = {
  id: CUSTOM_ACCOUNT_SERVICE_ID,
  name: 'PERSONALIZADA (PERSONALIZE SUA CONTA)',
  price: 60,
  details: [
    'Iremos upar uma conta do 0 ao 30 pra você',
    'Você escolhe o nome para login e o primeiro nickname',
    'Capsulas adquiridas serão preservadas pra você abrir',
    'Baús adquiridos serão preservados para você abrir',
    'Prazo de entrega de 3 dias após o pagamento',
  ],
  isSold: false,
  image: 'https://noticias.maisesports.com.br/wp-content/uploads/2018/11/honra-riot.png',
  isVisible: true,
  isCustomService: true,
  automaticDeliveryLink: '',
};


export const accountsData: Account[] = [
  customAccountServiceData,
  {
    id: 'pronta001',
    name: 'UNRANKED LVL 30+ (PRONTA PARA RANQUEADA)',
    price: 45,
    details: [
      '10.000+ essências azuis.',
      'Baús para abrir.',
      'Capsulas para abrir.',
      'MMR Excelente.',
      '10 Normal Games Jogados'
    ],
    isSold: false,
    image: 'https://i.imgur.com/AKlQVNM.png',
    isVisible: true,
    automaticDeliveryLink: 'https://discord.gg/vxxrK3bd',
  },
  {
    id: 'pronta002',
    name: 'UNRANKED LVL 30+ (SIMPLES)',
    price: 35,
    details: [
      '10.000+ essências azuis.',
      'Baús para abrir.',
      'Capsulas para abrir.',
      'MMR Excelente.',
      'Precisa jogar 10 normal games para ir ranqueada'
    ],
    isSold: false,
    image: 'https://i.imgur.com/gxrSpzR.png',
    isVisible: true,
    automaticDeliveryLink: 'https://discord.gg/vxxrK3bd',
  },
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
    answer: 'Para contas prontas com botão de compra e "Entrega Automática", o acesso é liberado instantaneamente após a confirmação do pagamento pelo link fornecido. Para contas personalizadas (serviço de upar), o prazo é de até 3 dias úteis após o pagamento. Se uma conta não tiver link de entrega automática, o processo é manual via WhatsApp.',
    icon: 'Clock',
  },
  {
    id: 'faq-3',
    question: 'Qual o horário de funcionamento?',
    answer: 'Nosso atendimento online via WhatsApp funciona das 10:00 às 22:00, de Segunda a Sábado. Compras com entrega automática podem ser feitas a qualquer momento, 24/7.',
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
    answer: 'Para entrega automática, o link de pagamento do botão de compra fornecerá as opções disponíveis na plataforma de venda. Para serviços de conta personalizada via WhatsApp, aceitamos PIX, transferência bancária e PicPay.',
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
  { value: 'Star', label: 'Estrela (Destaque/Feedback)' },
  { value: 'Anchor', label: 'Âncora (Estabilidade/Confiança)' },
  { value: 'Brush', label: 'Pincel (Estilo)'},
];

export const socialPlatformConfig: SocialPlatformConfigEntry[] = [
  { key: 'discord', name: 'Discord', placeholder: 'https://discord.gg/seu-servidor', lucideIcon: DiscordIcon },
  { key: 'whatsapp', name: 'WhatsApp', placeholder: 'https://wa.me/5511999998888', lucideIcon: WhatsAppIcon },
  { key: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/seuusuario', lucideIcon: Instagram },
  { key: 'twitter', name: 'Twitter (X)', placeholder: 'https://twitter.com/seuusuario', lucideIcon: Twitter },
  { key: 'youtube', name: 'Youtube', placeholder: 'https://youtube.com/seu-canal', lucideIcon: Youtube },
  { key: 'telegram', name: 'Telegram', placeholder: 'https://t.me/seuusuario', lucideIcon: Send },
];

const userSocialLinks: {key: SocialMediaKey, url: string}[] = [
  {key: "discord", url: "https://discord.gg/vxxrK3bd"},
  {key: "whatsapp", url: ""},
  {key: "instagram", url: "https://instagram.com/storepanth"},
  {key: "twitter", url: ""},
  {key: "youtube", url: ""},
  {key: "telegram", url: ""}
];

export const initialSocialLinksData: SocialLink[] = socialPlatformConfig.map(platform => {
  const userLink = userSocialLinks.find(link => link.key === platform.key);
  return {
    ...platform,
    url: userLink ? userLink.url : '',
  };
});
