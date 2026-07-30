import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { clearToken, getToken, setToken } from './token';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private api = inject(ApiService);

  private _isAuthenticated = signal(false);
  private _checking = signal(true);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly checking = this._checking.asReadonly();

  constructor() {
    const token = getToken();
    if (!token) {
      this._checking.set(false);
      return;
    }
    this.api
      .get('/auth/me')
      .then(() => this._isAuthenticated.set(true))
      .catch(() => clearToken())
      .finally(() => this._checking.set(false));
  }

  async login(password: string): Promise<void> {
    const { token } = await this.api.post<{ token: string }>('/auth/login', { password });
    setToken(token);
    this._isAuthenticated.set(true);
  }

  logout(): void {
    clearToken();
    this._isAuthenticated.set(false);
  }
}
