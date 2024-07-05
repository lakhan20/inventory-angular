import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductfilterService {
  constructor(private httpClient: HttpClient) {}

  filterByCategory(category_id:any){
    return this.httpClient.get("https://localhost:7045/api/filterByCategory/"+category_id);
  }
}
