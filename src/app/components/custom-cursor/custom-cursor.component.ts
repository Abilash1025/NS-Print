import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    @if (enabled()) {
      <div
        class="cursor"
        [class.is-hover]="hovering()"
        [class.has-label]="!!label()"
        [style.transform]="'translate(' + x() + 'px,' + y() + 'px)'"
      >
        <span class="cursor__dot"></span>
        @if (label()) {
          <span class="cursor__label">{{ label() }}</span>
        }
      </div>
    }
  `,
  styles: [
    `
      .cursor {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
        mix-blend-mode: difference;
        transition: width 150ms ease, height 150ms ease;
      }
      .cursor__dot {
        display: block;
        width: 10px;
        height: 10px;
        margin: -5px 0 0 -5px;
        border-radius: 999px;
        background: #fff;
        transition: transform 150ms ease;
      }
      .cursor.is-hover .cursor__dot {
        transform: scale(2.2);
      }
      .cursor.has-label .cursor__dot {
        transform: scale(4.2);
        background: transparent;
        border: 1px solid #fff;
        width: 12px;
        height: 12px;
        margin: -6px 0 0 -6px;
      }
      .cursor__label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #fff;
        white-space: nowrap;
      }
    `
  ]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  readonly enabled = signal(false);
  readonly x = signal(0);
  readonly y = signal(0);
  readonly hovering = signal(false);
  readonly label = signal('');

  private onMove = (e: MouseEvent): void => {
    this.x.set(e.clientX);
    this.y.set(e.clientY);
    const target = e.target as HTMLElement | null;
    const interactive = target?.closest('a, button, [data-cursor], input, select, textarea');
    this.hovering.set(!!interactive);
    const labeled = target?.closest('[data-cursor]') as HTMLElement | null;
    this.label.set(labeled?.getAttribute('data-cursor') ?? '');
  };

  ngOnInit(): void {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduced) {
      this.enabled.set(true);
      document.body.classList.add('cursor-active');
      window.addEventListener('mousemove', this.onMove, { passive: true });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMove);
    document.body.classList.remove('cursor-active');
  }

  @HostListener('window:blur')
  onBlur(): void {
    this.hovering.set(false);
    this.label.set('');
  }
}
