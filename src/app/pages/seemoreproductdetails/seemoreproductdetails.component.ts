// import { Component } from '@angular/core';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { ProductList } from '../../interfaces/product-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ShowAllImagesComponent } from '../show-all-images/show-all-images.component';
import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-seemoreproductdetails',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatTableModule,CommonModule,MatIconModule],
  templateUrl: './seemoreproductdetails.component.html',
  styleUrl: './seemoreproductdetails.component.css'
})
export class SeemoreproductdetailsComponent {
  product_id: number;
  keysArray:Array<string>=[];
  valuesArray:Array<string>=[];
  displayedColumns: string[] = ['Fields','Values'];
  dataSource: { key: string, value: string }[] = [];
  product: ProductList = {} as ProductList; 
  readonly dialog = inject(MatDialog);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productService:ProductService) {
    this.product_id = data.product_id;
    
    productService.getProductById(this.product_id).subscribe((result:any)=>{
      console.log("getProduct By Id result : ",result.product);
      this.product=result.product;  
      
      // this.keysArray = Object.keys(this.product);
      this.keysArray=["Product Name","Product Description","Product Price","Available Qty","Total Qty","MRP","Discount","Is Available","Is Pieces","Images","Sub Category","Category","Created At","Updated At"]
     
      this.valuesArray=Object.values(this.product);

      // this.dataSource = this.keysArray.map((key, index) => ({
      //   key: key,
      //   value: this.valuesArray[index]
      // }));
      // debugger;

      this.dataSource = this.keysArray
      .map((key, index) => ({ key, value: this.valuesArray[index] }))
      .filter(item => item.key !== 'Product Name' && item.value!=null);
      console.log("ds : ",this.dataSource);
      
      // console.log("keys : ",this.keysArray);
      // console.log("values  : ",valueArray);
     
    })

    console.log("see more component : ",this.product_id);
    
  }
  
  showAllImages(images:any){
    console.log("images", images);
    const dialogConfig = new MatDialogConfig();
  
    // Set the width and height of the dialog
    dialogConfig.width = '400px'; // Example width
    dialogConfig.height = '400px'; // Example height
  
    // Add the custom class for centering
    dialogConfig.panelClass = 'center-dialog';
  
    // Pass the data
    dialogConfig.data = { images: images };
    const dialogRef = this.dialog.open(ShowAllImagesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });    
      
  }
}
