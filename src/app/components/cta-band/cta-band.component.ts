import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="cta">
      <span class="cmyk-rule" aria-hidden="true"></span>
      <div class="container-wide cta__inner" appReveal>
        <h2 class="display-lg cta__title">Let's Put Your<br />Brand in Print.</h2>
        <div class="cta__side">
          <p>
            Tell us what you want to print. We'll help turn the idea into something worth holding.
          </p>
          <div class="cta__actions">
            <a routerLink="/contact" class="btn btn-inverse" data-cursor="OPEN">Get a Quote</a>
            <a routerLink="/work" class="btn btn-outline-inverse">Explore Our Work</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cta {
        background: var(--surface-dark);
        color: #fff;
      }

      .cta__inner {
        display: grid;
        gap: 2rem;
        padding-block: clamp(3rem, 6vw, 5rem);
        align-items: end;
      }

      @media (min-width: 900px) {
        .cta__inner {
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
        }
      }

      .cta__title {
        color: #fff;
      }

      .cta__side p {
        color: rgba(255, 255, 255, 0.7);
        max-width: 26rem;
      }

      .cta__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 1.5rem;
      }
    `
  ]
})
export class CtaBandComponent {}
