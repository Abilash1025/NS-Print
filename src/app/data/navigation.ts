import { NavGroup, NavLink, ProcessStep, ValueProp } from '../models';

/** Compact primary nav with category dropdowns */
export const NAV_GROUPS: NavGroup[] = [
  { label: 'Home', section: 'home' },
  {
    label: 'Print',
    children: [
      { label: 'Services', section: 'services' },
      { label: 'Featured', section: 'featured' },
      { label: 'Finishes', section: 'finishes' },
      { label: 'Our Work', section: 'work' }
    ]
  },
  { label: 'Process', section: 'process' },
  {
    label: 'Company',
    children: [
      { label: 'About', section: 'about' },
      { label: 'Why Us', section: 'why' },
      { label: 'Reviews', section: 'testimonials' },
      { label: 'FAQ', section: 'faq' }
    ]
  },
  { label: 'Contact', section: 'contact' }
];

/** Flat section list for scroll-spy + footer */
export const NAV_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) =>
  group.children?.length
    ? group.children
    : group.section
      ? [{ label: group.label, section: group.section }]
      : []
);

export const TRUST_ITEMS: ValueProp[] = [
  {
    id: 'quality',
    title: 'Quality First',
    description: 'Premium materials and careful finishing on every job.'
  },
  {
    id: 'turnaround',
    title: 'Fast Turnaround',
    description: 'Reliable production timing without cutting corners.'
  },
  {
    id: 'custom',
    title: 'Custom Solutions',
    description: 'Print tailored to your brand, format, and finish.'
  },
  {
    id: 'support',
    title: 'Professional Support',
    description: 'Clear guidance from idea to final printed piece.'
  }
];

export const WHY_ITEMS: ValueProp[] = [
  {
    id: 'colour',
    title: 'Colour that holds',
    description: 'Calibrated CMYK on every run — sharp brand colour from first sheet to last.'
  },
  {
    id: 'finish',
    title: 'Finish with intent',
    description: 'Matte, gloss, foil, and emboss chosen to match how your piece should feel in hand.'
  },
  {
    id: 'timing',
    title: 'Timing you can plan',
    description: 'Clear production schedules and reliable handoff so campaigns stay on track.'
  },
  {
    id: 'care',
    title: 'Care from brief to pack',
    description: 'Guided support through artwork checks, proofs, and final delivery — not just a print job.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'need',
    number: '01',
    title: 'Tell Us What You Need',
    description: 'Share the product, quantity, deadline, and any brand files you already have.'
  },
  {
    id: 'design',
    number: '02',
    title: 'We Prepare Your Design',
    description: 'We review artwork for print readiness or help refine the layout before production.'
  },
  {
    id: 'print',
    number: '03',
    title: 'We Print & Finish',
    description: 'Your job moves through print and finishing with careful colour and quality checks.'
  },
  {
    id: 'deliver',
    number: '04',
    title: 'You Receive the Final Product',
    description: 'Collect or receive the finished pieces — ready to hand out, pack, or display.'
  }
];
