import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { ProcessComponent } from '../../components/process/process.component';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { COMPANY } from '../../data/company';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    AboutSectionComponent,
    WhyUsComponent,
    ProcessComponent,
    CtaBandComponent,
    RevealDirective
  ],
  template: `
    <section class="page-head">
      <div class="container-wide page-head__inner">
        <div>
          <p class="eyebrow" appReveal>About us</p>
          <h1 class="display-lg" appReveal="reveal-delay-1">{{ company.tagline }}</h1>
        </div>
        <p class="lead" appReveal="reveal-delay-2">
          {{ company.subtitle }} in Colombo — helping brands turn ideas into printed materials worth
          keeping.
        </p>
      </div>
    </section>
    <app-about-section />
    <app-why-us />
    <app-process />
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
export class AboutPageComponent implements OnInit {
  readonly company = COMPANY;
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About | NS Print Mart');
    this.meta.updateTag({
      name: 'description',
      content: 'Learn about NS Print Mart — digital and offset printing in Colombo, Sri Lanka.'
    });
  }
}
