import { CompanyInfo } from '../models';

/**
 * Central company config.
 * Replace placeholder fields when real details are available.
 */
export const COMPANY: CompanyInfo = {
  name: 'NS Print Mart',
  shortName: 'NS Print Mart',
  tagline: 'More Print, Less Waiting',
  subtitle: 'Digital & Offset Printing',
  description:
    'NS Print Mart helps businesses turn ideas into physical branded materials — from business cards and packaging to banners and promotional print.',
  phone: '+94768263257',
  phoneDisplay: '+94 76 826 3257',
  whatsapp: '94768263257',
  email: 'nsprintmart@gmail.com',
  website: 'https://www.nsprintmart.com',
  addressLines: ['6 1/1T Galpotha Street', 'Colombo - 13', 'Sri Lanka'],
  mapQuery: '6 1/1T Galpotha Street Colombo 13',
  openingHours: 'Mon–Sat 9:00 AM – 7:00 PM · Closed Sunday',
  social: [
    // PLACEHOLDER — replace url and set enabled: true when ready
    { label: 'Facebook', url: '#', enabled: false },
    { label: 'Instagram', url: '#', enabled: false },
    { label: 'WhatsApp', url: 'https://wa.me/94768263257', enabled: true }
  ]
};

export const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsapp}`;
export const TEL_URL = `tel:${COMPANY.phone}`;
export const MAIL_URL = `mailto:${COMPANY.email}`;
