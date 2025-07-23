import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const cloned = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return next(cloned);
};
