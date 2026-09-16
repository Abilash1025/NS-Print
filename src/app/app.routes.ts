import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services-page.component').then((m) => m.ServicesPageComponent)
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/services/service-detail-page.component').then(
        (m) => m.ServiceDetailPageComponent
      )
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/portfolio/portfolio-page.component').then((m) => m.PortfolioPageComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then((m) => m.AboutPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then((m) => m.ContactPageComponent)
  },
  { path: '**', redirectTo: '' }
];
