import { NavLink, ProcessStep, ValueProp } from '../models';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Our Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

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
    id: 'quality-print',
    title: 'Quality Printing',
    description: 'Digital and offset output with sharp detail and consistent colour.'
  },
  {
    id: 'finishing',
    title: 'Professional Finishing',
    description: 'Matte, gloss, foil, emboss, and other finishes that elevate the piece.'
  },
  {
    id: 'reliable',
    title: 'Reliable Turnaround',
    description: 'Production planned so your brand materials arrive when needed.'
  },
  {
    id: 'creative',
    title: 'Creative Support',
    description: 'Help shaping artwork so it prints cleanly and looks intentional.'
  },
  {
    id: 'custom-solutions',
    title: 'Custom Solutions',
    description: 'From stationery sets to packaging and large-format displays.'
  },
  {
    id: 'detail',
    title: 'Attention to Detail',
    description: 'Registration, trim, stock choice — the small things that make print feel premium.'
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
