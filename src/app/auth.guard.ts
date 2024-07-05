import { CanActivateFn } from '@angular/router';
import { routes } from './app.routes';


// isValid(user:,userId:string):boolean{

// }
export const authGuard: CanActivateFn = (route, state) => {
// return false;
  // debugger;
  console.log("token : ",localStorage.getItem("token"));
  debugger;
  if(localStorage.getItem("token")){
    return true;
  }
  else{
    return false;

  }
};
