import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileCtaComponent } from './components/mobile-cta/mobile-cta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MobileCtaComponent],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <div id="home" class="scroll-home-anchor" tabindex="-1"></div>
    <app-navbar />
    <main id="main">
      <router-outlet />
    </main>
    <app-footer />
    <app-mobile-cta />
  `,
  styles: [
    `
      :host {
        display: block;
        overflow-x: clip;
        max-width: 100%;
      }

      /* Page origin anchor — professional #home hash, not under sticky nav */
      .scroll-home-anchor {
        position: relative;
        height: 0;
        width: 0;
        overflow: hidden;
        pointer-events: none;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.body.classList.add('has-mobile-cta');
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    // Migrate legacy #top bookmarks to #home
    if (location.hash === '#top') {
      history.replaceState(null, '', `${location.pathname}${location.search}#home`);
    }
  }
}
