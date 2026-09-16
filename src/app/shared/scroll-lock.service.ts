import { Injectable } from '@angular/core';

/**
 * Locks page scroll while overlays are open (modal / lightbox).
 * Uses position:fixed so iOS / touch devices don't scroll the page behind.
 */
@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  private locks = 0;
  private scrollY = 0;

  lock(): void {
    if (typeof document === 'undefined') {
      return;
    }

    if (this.locks === 0) {
      this.scrollY = window.scrollY;
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      document.body.style.top = `-${this.scrollY}px`;
    }

    this.locks += 1;
  }

  unlock(): void {
    if (typeof document === 'undefined' || this.locks === 0) {
      return;
    }

    this.locks -= 1;

    if (this.locks > 0) {
      return;
    }

    document.documentElement.classList.remove('scroll-locked');
    document.body.classList.remove('scroll-locked');
    document.body.style.top = '';
    window.scrollTo(0, this.scrollY);
  }
}
