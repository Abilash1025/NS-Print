import { FinishOption } from '../models';

const FINISH_IMG = 'assets/images/print';

export const FINISHES: FinishOption[] = [
  {
    id: 'matte',
    label: 'Matte',
    description: 'Soft, non-reflective surface with a refined, modern feel.',
    image: `${FINISH_IMG}/finish-matte.png`
  },
  {
    id: 'gloss',
    label: 'Gloss',
    description: 'High sheen that makes colours pop under light.',
    image: `${FINISH_IMG}/finish-gloss.png`
  },
  {
    id: 'foil',
    label: 'Foil',
    description: 'Metallic accents that catch attention at a glance.',
    image: `${FINISH_IMG}/finish-foil.png`
  },
  {
    id: 'emboss',
    label: 'Emboss',
    description: 'Raised detail you can feel — tactile and premium.',
    image: `${FINISH_IMG}/finish-emboss.png`
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
