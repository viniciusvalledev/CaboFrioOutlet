import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../types/product';

export function getDiscountedPrice(product: Product): number {
  if (product.discountPercent) {
    return product.price * (1 - product.discountPercent / 100);
  }
  return product.price;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);
  private _isCartOpen = signal(false);

  readonly items = this._items.asReadonly();
  readonly isCartOpen = this._isCartOpen.asReadonly();

  readonly totalItems = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + getDiscountedPrice(item.product) * item.quantity, 0)
  );

  addToCart(product: Product, selectedSize: string): void {
    this._items.update((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize }];
    });
  }

  removeFromCart(productId: string, selectedSize: string): void {
    this._items.update((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
    );
  }

  updateQuantity(productId: string, selectedSize: string, quantity: number): void {
    if (quantity <= 0) {
      this._items.update((prev) =>
        prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
      );
      return;
    }
    this._items.update((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  openCart(): void {
    this._isCartOpen.set(true);
  }

  closeCart(): void {
    this._isCartOpen.set(false);
  }
}
