import { Component, signal } from '@angular/core';
import { TESTIMONIALS } from '../../data/testimonials';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  readonly items = TESTIMONIALS;
  readonly index = signal(0);
  readonly animKey = signal(0);
  readonly direction = signal<'next' | 'prev'>('next');

  get current() {
    return this.items[this.index()];
  }

  get counter(): string {
    const n = this.index() + 1;
    const total = this.items.length;
    return `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  prev(): void {
    this.direction.set('prev');
    this.index.update((i) => (i - 1 + this.items.length) % this.items.length);
    this.animKey.update((k) => k + 1);
  }

  next(): void {
    this.direction.set('next');
    this.index.update((i) => (i + 1) % this.items.length);
    this.animKey.update((k) => k + 1);
  }
}
