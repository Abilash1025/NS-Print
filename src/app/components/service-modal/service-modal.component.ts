import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { ServiceItem } from '../../models';
import { ScrollLockService } from '../../shared/scroll-lock.service';
import { QuoteFormComponent } from '../quote-form/quote-form.component';

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [QuoteFormComponent],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent implements OnInit, OnDestroy {
  readonly service = input.required<ServiceItem>();
  readonly closed = output<void>();

  readonly visible = signal(false);
  readonly closing = signal(false);

  private readonly scrollLock = inject(ScrollLockService);
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private locked = false;

  ngOnInit(): void {
    this.scrollLock.lock();
    this.locked = true;

    // Next frame so CSS enter transition actually runs
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.visible.set(true));
    });
  }

  ngOnDestroy(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
    this.releaseLock();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  close(): void {
    if (this.closing()) {
      return;
    }
    this.closing.set(true);
    this.visible.set(false);

    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
    this.closeTimer = setTimeout(() => {
      this.releaseLock();
      this.closed.emit();
    }, 320);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  pngSrc(imagePath: string): string {
    return imagePath.replace(/\.webp$/i, '.png');
  }

  private releaseLock(): void {
    if (!this.locked) {
      return;
    }
    this.scrollLock.unlock();
    this.locked = false;
  }
}
