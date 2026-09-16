import { Component, input, output } from '@angular/core';
import { PortfolioItem } from '../../models';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  readonly item = input.required<PortfolioItem>();
  readonly closed = output<void>();

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
