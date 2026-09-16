import { Component, HostListener, input, signal } from '@angular/core';
import { PORTFOLIO, PORTFOLIO_FILTERS } from '../../data/portfolio';
import { PortfolioCategory, PortfolioItem } from '../../models';
import { RevealDirective } from '../../shared/reveal.directive';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [RevealDirective, LightboxComponent],
  templateUrl: './portfolio-section.component.html',
  styleUrl: './portfolio-section.component.scss'
})
export class PortfolioSectionComponent {
  readonly limit = input<number | null>(null);
  readonly showHeader = input(true);

  readonly filters = PORTFOLIO_FILTERS;
  readonly activeFilter = signal<PortfolioCategory>('all');
  readonly selected = signal<PortfolioItem | null>(null);

  get items(): PortfolioItem[] {
    const filter = this.activeFilter();
    const list =
      filter === 'all' ? PORTFOLIO : PORTFOLIO.filter((item) => item.category === filter);
    const limit = this.limit();
    return limit ? list.slice(0, limit) : list;
  }

  setFilter(id: PortfolioCategory): void {
    this.activeFilter.set(id);
  }

  open(item: PortfolioItem): void {
    this.selected.set(item);
  }

  close(): void {
    this.selected.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.selected()) {
      this.close();
    }
  }
}
