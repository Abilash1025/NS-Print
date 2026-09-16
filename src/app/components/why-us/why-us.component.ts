import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  readonly colour = {
    title: 'Colour that holds',
    description:
      'Calibrated CMYK on every run — sharp brand colour from first sheet to last, press-checked before it leaves the floor.'
  };

  readonly timing = {
    title: 'Timing you can plan',
    description: 'Clear production schedules and reliable handoff so campaigns stay on track.'
  };

  readonly finish = {
    title: 'Finish with intent',
    description: 'Matte, gloss, foil, and emboss chosen to match how your piece should feel in hand.'
  };

  readonly care = {
    title: 'Care from brief to pack',
    description: 'Guided support through artwork checks, proofs, and final delivery — not just a print job.',
    steps: [
      { label: 'Artwork', hint: 'Review' },
      { label: 'Proof', hint: 'Refine' },
      { label: 'Print', hint: 'Ready' }
    ]
  };
}
