import { Component } from '@angular/core';
import { TRUST_ITEMS } from '../../data/navigation';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="trust section-canvas">
      <div class="container trust__wrap">
        <div class="trust__intro" appReveal>
          <p class="eyebrow">What sets us apart</p>
          <h2 class="display-md">Built for brands that notice the details</h2>
        </div>

        <div class="trust__grid" appReveal="stagger">
          <article class="trust__visual elev-card">
            <img
              src="assets/images/print/trust-quality-paper.webp"
              alt="Premium paper stock stack"
              loading="lazy"
            />
          </article>

          @for (item of items; track item.id; let i = $index) {
            <article class="trust__cell elev-card">
              <span class="trust__index" [attr.data-ink]="i">0{{ i + 1 }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .trust {
        padding-block: var(--section-space-tight);
      }

      .trust__intro {
        margin-bottom: 1rem;
        max-width: 28rem;
      }

      .trust__grid {
        display: grid;
        gap: 0.85rem;
      }

      @media (min-width: 720px) {
        .trust__grid {
          grid-template-columns: 1.1fr 1fr 1fr;
          grid-template-rows: auto auto;
        }

        .trust__visual {
          grid-row: span 2;
        }
      }

      .trust__visual {
        overflow: hidden;
        min-height: 160px;
        background: #fff;
      }

      .trust__visual img {
        width: 100%;
        height: 100%;
        min-height: 180px;
        object-fit: cover;
      }

      .trust__cell {
        padding: 1rem 1.05rem 1.1rem;
        background: #fff;
        transition: transform var(--duration) var(--ease-out), box-shadow var(--duration) var(--ease-out);
      }

      .trust__cell:hover {
        transform: translateY(-3px);
        box-shadow: var(--elev-2);
      }

      .trust__index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        padding: 0.2rem 0.45rem;
        margin-bottom: 0.55rem;
        border-radius: 999px;
        font-size: 0.65rem;
        font-weight: 800;
        color: #fff;
      }

      .trust__index[data-ink='0'] { background: var(--brand-gray); }
      .trust__index[data-ink='1'] { background: var(--brand-charcoal); }
      .trust__index[data-ink='2'] { background: #9a9592; color: #fff; }
      .trust__index[data-ink='3'] { background: var(--brand-ink); }

      .trust__cell h3 {
        font-size: 0.95rem;
        margin-bottom: 0.3rem;
      }

      .trust__cell p {
        font-size: 0.8rem;
      }
    `
  ]
})
export class TrustComponent {
  readonly items = TRUST_ITEMS;
}
