import { Component, signal } from '@angular/core';
import { FINISHES, FINISH_MARQUEE } from '../../data/finishes';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-finishes',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './finishes.component.html',
  styleUrl: './finishes.component.scss'
})
export class FinishesComponent {
  readonly finishes = FINISHES;
  readonly marquee = [...FINISH_MARQUEE, ...FINISH_MARQUEE];
  readonly activeId = signal(FINISHES[0].id);
  /** Bumped on each change to retrigger the ink-wipe animation */
  readonly wipeKey = signal(0);

  get active() {
    return this.finishes.find((f) => f.id === this.activeId()) ?? this.finishes[0];
  }

  select(id: string): void {
    if (this.activeId() === id) {
      return;
    }
    this.activeId.set(id);
    this.wipeKey.update((k) => k + 1);
  }
}
