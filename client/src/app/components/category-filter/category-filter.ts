import { Component, input, output } from '@angular/core';
import { ProductCategory } from '../../types/product';

type CategoryOrAll = ProductCategory | 'todos';

const FILTERS: { label: string; value: CategoryOrAll }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Camisas', value: 'camisas' },
  { label: 'Calças', value: 'calças' },
  { label: 'Bermudas', value: 'bermudas' },
  { label: 'Bonés', value: 'bonés' },
];

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.html',
})
export class CategoryFilter {
  activeCategory = input.required<CategoryOrAll>();
  counts = input.required<Record<CategoryOrAll, number>>();
  categoryChange = output<CategoryOrAll>();

  readonly filters = FILTERS;
}
