import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PortfolioSectionComponent } from '../../components/portfolio-section/portfolio-section.component';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [PortfolioSectionComponent, CtaBandComponent, RevealDirective],
  template: `
    <section class="page-head">
      <div class="container-wide page-head__inner">
        <div>
          <p class="eyebrow" appReveal>Our work</p>
          <h1 class="display-lg" appReveal="reveal-delay-1">Quality You<br />Can See</h1>
        </div>
        <p class="lead" appReveal="reveal-delay-2">
          Printed work across corporate, branding, packaging, promotional, and large-format
          projects.
        </p>
      </div>
    </section>
    <app-portfolio-section [showHeader]="false" />
    <app-cta-band />
  `,
  styles: [
    `
      .page-head {
        padding-block: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 3vw, 2.5rem);
        border-bottom: 1px solid var(--border);
      }

      .page-head__inner {
        display: grid;
        gap: 1.5rem;
        align-items: end;
      }

      @media (min-width: 900px) {
        .page-head__inner {
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
        }
      }
    `
  ]
})
export class PortfolioPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Our Work | NS Print Mart');
    this.meta.updateTag({
      name: 'description',
      content:
        'Explore the NS Print Mart portfolio — business cards, packaging, banners, and custom print.'
    });
  }
}
