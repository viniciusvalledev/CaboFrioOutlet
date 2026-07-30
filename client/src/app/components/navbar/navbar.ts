import { Component, computed, inject, input, output, signal } from '@angular/core';
import { LucideAngularModule, ShoppingBag, Menu, X, Search, User } from 'lucide-angular';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { SettingsService, splitStoreName, storeInitials } from '../../services/settings.service';
import { ProductCategory } from '../../types/product';

type CategoryOrAll = ProductCategory | 'todos';

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: 'Camisas', value: 'camisas' },
  { label: 'Calças', value: 'calças' },
  { label: 'Bermudas', value: 'bermudas' },
  { label: 'Bonés', value: 'bonés' },
];

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  cartService = inject(CartService);
  private toastService = inject(ToastService);
  settingsService = inject(SettingsService);

  readonly ShoppingBag = ShoppingBag;
  readonly Menu = Menu;
  readonly X = X;
  readonly Search = Search;
  readonly User = User;
  readonly categories = CATEGORIES;
  readonly storeInitials = storeInitials;

  activeCategory = input.required<CategoryOrAll>();
  categoryChange = output<CategoryOrAll>();
  searchQuery = input.required<string>();
  searchChange = output<string>();

  mobileMenuOpen = signal(false);
  searchOpen = signal(false);

  readonly wordmark = computed(() => splitStoreName(this.settingsService.settings().storeName));

  handleCategoryClick(category: CategoryOrAll): void {
    this.categoryChange.emit(category);
    this.mobileMenuOpen.set(false);
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }

  handleHomeClick(): void {
    this.categoryChange.emit('todos');
    this.mobileMenuOpen.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleSearch(): void {
    const willOpen = !this.searchOpen();
    if (!willOpen) this.searchChange.emit('');
    this.searchOpen.set(willOpen);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  showAccountToast(): void {
    this.toastService.showToast('Login em breve', 'Estamos preparando a área do cliente.');
  }
}
