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
    `
  ]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.body.classList.add('has-mobile-cta');
  }
}
