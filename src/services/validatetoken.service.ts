import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidatetokenService {

  token:any;
  constructor(private httpClient:HttpClient) { }
  validateToken(){
    const headers = new HttpHeaders();

    this.token=localStorage.getItem("token") ;
   //   debugger;
    headers.set('Authorization',this.token);
 
    return this.httpClient.get("https://localhost:7045/api/validateToken",{headers:headers})
  }
}
