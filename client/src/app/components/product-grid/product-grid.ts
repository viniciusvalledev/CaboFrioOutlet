import { Component, input } from '@angular/core';
import { LucideAngularModule, PackageSearch } from 'lucide-angular';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  imports: [LucideAngularModule, ProductCard],
  templateUrl: './product-grid.html',
})
export class ProductGrid {
  products = input.required<Product[]>();
  loading = input(false);

  readonly PackageSearch = PackageSearch;
}
