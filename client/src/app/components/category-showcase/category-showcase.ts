import { Component, output } from '@angular/core';
import { ProductCategory } from '../../types/product';

const SHOWCASE_ITEMS: { label: string; value: ProductCategory; image: string }[] = [
  {
    label: 'Camisas',
    value: 'camisas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Calças',
    value: 'calças',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Bermudas',
    value: 'bermudas',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Bonés',
    value: 'bonés',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
  },
];

@Component({
  selector: 'app-category-showcase',
  templateUrl: './category-showcase.html',
})
export class CategoryShowcase {
  selectCategory = output<ProductCategory>();

  readonly items = SHOWCASE_ITEMS;

  handleClick(value: ProductCategory): void {
    this.selectCategory.emit(value);
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
