import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../app/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  products:Array<Category>=[];
  getAllCategories(){
  return  this.http.get("https://localhost:7045/api/getallcategories");
  }
}
