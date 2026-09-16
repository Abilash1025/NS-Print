import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="cta section-canvas">
      <div class="container">
        <div class="cta__card elev-card" appReveal="scale">
          <h2 class="display-lg cta__title">Let's Put Your Brand in Print.</h2>
          <div class="cta__side">
            <p>
              Tell us what you want to print. We'll help turn the idea into something worth holding.
            </p>
            <div class="cta__actions">
              <a href="#quote" class="btn btn-primary">Get a Quote</a>
              <a href="#work" class="btn btn-secondary">Explore Our Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cta {
        padding-block: var(--section-space-tight);
      }

      .cta__card {
        display: grid;
        gap: 1.15rem;
        padding: clamp(1.35rem, 3vw, 2rem);
        background: var(--surface-dark);
        color: #fff;
      }

      @media (min-width: 900px) {
        .cta__card {
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
          align-items: end;
        }
      }

      .cta__title {
        color: #fff;
      }

      .cta__side p {
        color: rgba(255, 255, 255, 0.7);
        max-width: 24rem;
        font-size: 0.85rem;
      }

      .cta__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.9rem;
      }
    `
  ]
})
export class CtaBandComponent {}
