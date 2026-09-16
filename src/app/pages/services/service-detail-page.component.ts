import { Component, OnInit, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { getServiceBySlug, SERVICES } from '../../data/services';
import { ServiceItem } from '../../models';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [RouterLink, QuoteFormComponent],
  templateUrl: './service-detail-page.component.html',
  styleUrl: './service-detail-page.component.scss'
})
export class ServiceDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly service = signal<ServiceItem | null>(null);
  readonly related = signal<ServiceItem[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      const found = getServiceBySlug(slug) ?? null;
      this.service.set(found);
      if (found) {
        this.title.setTitle(`${found.name} | NS Print Mart`);
        this.meta.updateTag({ name: 'description', content: found.shortDescription });
        this.related.set(this.buildRelated(found));
      } else {
        this.title.setTitle('Service not found | NS Print Mart');
      }
    });
  }

  /** Same-category services first, topped up with others so the row is never half empty. */
  private buildRelated(current: ServiceItem): ServiceItem[] {
    const sameCategory = SERVICES.filter(
      (s) => s.category === current.category && s.id !== current.id
    );
    const others = SERVICES.filter(
      (s) => s.category !== current.category && s.id !== current.id
    );
    return [...sameCategory, ...others].slice(0, 3);
  }
}
