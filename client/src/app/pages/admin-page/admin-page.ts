import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminLogin } from '../../components/admin/admin-login/admin-login';
import { AdminDashboard } from '../../components/admin/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-admin-page',
  imports: [AdminLogin, AdminDashboard],
  templateUrl: './admin-page.html',
})
export class AdminPage {
  private settingsService = inject(SettingsService);
  private titleService = inject(Title);
  adminAuthService = inject(AdminAuthService);

  constructor() {
    effect(() => {
      this.titleService.setTitle(`${this.settingsService.settings().storeName} — Painel Admin`);
    });
  }
}
