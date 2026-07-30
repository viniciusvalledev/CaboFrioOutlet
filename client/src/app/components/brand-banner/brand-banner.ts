import { Component } from '@angular/core';

const BANNERS = [
  {
    title: 'Nova Coleção',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Mais Vendidos',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&auto=format&fit=crop&q=80',
  },
];

@Component({
  selector: 'app-brand-banner',
  templateUrl: './brand-banner.html',
})
export class BrandBanner {
  readonly banners = BANNERS;

  scrollToProducts(): void {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
