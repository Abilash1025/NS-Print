import { ProductItem } from '../models';

const IMG = 'assets/images/print';

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'fp1',
    name: 'Business Cards',
    description: 'Substantial stock. Sharp colour. Finishes that feel intentional.',
    image: `${IMG}/cmyk-business-cards.webp`,
    size: 'large'
  },
  {
    id: 'fp2',
    name: 'Packaging',
    description: 'Boxes and bags that turn the open into a brand moment.',
    image: `${IMG}/cmyk-packaging.webp`,
    size: 'medium'
  },
  {
    id: 'fp3',
    name: 'Brochures',
    description: 'Multi-panel stories with clean folds and vivid print.',
    image: `${IMG}/cmyk-brochures.webp`,
    size: 'medium'
  },
  {
    id: 'fp4',
    name: 'Stickers & Labels',
    description: 'Cut clean. Stick strong. Brand everywhere it matters.',
    image: `${IMG}/cmyk-stickers.webp`,
    size: 'wide'
  },
  {
    id: 'fp5',
    name: 'Promotional Merch',
    description: 'Shirts, totes, and mugs that carry your brand further.',
    image: `${IMG}/cmyk-promotional.webp`,
    size: 'small'
  },
  {
    id: 'fp6',
    name: 'Large Format',
    description: 'Roll-ups and banners built for presence.',
    image: `${IMG}/print-large-format.webp`,
    size: 'wide'
  },
  {
    id: 'fp7',
    name: 'Invitations',
    description: 'Celebration print with refined type and premium finishing.',
    image: `${IMG}/print-invitations.webp`,
    size: 'small'
  },
  {
    id: 'fp8',
    name: 'Catalogues',
    description: 'Bound pieces that present a full product line with polish.',
    image: `${IMG}/print-catalogues.webp`,
    size: 'medium'
  }
];
