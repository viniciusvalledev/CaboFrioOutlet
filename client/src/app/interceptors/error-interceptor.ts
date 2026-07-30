import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../services/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        const message = err.error?.error || `Erro ${err.status}`;
        return throwError(() => new ApiError(message, err.status));
      }
      return throwError(() => err);
    })
  );
};
