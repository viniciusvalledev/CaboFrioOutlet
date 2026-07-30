import { Component, computed, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

@Component({
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.html',
})
export class AnnouncementBar {
  private settingsService = inject(SettingsService);

  readonly loop = computed(() => {
    const settings = this.settingsService.settings();
    const messages = [
      `Frete grátis acima de ${formatPrice(settings.freeShippingThreshold)}`,
      ...settings.announcementMessages,
    ];
    return [...messages, ...messages];
  });
}
