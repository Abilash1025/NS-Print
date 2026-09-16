import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WHATSAPP_URL } from '../../data/company';

@Component({
  selector: 'app-mobile-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mobile-cta" aria-label="Quick actions">
      <a routerLink="/contact" class="mobile-cta__quote">Get a Quote</a>
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
              var(--brand-cyan) 0 25%,
              var(--brand-magenta) 25% 50%,
              var(--brand-yellow) 50% 75%,
              #fff 75%
            )
            1;
        }

        .mobile-cta a {
          text-align: center;
          padding: 0.95rem 0.5rem;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
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
