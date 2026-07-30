import { HttpInterceptorFn } from '@angular/common/http';
import { getToken } from '../services/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken();
  let headers = req.headers;
  if (!(req.body instanceof FormData)) {
    headers = headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  return next(req.clone({ headers }));
};
