import { Component, HostListener, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { COMPANY } from '../../data/company';
import { NAV_GROUPS, NAV_LINKS } from '../../data/navigation';
import { NavGroup } from '../../models';
import { ScrollService } from '../../shared/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly company = COMPANY;
  readonly groups = NAV_GROUPS;
  readonly links = NAV_LINKS;
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly activeSection = signal('home');
  readonly openGroup = signal<string | null>(null);
  readonly mobileOpenGroup = signal<string | null>('Print');

  private readonly scroll = inject(ScrollService);
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private scrollLockTimer: ReturnType<typeof setTimeout> | null = null;
  /** While set, scroll-spy won't overwrite the hash mid-animation. */
  private scrollingTo: string | null = null;
  /** Avoid clobbering URL/scroll while the browser restores position on refresh. */
  private spyReady = false;

  ngOnInit(): void {
    const raw = location.hash.replace(/^#/, '');
    const hash = raw === 'top' ? 'home' : raw;
    if (hash === 'home' || this.links.some((l) => l.section === hash)) {
      this.activeSection.set(hash || 'home');
    }

    const armSpy = (): void => {
      // Let scroll restoration settle before writing hashes
      setTimeout(() => {
        this.spyReady = true;
        this.updateActiveSection(false);
      }, 120);
    };

    if (document.readyState === 'complete') {
      armSpy();
    } else {
      window.addEventListener('load', armSpy, { once: true });
    }
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    if (this.scrollLockTimer) {
      clearTimeout(this.scrollLockTimer);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
    if (this.spyReady) {
      this.updateActiveSection();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.nav__item--has-menu')) {
      this.openGroup.set(null);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    if (!this.menuOpen()) {
      this.mobileOpenGroup.set(null);
    }
  }

  closeMenu(): void {
    this.clearCloseTimer();
    this.menuOpen.set(false);
    this.openGroup.set(null);
    this.mobileOpenGroup.set(null);
  }

  openDesktopGroup(label: string): void {
    if (!this.isDesktopNav()) {
      return;
    }
    this.clearCloseTimer();
    this.openGroup.set(label);
  }

  scheduleCloseDesktopGroup(label: string): void {
    if (!this.isDesktopNav()) {
      return;
    }
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      if (this.openGroup() === label) {
        this.openGroup.set(null);
      }
    }, 180);
  }

  toggleDesktopGroup(label: string, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.clearCloseTimer();
    this.openGroup.update((current) => (current === label ? null : label));
  }

  toggleMobileGroup(label: string): void {
    this.mobileOpenGroup.update((current) => (current === label ? null : label));
  }

  isGroupActive(group: NavGroup): boolean {
    const active = this.activeSection();
    if (group.section) {
      return active === group.section;
    }
    return !!group.children?.some((child) => child.section === active);
  }

  goTo(section: string, event?: Event): void {
    event?.preventDefault();
    const target = section === 'top' ? 'home' : section;
    this.closeMenu();
    this.lockScrollSpy(target);
    this.activeSection.set(target);
    this.syncHash(target, true);

    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    this.scroll.scrollTo(target);
  }

  private lockScrollSpy(section: string): void {
    this.scrollingTo = section;
    if (this.scrollLockTimer) {
      clearTimeout(this.scrollLockTimer);
    }
    this.scrollLockTimer = setTimeout(() => {
      this.scrollingTo = null;
      this.updateActiveSection(true);
    }, 900);
  }

  private isDesktopNav(): boolean {
    return window.matchMedia('(min-width: 980px)').matches;
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  private syncHash(section: string, force = false): void {
    if (!force && this.scrollingTo) {
      return;
    }

    const next = `#${section}`;
    if (location.hash === next) {
      return;
    }

    const base = `${location.pathname}${location.search}`;
    history.replaceState(null, '', `${base}${next}`);
  }

  private updateActiveSection(forceHash = false): void {
    if (!this.spyReady && !forceHash) {
      return;
    }

    const offset = 130;
    const ids = this.links.map((l) => l.section);
    let current = 'home';

    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 40) {
      current = ids[ids.length - 1] ?? 'contact';
    } else {
      for (const id of ids) {
        if (id === 'home' || id === 'top') {
          continue;
        }
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          current = id;
        }
      }

      if (window.scrollY < 40) {
        current = 'home';
      }
    }

    if (this.activeSection() !== current) {
      this.activeSection.set(current);
    }

    if (forceHash || !this.scrollingTo) {
      this.syncHash(current, forceHash);
    }
  }
}
