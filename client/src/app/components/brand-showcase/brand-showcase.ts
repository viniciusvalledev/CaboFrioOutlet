import { Component, output } from '@angular/core';

const SHOWCASE_BRANDS: { label: string }[] = [{ label: 'Nike' }, { label: 'Adidas' }, { label: 'High' }];

@Component({
  selector: 'app-brand-showcase',
  templateUrl: './brand-showcase.html',
})
export class BrandShowcase {
  selectBrand = output<string>();

  readonly items = SHOWCASE_BRANDS;

  handleClick(label: string): void {
    this.selectBrand.emit(label);
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
