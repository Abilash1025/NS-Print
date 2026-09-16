import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(sectionId: string, behavior: ScrollBehavior = 'smooth'): void {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    // Reveal any hidden scroll-reveal nodes in/near the target before scrolling
    el.querySelectorAll('.reveal:not(.is-visible), .reveal-clip:not(.is-visible)').forEach((node) => {
      node.classList.add('is-visible');
    });
    if (el.classList.contains('reveal') || el.classList.contains('reveal-clip')) {
      el.classList.add('is-visible');
    }

    el.scrollIntoView({ behavior, block: 'start' });
  }
}
