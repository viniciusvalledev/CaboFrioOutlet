import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { SettingsService, splitStoreName, storeInitials } from '../../../services/settings.service';
import { ApiError } from '../../../services/api-error';

@Component({
  selector: 'app-admin-login',
  imports: [RouterLink],
  templateUrl: './admin-login.html',
})
export class AdminLogin {
  private adminAuthService = inject(AdminAuthService);
  settingsService = inject(SettingsService);

  readonly storeInitials = storeInitials;
  readonly wordmark = computed(() => splitStoreName(this.settingsService.settings().storeName));

  password = signal('');
  error = signal('');
  submitting = signal(false);

  onPasswordChange(value: string): void {
    this.password.set(value);
    this.error.set('');
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitting.set(true);
    this.error.set('');
    try {
      await this.adminAuthService.login(this.password());
    } catch (err) {
      this.error.set(err instanceof ApiError ? err.message : 'Não foi possível entrar.');
    } finally {
      this.submitting.set(false);
    }
  }
}
