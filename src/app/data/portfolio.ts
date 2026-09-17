import { PortfolioCategory, PortfolioItem } from '../models';

const WORK = 'assets/images/portfolio';

export const PORTFOLIO_FILTERS: { id: PortfolioCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'branding', label: 'Branding' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'promotional', label: 'Promotional' },
  { id: 'large-format', label: 'Large Format' },
  { id: 'custom', label: 'Custom' }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Brand Launch Collateral',
    category: 'branding',
    categoryLabel: 'Branding',
    description:
      'A coordinated set of printed brand materials prepared for a business launch presentation.',
    image: `${WORK}/work-full-01.webp`,
    thumb: `${WORK}/work-01.webp`
  },
  {
    id: 'p2',
    title: 'NS Print Mart Card Set',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Premium matte business cards with CMYK colour bars and NS Print Mart branding across black and white stocks.',
    image: `${WORK}/work-gen-cards.webp`,
    thumb: `${WORK}/work-gen-cards.webp`
  },
  {
    id: 'p3',
    title: 'Why Choose Print Story',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Editorial company profile print showcasing services, values, and finished product photography.',
    image: `${WORK}/work-full-03.webp`,
    thumb: `${WORK}/work-03.webp`
  },
  {
    id: 'p4',
    title: 'Harbour & Co. Brochure Suite',
    category: 'promotional',
    categoryLabel: 'Promotional',
    description:
      'Folded campaign brochures for Harbour & Co. with high-impact colour and clean folding.',
    image: `${WORK}/work-gen-brochures.webp`,
    thumb: `${WORK}/work-gen-brochures.webp`
  },
  {
    id: 'p5',
    title: 'Harbour Evening Invitations',
    category: 'custom',
    categoryLabel: 'Custom',
    description:
      'Invitation and RSVP suite for Harbour & Co. with navy ink on cream stock.',
    image: `${WORK}/work-gen-invites.webp`,
    thumb: `${WORK}/work-gen-invites.webp`
  },
  {
    id: 'p6',
    title: 'Hospitality Menu System',
    category: 'branding',
    categoryLabel: 'Branding',
    description:
      'Menu and hospitality print designed for clarity, durability, and brand consistency.',
    image: `${WORK}/work-full-06.webp`,
    thumb: `${WORK}/work-06.webp`
  },
  {
    id: 'p7',
    title: 'Our Works Showcase',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'A multi-product showcase covering cards, stickers, banners, packaging, and more.',
    image: `${WORK}/work-full-07.webp`,
    thumb: `${WORK}/work-07.webp`
  },
  {
    id: 'p8',
    title: 'Cedar Leaf Sticker Run',
    category: 'custom',
    categoryLabel: 'Custom',
    description:
      'Die-cut stickers and labels for Cedar Leaf Café and NS Print Mart brand marks.',
    image: `${WORK}/work-gen-stickers.webp`,
    thumb: `${WORK}/work-gen-stickers.webp`
  },
  {
    id: 'p9',
    title: 'Studio Peak Catalogue',
    category: 'branding',
    categoryLabel: 'Branding',
    description: 'Bound catalogue presentation for Studio Peak with cyan and charcoal cover design.',
    image: `${WORK}/work-gen-catalogue.webp`,
    thumb: `${WORK}/work-gen-catalogue.webp`
  },
  {
    id: 'p10',
    title: 'NS Corporate Stationery',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Letterheads, envelopes, and compliment slips produced as a matched NS Print Mart identity set.',
    image: `${WORK}/work-gen-stationery.webp`,
    thumb: `${WORK}/work-gen-stationery.webp`
  },
  {
    id: 'p11',
    title: 'Lanka Launch Banners',
    category: 'large-format',
    categoryLabel: 'Large Format',
    description:
      'Large-format roll-up and banner print for Lanka Launch event visibility.',
    image: `${WORK}/work-gen-banner.webp`,
    thumb: `${WORK}/work-gen-banner.webp`
  },
  {
    id: 'p12',
    title: 'NS Packaging Set',
    category: 'packaging',
    categoryLabel: 'Packaging',
    description:
      'Custom boxes and sleeves finished for a premium NS Print Mart unboxing moment.',
    image: `${WORK}/work-gen-packaging.webp`,
    thumb: `${WORK}/work-gen-packaging.webp`
  },
  {
    id: 'p13',
    title: 'NS Merch Drop',
    category: 'promotional',
    categoryLabel: 'Promotional',
    description: 'Apparel, totes, and caps prepared as an NS Print Mart promotional merch set.',
    image: `${WORK}/work-gen-merch.webp`,
    thumb: `${WORK}/work-gen-merch.webp`
  },
  {
    id: 'p14',
    title: 'Press Proof Detail',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Press-side proof sheets showing NS Print Mart colour bars and registration during production.',
    image: `${WORK}/work-gen-press.webp`,
    thumb: `${WORK}/work-gen-press.webp`
  }
];
