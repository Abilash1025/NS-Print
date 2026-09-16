import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { MobileCtaComponent } from './components/mobile-cta/mobile-cta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CustomCursorComponent,
    MobileCtaComponent
  ],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-navbar />
    <main id="main">
      <router-outlet />
    </main>
    <app-footer />
    <app-mobile-cta />
    <app-custom-cursor />
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.body.classList.add('has-mobile-cta');
  }
}
