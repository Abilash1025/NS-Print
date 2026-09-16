export interface SocialLink {
  label: string;
  url: string;
  /** Set to false until a real URL is provided */
  enabled: boolean;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  subtitle: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  website: string;
  addressLines: string[];
  mapQuery: string;
  openingHours: string;
  social: SocialLink[];
}

export type ServiceCategory =
  | 'business'
  | 'marketing'
  | 'large-format'
  | 'custom'
  | 'promotional';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  accent: 'cyan' | 'magenta' | 'yellow';
}

export type PortfolioCategory =
  | 'all'
  | 'corporate'
  | 'branding'
  | 'packaging'
  | 'promotional'
  | 'large-format'
  | 'custom';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'all'>;
  categoryLabel: string;
  description: string;
  image: string;
  thumb: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
  size: 'large' | 'medium' | 'wide' | 'small';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  company: string;
  role: string;
  /** Placeholder entries should be replaced with real customer feedback */
  isPlaceholder: boolean;
}

export interface FinishOption {
  id: string;
  label: string;
  description: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}
