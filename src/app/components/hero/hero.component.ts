import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/company';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly company = COMPANY;

  private readonly tickerItems = [
    'BUSINESS CARDS',
    'BROCHURES',
    'PACKAGING',
    'STICKERS',
    'BANNERS',
    'INVITATIONS',
    'MENUS',
    'CATALOGUES'
  ];

  readonly ticker = [...this.tickerItems, ...this.tickerItems];
}
