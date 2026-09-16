import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { FinishesComponent } from '../../components/finishes/finishes.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PortfolioSectionComponent } from '../../components/portfolio-section/portfolio-section.component';
import { ProcessComponent } from '../../components/process/process.component';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { TrustComponent } from '../../components/trust/trust.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    TrustComponent,
    ServicesSectionComponent,
    FeaturedProductsComponent,
    FinishesComponent,
    PortfolioSectionComponent,
    ProcessComponent,
    AboutSectionComponent,
    WhyUsComponent,
    TestimonialsComponent,
    FaqComponent,
    CtaBandComponent,
    QuoteFormComponent,
    RevealDirective
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('NS Print Mart | Premium Printing & Print Solutions');
    this.meta.updateTag({
      name: 'description',
      content:
        'NS Print Mart — digital and offset printing in Colombo. Business cards, packaging, banners, and custom print. More print, less waiting.'
    });
  }
}
