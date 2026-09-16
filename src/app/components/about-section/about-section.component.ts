import { Component } from '@angular/core';
import { COMPANY } from '../../data/company';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  readonly company = COMPANY;
}
