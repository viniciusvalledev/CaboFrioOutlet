import { Component } from '@angular/core';
import { LucideAngularModule, ArrowRight, Truck, RefreshCcw, CreditCard } from 'lucide-angular';

const TRUST_ITEMS = [
  { icon: Truck, label: 'Frete grátis acima de R$ 299' },
  { icon: RefreshCcw, label: 'Troca grátis em 30 dias' },
  { icon: CreditCard, label: 'Até 3x sem juros' },
];

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule],
  templateUrl: './hero.html',
})
export class Hero {
  readonly ArrowRight = ArrowRight;
  readonly trustItems = TRUST_ITEMS;

  scrollToProducts(): void {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
