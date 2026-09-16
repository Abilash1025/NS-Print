import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/company';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  readonly compact = input(false);
  readonly company = COMPANY;
}
