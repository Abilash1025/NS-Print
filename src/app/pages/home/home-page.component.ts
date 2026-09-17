import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
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
import { ScrollService } from '../../shared/scroll.service';
import { COMPANY, MAIL_URL, TEL_URL, WHATSAPP_URL } from '../../data/company';

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
export class HomePageComponent implements OnInit, AfterViewInit {
  readonly company = COMPANY;
  readonly mail = MAIL_URL;
  readonly tel = TEL_URL;
  readonly whatsapp = WHATSAPP_URL;

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly scroll = inject(ScrollService);

  ngOnInit(): void {
    this.title.setTitle('NS Print Mart | Premium Printing & Print Solutions');
    this.meta.updateTag({
      name: 'description',
      content:
        'NS Print Mart — digital and offset printing in Colombo. Business cards, packaging, banners, and custom print. More print, less waiting.'
    });
  }

  ngAfterViewInit(): void {
    const raw = window.location.hash.replace('#', '');
    const hash = raw === 'top' ? 'home' : raw;
    // Deep-link to a section after layout. Skip #home / empty so refresh can restore scroll.
    if (hash && hash !== 'home') {
      setTimeout(() => this.scroll.scrollTo(hash, 'auto'), 80);
    }
  }
}
