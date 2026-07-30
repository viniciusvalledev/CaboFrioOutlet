import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  get<T>(path: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`/api${path}`));
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return firstValueFrom(this.http.post<T>(`/api${path}`, body ?? null));
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return firstValueFrom(this.http.put<T>(`/api${path}`, body ?? null));
  }

  patch<T>(path: string, body?: unknown): Promise<T> {
    return firstValueFrom(this.http.patch<T>(`/api${path}`, body ?? null));
  }

  delete<T>(path: string): Promise<T> {
    return firstValueFrom(this.http.delete<T>(`/api${path}`));
  }
}
