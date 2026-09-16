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

  get current() {
    return this.items[this.index()];
  }

  prev(): void {
    this.index.update((i) => (i - 1 + this.items.length) % this.items.length);
  }

  next(): void {
    this.index.update((i) => (i + 1) % this.items.length);
  }
}
