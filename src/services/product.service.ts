import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductList } from '../app/interfaces/product-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  products:Array<ProductList>=[];

  getAllproducts() {   
 return   this.http.get("https://localhost:7045/api/getallproducts");
  }
  getProductById(product_id:number){
    return this.http.get("https://localhost:7045/api/getproductbyid/"+product_id);

  }




}
