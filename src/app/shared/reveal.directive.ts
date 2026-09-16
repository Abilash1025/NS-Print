import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input
} from '@angular/core';

const VARIANT_MAP: Record<string, string> = {
  up: 'reveal--soft',
  left: 'reveal--left',
  right: 'reveal--right',
  scale: 'reveal--scale',
  soft: 'reveal--soft',
  stagger: 'reveal--stagger',
  clip: 'reveal-clip'
};

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Space-separated options: left | right | scale | soft | stagger | reveal-delay-1..6 */
  readonly options = input<string>('', { alias: 'appReveal' });

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private safetyTimer?: ReturnType<typeof setTimeout>;
  private readonly onScrollCheck = () => this.checkNearby();

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const tokens = this.options()
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const useClip = tokens.includes('clip');
    node.classList.add(useClip ? 'reveal-clip' : 'reveal');

    for (const token of tokens) {
      if (token === 'clip') {
        continue;
      }
      if (token.startsWith('reveal-delay-') || token.startsWith('reveal--')) {
        node.classList.add(token);
        continue;
      }
      const mapped = VARIANT_MAP[token];
      if (mapped) {
        node.classList.add(mapped);
      }
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.show(node);
      return;
    }

    // Deep-link / reload with hash — show target section immediately
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      const target = document.getElementById(hash);
      if (target && (target === node || target.contains(node) || node.contains(target))) {
        this.show(node);
        return;
      }
    }

    if (this.isNearViewport(node)) {
      this.show(node);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.show(node);
          }
        }
      },
      { threshold: 0, rootMargin: '200px 0px 200px 0px' }
    );

    this.observer.observe(node);

    // Catch hash jumps / programmatic scroll that IO can miss
    window.addEventListener('scroll', this.onScrollCheck, { passive: true });
    window.addEventListener('resize', this.onScrollCheck, { passive: true });

    requestAnimationFrame(() => this.checkNearby());

    this.safetyTimer = setTimeout(() => {
      if (!node.classList.contains('is-visible') && this.isNearViewport(node, 1.5)) {
        this.show(node);
      }
    }, 800);
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  private checkNearby(): void {
    const node = this.el.nativeElement;
    if (node.classList.contains('is-visible')) {
      return;
    }
    if (this.isNearViewport(node)) {
      this.show(node);
    }
  }

  private show(node: HTMLElement): void {
    node.classList.add('is-visible');
    this.teardown();
  }

  private teardown(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = undefined;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScrollCheck);
      window.removeEventListener('resize', this.onScrollCheck);
    }
  }

  private isNearViewport(node: HTMLElement, factor = 1): boolean {
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const pad = 200 * factor;
    return rect.top < vh + pad && rect.bottom > -pad;
  }
}
