import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url != "https://localhost:7045/api/Login"){
  // debugger;
  console.log("inside interceptor");
  const myToken=localStorage.getItem("token");
  const cloneRequest=req.clone({
    setHeaders:{
      Authorization:`Bearer ${myToken}`
    }
  });
  // debugger;
  return next(cloneRequest);
}
return next(req);
};
