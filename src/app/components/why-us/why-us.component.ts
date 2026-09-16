import { Component } from '@angular/core';
import { WHY_ITEMS } from '../../data/navigation';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  readonly items = WHY_ITEMS;
}
