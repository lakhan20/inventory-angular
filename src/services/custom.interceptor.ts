import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken=localStorage.getItem("token");
  const cloneRequest=req.clone({
    setHeaders:{
      token:`Bearer ${myToken}`
    }
  });
  return next(cloneRequest);
};
