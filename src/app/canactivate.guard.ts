import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { routes } from './app.routes';

@Injectable({
  providedIn: 'root',
})
export class CanactivateGuard implements CanActivate {
  token:any;
  flag:boolean=true;
  constructor(private httpClient: HttpClient,private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
  //   console.log("inside cn");
    
    const headers = new HttpHeaders();

   this.token=localStorage.getItem("token") ;
  //   debugger;
   headers.set('Authorization',this.token);

    this.httpClient.get("https://localhost:7045/api/validateToken",{headers:headers}).subscribe((result:any)=>{
      console.log("canactivate",result);
      
      if(result==null){
     
        // this.router.navigate(['/login']);
        this.flag=false;
        // return false;
      }

    })
    return this.flag;

//   if(this.token){
//   const head=new Headers();
//   head.set("Authorization",this.token);
// this.httpClient.get("https://localhost:7045/api/validateToken",{headers:head}).subscribe((result:any)=>{

// })
//     return true;
//   }
// else{
//   return false;
// }  
}
}
