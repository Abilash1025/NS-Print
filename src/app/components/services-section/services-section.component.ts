import { Component, input, signal } from '@angular/core';
import { SERVICES } from '../../data/services';
import { ServiceItem } from '../../models';
import { RevealDirective } from '../../shared/reveal.directive';
import { ServiceModalComponent } from '../service-modal/service-modal.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RevealDirective, ServiceModalComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  readonly limit = input<number | null>(null);
  readonly showHeader = input(true);

  readonly selected = signal<ServiceItem | null>(null);

  get services() {
    const limit = this.limit();
    return limit ? SERVICES.slice(0, limit) : SERVICES;
  }

  open(service: ServiceItem): void {
    this.selected.set(service);
  }

  close(): void {
    this.selected.set(null);
  }

  pngSrc(imagePath: string): string {
    return imagePath.replace(/\.webp$/i, '.png');
  }
}
