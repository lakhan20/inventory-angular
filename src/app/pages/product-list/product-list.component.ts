import { Component,OnInit } from '@angular/core';
import { ProductList } from '../../interfaces/product-list';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
// import {} from '@angular/ma'
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit  {
  
  constructor(private productService:ProductService){}
 
  products:Array<ProductList> = [] 
  productList:Array<ProductList>=[]
  // getAllProducts():ProductList[]{
  //   debugger;
  //   this.productService.getAllproducts().subscribe((result:any)=>{
  //     debugger;
  //     // console.log("result",result.products);
  //     this.products=result.products
  //     console.log("getallprods : ",this.products);
      
  //     return this.products;
  
  //   })
  
    
  //   return this.products;
  //   // return this.products;





  // }
  ngOnInit(){
    this.productService.getAllproducts().subscribe((result:any)=>{
      this.products=result.products;
    console.log("inside result : ",this.products);
      
    })
    setTimeout(() => {
      console.log("outside result : ",this.products);
      
    }, 5000);




  
  }



}
