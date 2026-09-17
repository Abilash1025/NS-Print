import { Component } from '@angular/core';
import { TRUST_ITEMS } from '../../data/navigation';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="trust section section-canvas">
      <div class="container">
        <div class="head-split trust__head" appReveal>
          <div>
            <p class="eyebrow">What sets us apart</p>
            <h2 class="display-md trust__title">Built for brands that notice the details</h2>
          </div>
          <p class="lead trust__lead">
            Quality stock, reliable turnaround, and support that stays with the job.
          </p>
        </div>

        <ol class="trust__list" appReveal="stagger">
          @for (item of items; track item.id; let i = $index) {
            <li class="trust__card" [attr.data-ink]="inks[i]">
              <span class="trust__index">0{{ i + 1 }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: [
    `
      .trust {
        padding-block: clamp(1.15rem, 2.4vw, 1.75rem);
        margin-top: clamp(0.75rem, 2vw, 1.5rem);
      }

      .trust__head {
        width: 100%;
        margin-bottom: clamp(0.85rem, 1.8vw, 1.25rem);
      }

      .trust__title {
        margin: 0;
        font-size: clamp(1.3rem, 2.2vw, 1.7rem);
        line-height: 1.15;
        letter-spacing: -0.03em;
      }

      .trust__lead {
        margin: 0;
        max-width: none;
        font-size: 0.88rem;
        line-height: 1.45;
      }

      .trust__list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.7rem;
        width: 100%;
      }

      @media (min-width: 640px) {
        .trust__list {
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
      }

      @media (min-width: 960px) {
        .trust__list {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.85rem;
        }
      }

      .trust__card {
        display: grid;
        gap: 0.4rem;
        align-content: start;
        width: 100%;
        min-width: 0;
        min-height: 100%;
        padding: 0.95rem 1rem 1.05rem;
        border: 0;
        border-radius: 0.75rem;
        color: #fff;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.12) inset,
          0 8px 20px rgba(23, 21, 22, 0.14),
          0 18px 36px rgba(23, 21, 22, 0.1);
        transition:
          transform var(--duration-fast) var(--ease-out),
          box-shadow var(--duration-fast) var(--ease-out);
      }

      .trust__card:hover {
        transform: translateY(-3px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.14) inset,
          0 12px 26px rgba(23, 21, 22, 0.16),
          0 24px 44px rgba(23, 21, 22, 0.12);
      }

      /* Matte dark CMYK */
      .trust__card[data-ink='c'] {
        background: #0a6f96;
      }

      .trust__card[data-ink='m'] {
        background: #9a1663;
      }

      .trust__card[data-ink='y'] {
        background: #b89a12;
        color: #1a1608;
      }

      .trust__card[data-ink='k'] {
        background: #2a2625;
      }

      .trust__index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        min-width: 1.9rem;
        height: 1.45rem;
        padding: 0 0.42rem;
        border-radius: 0.35rem;
        font-family: var(--font-display);
        font-size: 0.62rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        background: rgba(255, 255, 255, 0.16);
        color: inherit;
      }

      .trust__card[data-ink='y'] .trust__index {
        background: rgba(26, 22, 8, 0.14);
      }

      .trust__card h3 {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 750;
        letter-spacing: -0.025em;
        line-height: 1.2;
        color: inherit;
      }

      .trust__card p {
        margin: 0;
        font-size: 0.76rem;
        line-height: 1.4;
        color: inherit;
        opacity: 0.82;
      }

      @media (max-width: 479px) {
        .trust__card {
          padding: 0.85rem 0.9rem 0.95rem;
        }

        .trust__card h3 {
          font-size: 0.9rem;
        }

        .trust__card p {
          font-size: 0.72rem;
        }
      }
    `
  ]
})
export class TrustComponent {
  readonly items = TRUST_ITEMS;
  readonly inks = ['c', 'm', 'y', 'k'] as const;
}
