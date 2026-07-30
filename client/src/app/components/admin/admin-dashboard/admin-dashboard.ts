import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, LogOut } from 'lucide-angular';
import { SettingsService, splitStoreName, storeInitials } from '../../../services/settings.service';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { ProductsTab } from '../tabs/products-tab/products-tab';
import { StockTab } from '../tabs/stock-tab/stock-tab';
import { OrdersTab } from '../tabs/orders-tab/orders-tab';
import { SettingsTab } from '../tabs/settings-tab/settings-tab';

type TabKey = 'produtos' | 'estoque' | 'pedidos' | 'configuracoes';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'produtos', label: 'Produtos' },
  { key: 'estoque', label: 'Estoque' },
  { key: 'pedidos', label: 'Pedidos' },
  { key: 'configuracoes', label: 'Configurações' },
];

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, LucideAngularModule, ProductsTab, StockTab, OrdersTab, SettingsTab],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  settingsService = inject(SettingsService);
  private adminAuthService = inject(AdminAuthService);

  readonly LogOut = LogOut;
  readonly tabs = TABS;
  readonly storeInitials = storeInitials;

  readonly wordmark = computed(() => splitStoreName(this.settingsService.settings().storeName));

  activeTab = signal<TabKey>('produtos');

  logout(): void {
    this.adminAuthService.logout();
  }
}
