import { ServiceItem } from '../models';

const IMG = 'assets/images/print';

export const SERVICES: ServiceItem[] = [
  {
    id: '01',
    slug: 'business-cards',
    name: 'Business Cards',
    category: 'business',
    categoryLabel: 'Business Printing',
    shortDescription: 'First impressions that feel substantial in the hand.',
    description:
      'Premium business cards with stock and finish options that match your brand — clean, sharp, and ready to exchange.',
    image: `${IMG}/srv-cards.webp`,
    features: ['Multiple stocks', 'Matte or gloss', 'Foil options', 'Rounded corners'],
    accent: 'cyan'
  },
  {
    id: '02',
    slug: 'flyers-brochures',
    name: 'Flyers & Brochures',
    category: 'marketing',
    categoryLabel: 'Marketing Print',
    shortDescription: 'Campaign pieces built to be held, shared, and remembered.',
    description:
      'From single-sheet flyers to multi-fold brochures — designed for clarity, colour, and a polished fold.',
    image: `${IMG}/srv-brochures.webp`,
    features: ['Tri-fold & bi-fold', 'Campaign sets', 'High-colour output', 'Custom sizes'],
    accent: 'magenta'
  },
  {
    id: '03',
    slug: 'posters',
    name: 'Posters',
    category: 'marketing',
    categoryLabel: 'Marketing Print',
    shortDescription: 'Bold visuals that stop people in their tracks.',
    description:
      'Indoor and event posters with crisp type and vibrant colour for launches, promotions, and displays.',
    image: `${IMG}/srv-posters.webp`,
    features: ['Multiple sizes', 'Vibrant colour', 'Event ready', 'Short runs welcome'],
    accent: 'yellow'
  },
  {
    id: '04',
    slug: 'stickers',
    name: 'Stickers & Labels',
    category: 'custom',
    categoryLabel: 'Custom Printing',
    shortDescription: 'Print-and-cut stickers with clean edges and strong adhesion.',
    description:
      'Custom stickers and labels for packaging, branding, and promotions — shaped, cut, and finished for real-world use.',
    image: `${IMG}/srv-stickers.webp`,
    features: ['Die-cut shapes', 'Vinyl options', 'Sheet or single', 'Brand colours'],
    accent: 'magenta'
  },
  {
    id: '05',
    slug: 'invitations',
    name: 'Invitation Cards',
    category: 'custom',
    categoryLabel: 'Custom Printing',
    shortDescription: 'Elegant invitations for weddings, events, and celebrations.',
    description:
      'Invitation suites with refined typography and finishing details that feel personal and premium.',
    image: `${IMG}/srv-invites.webp`,
    features: ['Event suites', 'Foil & emboss', 'Envelope sets', 'Custom layouts'],
    accent: 'cyan'
  },
  {
    id: '06',
    slug: 'menu-cards',
    name: 'Menu Cards',
    category: 'marketing',
    categoryLabel: 'Marketing Print',
    shortDescription: 'Menus that look as considered as the food they present.',
    description:
      'Restaurant and café menus printed for readability, durability, and a polished brand presence.',
    image: `${IMG}/srv-menus.webp`,
    features: ['Durable stocks', 'Lamination', 'Single or multi-page', 'Brand matching'],
    accent: 'yellow'
  },
  {
    id: '07',
    slug: 'catalogues',
    name: 'Books & Catalogues',
    category: 'marketing',
    categoryLabel: 'Marketing Print',
    shortDescription: 'Bound pieces that present products with clarity and polish.',
    description:
      'Catalogues and booklets for product lines, lookbooks, and company presentations.',
    image: `${IMG}/srv-catalogues.webp`,
    features: ['Saddle stitch / perfect bind', 'Cover options', 'Internal pagination', 'Colour fidelity'],
    accent: 'cyan'
  },
  {
    id: '08',
    slug: 'letterheads-envelopes',
    name: 'Letterheads & Envelopes',
    category: 'business',
    categoryLabel: 'Business Printing',
    shortDescription: 'Corporate stationery that stays consistent across every touchpoint.',
    description:
      'Letterheads, envelopes, and matching stationery for a cohesive business identity.',
    image: `${IMG}/srv-stationery.webp`,
    features: ['Matching sets', 'Corporate colours', 'Quality stock', 'Brand guideline friendly'],
    accent: 'magenta'
  },
  {
    id: '09',
    slug: 't-shirt-printing',
    name: 'T-Shirt Printing',
    category: 'promotional',
    categoryLabel: 'Promotional Printing',
    shortDescription: 'Wearable brand moments for teams, events, and campaigns.',
    description: 'Custom t-shirt printing for promotions, staff wear, and merch drops.',
    image: `${IMG}/srv-tshirts.webp`,
    features: ['Custom artwork', 'Event merch', 'Staff uniforms', 'Short & bulk runs'],
    accent: 'yellow'
  },
  {
    id: '10',
    slug: 'banners-hoardings',
    name: 'Hoardings & Banners',
    category: 'large-format',
    categoryLabel: 'Large Format',
    shortDescription: 'Large-format print that carries your message across the street.',
    description: 'Banners, roll-ups, and hoardings for outdoor and indoor visibility.',
    image: `${IMG}/srv-banners.webp`,
    features: ['Outdoor durability', 'Roll-up stands', 'Site hoardings', 'Vivid colour'],
    accent: 'cyan'
  },
  {
    id: '11',
    slug: 'packaging',
    name: 'Packaging Boxes',
    category: 'custom',
    categoryLabel: 'Custom Printing',
    shortDescription: 'Packaging that makes unboxing part of the brand experience.',
    description: 'Custom boxes and packaging print for products that deserve a strong first open.',
    image: `${IMG}/srv-packaging.webp`,
    features: ['Custom structures', 'Brand finishes', 'Short runs', 'Presentation ready'],
    accent: 'magenta'
  },
  {
    id: '12',
    slug: 'id-cards',
    name: 'ID Cards & Badges',
    category: 'promotional',
    categoryLabel: 'Promotional Printing',
    shortDescription: 'Professional ID cards and badges for teams and events.',
    description:
      'Durable ID cards, lanyards, and badges with clear branding and practical finishing.',
    image: `${IMG}/srv-idcards.webp`,
    features: ['PVC cards', 'Lanyards', 'Event badges', 'Secure layouts'],
    accent: 'yellow'
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_CATEGORIES = [
  { id: 'business', label: 'Business Printing' },
  { id: 'marketing', label: 'Marketing Print' },
  { id: 'large-format', label: 'Large Format' },
  { id: 'custom', label: 'Custom Printing' },
  { id: 'promotional', label: 'Promotional Printing' }
] as const;
