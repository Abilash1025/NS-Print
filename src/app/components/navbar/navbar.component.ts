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
  readonly activeSection = signal('top');
  readonly openGroup = signal<string | null>(null);
  readonly mobileOpenGroup = signal<string | null>('Print');

  private readonly scroll = inject(ScrollService);
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
    this.updateActiveSection();
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
    this.closeMenu();
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.activeSection.set('top');
      history.replaceState(null, '', '#top');
      return;
    }
    this.activeSection.set(section);
    this.scroll.scrollTo(section);
    history.replaceState(null, '', `#${section}`);
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

  private updateActiveSection(): void {
    const offset = 130;
    const ids = this.links.map((l) => l.section);
    let current = 'top';

    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 40) {
      this.activeSection.set(ids[ids.length - 1] ?? 'contact');
      return;
    }

    for (const id of ids) {
      if (id === 'top') {
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
      current = 'top';
    }

    this.activeSection.set(current);
  }
}
