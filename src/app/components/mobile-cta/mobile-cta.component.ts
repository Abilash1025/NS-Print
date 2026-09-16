import { Component } from '@angular/core';
import { WHATSAPP_URL } from '../../data/company';

@Component({
  selector: 'app-mobile-cta',
  standalone: true,
  imports: [],
  template: `
    <div class="mobile-cta" aria-label="Quick actions">
      <a href="#quote" class="mobile-cta__quote">Get a Quote</a>
      <a [href]="whatsapp" target="_blank" rel="noopener noreferrer" class="mobile-cta__wa">
        WhatsApp
      </a>
    </div>
  `,
  styles: [
    `
      .mobile-cta {
        display: none;
      }

      @media (max-width: 768px) {
        .mobile-cta {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1100;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--text-primary);
          border-top: 3px solid transparent;
          border-image: linear-gradient(
              90deg,
              var(--brand-gray) 0 50%,
              var(--brand-charcoal) 50%
            )
            1;
        }

        .mobile-cta a {
          text-align: center;
          min-height: 48px;
          padding: 0.9rem 0.4rem;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: grid;
          place-items: center;
        }

        .mobile-cta__quote {
          background: var(--text-primary);
          color: #fff;
        }

        .mobile-cta__wa {
          background: #fff;
          color: var(--text-primary);
        }
      }
    `
  ]
})
export class MobileCtaComponent {
  readonly whatsapp = WHATSAPP_URL;
}
