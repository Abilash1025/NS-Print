import { Component } from '@angular/core';
import { TRUST_ITEMS } from '../../data/navigation';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="trust">
      <div class="container-wide trust__row">
        @for (item of items; track item.id; let i = $index) {
          <article class="trust__cell" [appReveal]="'reveal-delay-' + (i + 1)">
            <span class="trust__bar" [attr.data-ink]="i"></span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .trust {
        padding-block: clamp(1.75rem, 3vw, 2.75rem);
      }

      .trust__row {
        display: grid;
        gap: 1px;
        background: var(--border);
      }

      @media (min-width: 640px) {
        .trust__row {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1000px) {
        .trust__row {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .trust__cell {
        position: relative;
        background: var(--surface);
        padding: 1.35rem 1.5rem 1.5rem;
      }

      .trust__bar {
        display: block;
        width: 2.25rem;
        height: 4px;
        margin-bottom: 1rem;
        transition: width var(--duration) var(--ease-out);
      }

      .trust__bar[data-ink='0'] { background: var(--brand-cyan); }
      .trust__bar[data-ink='1'] { background: var(--brand-magenta); }
      .trust__bar[data-ink='2'] { background: var(--brand-yellow); }
      .trust__bar[data-ink='3'] { background: var(--text-primary); }

      .trust__cell:hover .trust__bar {
        width: 4.5rem;
      }

      .trust__cell h2 {
        font-size: 1.15rem;
        margin-bottom: 0.4rem;
      }

      .trust__cell p {
        font-size: 0.9rem;
        max-width: 22rem;
      }
    `
  ]
})
export class TrustComponent {
  readonly items = TRUST_ITEMS;
}
