import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Login } from '../app/interfaces/login';

@Injectable({
  providedIn: 'root',

})
export class LoginService {
 
  constructor(private http:HttpClient){}
  // private http=inject(HttpClient);

  login(loginObj:Login){
  
  return this.http.post('https://localhost:7045/api/Login',loginObj);
  }

}
