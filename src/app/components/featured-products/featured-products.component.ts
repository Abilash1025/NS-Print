import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_PRODUCTS } from '../../data/products';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {
  readonly products = FEATURED_PRODUCTS;
}
