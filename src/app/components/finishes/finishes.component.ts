import { Component, signal } from '@angular/core';
import { FINISHES } from '../../data/finishes';
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
  readonly activeId = signal(FINISHES[0].id);
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
