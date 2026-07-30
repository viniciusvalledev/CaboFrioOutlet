import { Component, inject } from '@angular/core';
import { LucideAngularModule, CircleCheckBig, X } from 'lucide-angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-stack',
  imports: [LucideAngularModule],
  templateUrl: './toast-stack.html',
})
export class ToastStack {
  toastService = inject(ToastService);

  readonly CircleCheckBig = CircleCheckBig;
  readonly X = X;
}
