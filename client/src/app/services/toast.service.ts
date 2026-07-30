import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<ToastMessage[]>([]);
  readonly toasts = this._toasts.asReadonly();

  showToast(title: string, description?: string): void {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    this._toasts.update((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      this._toasts.update((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  dismissToast(id: string): void {
    this._toasts.update((prev) => prev.filter((t) => t.id !== id));
  }
}
