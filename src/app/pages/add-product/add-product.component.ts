import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AddProduct } from '../../interfaces/add-product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  // import { ReactiveFormsModule } from '@angular/forms';

  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MaterialFileInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule

  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  addProductForm:FormGroup;

  
  ngOnInit() {}
constructor(){
  this.addProductForm=new FormGroup({
    product_name:new FormControl<string>('', Validators.required),
    product_description:new FormControl<string>('', Validators.required),
    product_price:new FormControl<number>(0, Validators.required),
    product_available_qty:new FormControl<number>(0, Validators.required),
    product_total_qty:new FormControl<number>(0, Validators.required),
    product_mrp:new FormControl<number>(0, Validators.required),
    product_discount:new FormControl<number>(0, Validators.required),
    is_available:new FormControl<boolean>(true, Validators.required),
    is_pieces:new FormControl<boolean>(false, Validators.required),
    product_image:new FormControl<string>("",Validators.required),
    subCategory_id:new FormControl<number>(0, Validators.required),
   
  })
}
addProductObj:AddProduct={
  product_name:'',
  product_description:'',
  product_price:0,
  product_mrp:0,
  product_discount:0,
  product_image:'',
  product_available_qty:0,
  product_total_qty:0,
  is_available:true,
  is_pieces:true,
  subCategory_id:0

}
onAddProductBtn(){
  console.log("inside on Product btn");
  
console.log(this.addProductForm.value);

}
}
