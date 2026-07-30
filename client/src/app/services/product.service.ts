import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductInput } from '../types/product';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);

  private _products = signal<Product[]>([]);
  private _loading = signal(true);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    this.refresh().finally(() => this._loading.set(false));
  }

  async refresh(): Promise<void> {
    const data = await this.api.get<Product[]>('/products');
    this._products.set(data);
  }

  async addProduct(input: ProductInput): Promise<void> {
    await this.api.post('/products', input);
    await this.refresh();
  }

  async updateProduct(id: string, input: ProductInput): Promise<void> {
    await this.api.put(`/products/${id}`, input);
    await this.refresh();
  }

  async deleteProduct(id: string): Promise<void> {
    await this.api.delete(`/products/${id}`);
    await this.refresh();
  }

  async updateStock(productId: string, size: string, quantity: number): Promise<void> {
    await this.api.put(`/products/${productId}/stock`, { size, quantity });
    await this.refresh();
  }
}
