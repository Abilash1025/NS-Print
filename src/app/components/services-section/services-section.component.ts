import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../data/services';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  readonly limit = input<number | null>(8);
  readonly showHeader = input(true);

  get services() {
    const limit = this.limit();
    return limit ? SERVICES.slice(0, limit) : SERVICES;
  }
}
