import { Injectable } from '@angular/core';

/**
 * Locks page scroll while overlays are open (modal / lightbox).
 * Uses position:fixed so iOS / touch devices don't scroll the page behind,
 * then restores the exact scroll position instantly on unlock.
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
      this.scrollY = window.scrollY || window.pageYOffset || 0;
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      document.body.style.top = `-${this.scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
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

    const y = this.scrollY;
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;

    // Avoid smooth scroll animating from top → saved position (feels like a jump)
    html.style.scrollBehavior = 'auto';

    const active = document.activeElement as HTMLElement | null;
    if (active && typeof active.blur === 'function' && active !== document.body) {
      active.blur();
    }

    document.body.classList.remove('scroll-locked');
    html.classList.remove('scroll-locked');
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';

    this.restoreScroll(y);

    // iOS sometimes reapplies scroll after layout — pin again next frames
    requestAnimationFrame(() => {
      this.restoreScroll(y);
      requestAnimationFrame(() => {
        this.restoreScroll(y);
        html.style.scrollBehavior = previousBehavior;
      });
    });
  }

  private restoreScroll(y: number): void {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
    // Fallback for older WebKit
    if (Math.abs((window.scrollY || 0) - y) > 1) {
      window.scrollTo(0, y);
    }
  }
}
