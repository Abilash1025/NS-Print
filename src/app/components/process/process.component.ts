import { Component } from '@angular/core';
import { PROCESS_STEPS } from '../../data/navigation';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {
  readonly steps = PROCESS_STEPS;
}
