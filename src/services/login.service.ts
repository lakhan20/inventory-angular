import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../app/interfaces/login';

@Injectable({
  providedIn: 'root',

})
export class LoginService {
 
  constructor(private http:HttpClient){}
  // private http=inject(HttpClient);
  resp:any;
  login(loginObj:Login){
  
      // this.resp = 

  // this.resp.subscribe((res:any)=>{
  //   console.log("resp : ",res)

  // })
  // console.log("obj : ",loginObj);
  // this.resp= this.http.post('https://localhost:7045/api/Login',loginObj).subscribe((result:any)=>{
  //   console.log("result: ",result);

  // });
  // console.log("respppp",this.resp);
// debugger;
  return this.http.post('https://localhost:7045/api/Login',loginObj);
  
}



}
