import { ProductItem } from '../models';

const IMG = 'assets/images/print';

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'fp1',
    name: 'Business Cards',
    description: 'Substantial stock. Sharp colour.',
    image: `${IMG}/bento-cards-matte.webp`,
    size: 'large'
  },
  {
    id: 'fp2',
    name: 'Packaging',
    description: 'Unboxing as a brand moment.',
    image: `${IMG}/bento-pack-matte.webp`,
    size: 'medium'
  },
  {
    id: 'fp3',
    name: 'Brochures',
    description: 'Clean folds. Vivid print.',
    image: `${IMG}/bento-brochures-matte.webp`,
    size: 'medium'
  },
  {
    id: 'fp4',
    name: 'Stickers & Labels',
    description: 'Cut clean. Stick strong.',
    image: `${IMG}/bento-stickers-matte.webp`,
    size: 'wide'
  },
  {
    id: 'fp5',
    name: 'Promotional Merch',
    description: 'Wearable brand moments.',
    image: `${IMG}/bento-merch-matte.webp`,
    size: 'small'
  },
  {
    id: 'fp6',
    name: 'Large Format',
    description: 'Built for presence.',
    image: `${IMG}/bento-banner-matte.webp`,
    size: 'small'
  },
  {
    id: 'fp7',
    name: 'Invitations',
    description: 'Refined celebration print.',
    image: `${IMG}/bento-invite-matte.webp`,
    size: 'medium'
  },
  {
    id: 'fp8',
    name: 'Catalogues',
    description: 'Bound with polish.',
    image: `${IMG}/bento-catalogue-matte.webp`,
    size: 'medium'
  }
];
