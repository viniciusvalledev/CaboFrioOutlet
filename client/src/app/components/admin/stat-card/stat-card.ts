import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule],
  templateUrl: './stat-card.html',
})
export class StatCard {
  icon = input.required<LucideIconData>();
  label = input.required<string>();
  value = input.required<number>();
}
