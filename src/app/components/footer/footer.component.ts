import { Component, inject } from '@angular/core';
import { COMPANY, MAIL_URL, TEL_URL } from '../../data/company';
import { NAV_LINKS } from '../../data/navigation';
import { ScrollService } from '../../shared/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly company = COMPANY;
  readonly bottomLinks = NAV_LINKS.filter((link) =>
    ['contact', 'services', 'about', 'faq'].includes(link.section)
  );
  readonly mailUrl = MAIL_URL;
  readonly telUrl = TEL_URL;
  readonly year = new Date().getFullYear();
  readonly mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapQuery)}`;

  private readonly scroll = inject(ScrollService);

  goTo(section: string, event?: Event): void {
    event?.preventDefault();
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.scroll.scrollTo(section);
    }
    const base = `${location.pathname}${location.search}`;
    history.replaceState(null, '', `${base}#${section}`);
  }
}
