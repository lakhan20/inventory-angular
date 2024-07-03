import { CanActivateFn } from '@angular/router';
import { routes } from './app.routes';


// isValid(user:,userId:string):boolean{

// }
export const authGuard: CanActivateFn = (route, state) => {
  console.log("token : ",localStorage.getItem("token"));
  if(localStorage.getItem("token")){
    return true;
  }
  else{
    return false;

  }
};
