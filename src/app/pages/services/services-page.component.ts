import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { FinishesComponent } from '../../components/finishes/finishes.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [ServicesSectionComponent, CtaBandComponent, FinishesComponent, RevealDirective],
  template: `
    <section class="page-head">
      <div class="container-wide page-head__inner">
        <div>
          <p class="eyebrow" appReveal>Services</p>
          <h1 class="display-lg" appReveal="reveal-delay-1">Print for Every<br />Brand Moment</h1>
        </div>
        <p class="lead" appReveal="reveal-delay-2">
          Twelve categories of digital and offset print — stationery, marketing, packaging, large
          format, and promotional.
        </p>
      </div>
    </section>
    <app-services-section [limit]="null" [showHeader]="false" />
    <app-finishes />
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
export class ServicesPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Services | NS Print Mart');
    this.meta.updateTag({
      name: 'description',
      content:
        'Business cards, brochures, banners, packaging, stickers, and more from NS Print Mart.'
    });
  }
}
