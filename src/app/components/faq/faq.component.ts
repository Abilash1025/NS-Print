import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  readonly openId = signal<string | null>('f1');

  readonly items: FaqItem[] = [
    {
      id: 'f1',
      question: 'What kinds of printing do you offer?',
      answer:
        'We produce digital and offset print across business cards, marketing materials, packaging, stickers, banners, invitations, and promotional items.'
    },
    {
      id: 'f2',
      question: 'Can you help if I don’t have print-ready artwork?',
      answer:
        'Yes. Share what you have and we’ll guide you on file setup, or help prepare artwork so it prints cleanly.'
    },
    {
      id: 'f3',
      question: 'How do I get a quote?',
      answer:
        'Use the quote form, call, or WhatsApp with your product, quantity, size, finish, and deadline. We’ll respond with next steps.'
    },
    {
      id: 'f4',
      question: 'Do you offer finishing options?',
      answer:
        'Matte, gloss, foil, embossing, lamination, and other finishes are available depending on the product.'
    }
  ];

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
