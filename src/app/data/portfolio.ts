import { PortfolioCategory, PortfolioItem } from '../models';

const WORK = 'assets/images/portfolio';
const PRINT = 'assets/images/print';

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
    title: 'CMYK Card Set',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Business card run showing full-colour capability across black and CMYK ink stocks.',
    image: `${PRINT}/cmyk-business-cards.webp`,
    thumb: `${PRINT}/cmyk-business-cards.webp`
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
    title: 'Campaign Brochure Suite',
    category: 'promotional',
    categoryLabel: 'Promotional',
    description:
      'Folded brochures and flyers built for high-impact colour and clean folding.',
    image: `${PRINT}/cmyk-brochures.webp`,
    thumb: `${PRINT}/cmyk-brochures.webp`
  },
  {
    id: 'p5',
    title: 'Event Invitation Suite',
    category: 'custom',
    categoryLabel: 'Custom',
    description:
      'Invitation and event stationery with deckled edges and blind embossed detail.',
    image: `${PRINT}/print-invitations.webp`,
    thumb: `${PRINT}/print-invitations.webp`
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
    title: 'Sticker & Label Run',
    category: 'custom',
    categoryLabel: 'Custom',
    description:
      'Die-cut stickers and labels produced across CMYK and monochrome vinyl stocks.',
    image: `${PRINT}/cmyk-stickers.webp`,
    thumb: `${PRINT}/cmyk-stickers.webp`
  },
  {
    id: 'p9',
    title: 'Catalogue Presentation',
    category: 'branding',
    categoryLabel: 'Branding',
    description: 'Bound catalogue work focused on product storytelling and clean pagination.',
    image: `${PRINT}/print-catalogues.webp`,
    thumb: `${PRINT}/print-catalogues.webp`
  },
  {
    id: 'p10',
    title: 'Corporate Stationery Set',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Letterheads, envelopes, and folders produced as a matched business identity set.',
    image: `${PRINT}/print-stationery.webp`,
    thumb: `${PRINT}/print-stationery.webp`
  },
  {
    id: 'p11',
    title: 'Roll-Up & Banner Display',
    category: 'large-format',
    categoryLabel: 'Large Format',
    description:
      'Large-format banner and roll-up print built for visibility in exhibition spaces.',
    image: `${PRINT}/print-large-format.webp`,
    thumb: `${PRINT}/print-large-format.webp`
  },
  {
    id: 'p12',
    title: 'Packaging Presentation',
    category: 'packaging',
    categoryLabel: 'Packaging',
    description:
      'Custom boxes and bags finished for a premium unboxing moment across CMYK and black stocks.',
    image: `${PRINT}/cmyk-packaging.webp`,
    thumb: `${PRINT}/cmyk-packaging.webp`
  },
  {
    id: 'p13',
    title: 'Branded Merch Drop',
    category: 'promotional',
    categoryLabel: 'Promotional',
    description: 'Apparel, totes, and drinkware prepared as a promotional merchandise set.',
    image: `${PRINT}/cmyk-promotional.webp`,
    thumb: `${PRINT}/cmyk-promotional.webp`
  },
  {
    id: 'p14',
    title: 'Press Run Detail',
    category: 'corporate',
    categoryLabel: 'Corporate',
    description:
      'Offset press detail showing CMYK ink laydown and registration during a production run.',
    image: `${PRINT}/print-press-macro.webp`,
    thumb: `${PRINT}/print-press-macro.webp`
  }
];
