import { Component } from '@angular/core';
import { COMPANY } from '../../data/company';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly company = COMPANY;
  /** Staggered sheet delays for continuous feed loop */
  readonly sheets = [0, 1.6, 3.2, 4.8];
}
