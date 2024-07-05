// import { Component } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { ProductList } from '../../interfaces/product-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seemoreproductdetails',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatTableModule,CommonModule],
  templateUrl: './seemoreproductdetails.component.html',
  styleUrl: './seemoreproductdetails.component.css'
})
export class SeemoreproductdetailsComponent {
  product_id: number;
  keysArray:Array<string>=[];
  valuesArray:Array<string>=[];
  
  product: ProductList = {} as ProductList; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productService:ProductService) {
    this.product_id = data.product_id;
    
    productService.getProductById(this.product_id).subscribe((result:any)=>{
      console.log("getProduct By Id result : ",result.product);
      this.product=result.product;  
      
      this.keysArray = Object.keys(this.product);
      this.valuesArray=Object.values(this.product);
      // console.log("keys : ",this.keysArray);
      // console.log("values  : ",valueArray);
      
      
      
    })

    console.log("see more component : ",this.product_id);
    
  }
}
