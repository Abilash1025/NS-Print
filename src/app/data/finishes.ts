import { FinishOption } from '../models';

export const FINISHES: FinishOption[] = [
  {
    id: 'matte',
    label: 'Matte',
    description: 'Soft, non-reflective surface with a refined, modern feel.'
  },
  {
    id: 'gloss',
    label: 'Gloss',
    description: 'High sheen that makes colours pop under light.'
  },
  {
    id: 'foil',
    label: 'Foil',
    description: 'Metallic accents that catch attention at a glance.'
  },
  {
    id: 'emboss',
    label: 'Emboss',
    description: 'Raised detail you can feel — tactile and premium.'
  }
];

export const FINISH_MARQUEE = [
  'MATTE',
  'GLOSS',
  'TEXTURED',
  'FOIL',
  'EMBOSSED',
  'PREMIUM STOCK',
  'LAMINATION',
  'SOFT TOUCH'
];
