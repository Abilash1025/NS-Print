import { Component, OnDestroy, OnInit, inject, input, output } from '@angular/core';
import { PortfolioItem } from '../../models';
import { ScrollLockService } from '../../shared/scroll-lock.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent implements OnInit, OnDestroy {
  readonly item = input.required<PortfolioItem>();
  readonly closed = output<void>();

  private readonly scrollLock = inject(ScrollLockService);
  private locked = false;

  ngOnInit(): void {
    this.scrollLock.lock();
    this.locked = true;
  }

  ngOnDestroy(): void {
    this.releaseLock();
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.releaseLock();
    this.closed.emit();
  }

  private releaseLock(): void {
    if (!this.locked) {
      return;
    }
    this.scrollLock.unlock();
    this.locked = false;
  }
}
