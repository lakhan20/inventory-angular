import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { ProductList } from '../../interfaces/product-list';
import { ProductService } from '../../../services/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../interfaces/category';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProductfilterService } from '../../../services/productfilter.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { SeemoreproductdetailsComponent } from '../seemoreproductdetails/seemoreproductdetails.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
// import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    RouterOutlet
    
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Array<ProductList> = [];
  categories: Array<Category> = [];
  dataSource = new MatTableDataSource<ProductList>();
  displayedColumns: string[] = [
    'srNo',
    'product_name',
    'product_price',
    'see_more',
  ];
  statusCode:any=200;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private _liveannouncer: LiveAnnouncer,
    private categoryService: CategoryService,
    private productfilterService: ProductfilterService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit() {
    this.fn_GetAllProducts();
    this.fn_getAllCategories();
  }

  fn_getAllCategories(){
    this.categoryService.getAllCategories().subscribe((categoryResp: any) => {
      this.categories = categoryResp.categories;

      console.log(this.categories);
    });
  }

  fn_GetAllProducts(){
    this.productService
    .getAllproducts()
    .pipe(catchError((error) => this.handleError(error, this.toastr)))
    .subscribe((result: any) => {
      this.statusCode=result.status;
      this.products = result.products;

      console.log('inside result : ', this.products);
      this.dataSource.data = this.products;
      this.dataSource.sort = this.sort; // Ensure sort is assigned after data load
    });

  }




  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog(product_id: any) {
    const dialogConfig = new MatDialogConfig();
  
    // Set the width and height of the dialog
    dialogConfig.width = '600px'; // Example width
    dialogConfig.height = '600px'; // Example height
  
    // Add the custom class for centering
    dialogConfig.panelClass = 'center-dialog';
  
    // Pass the data
    dialogConfig.data = { product_id: product_id };
  
    const dialogRef = this.dialog.open(SeemoreproductdetailsComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  
  private handleError(
    error: HttpErrorResponse,
    toastr: ToastrService
  ): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    toastr.error(errorMessage);
    this.router.navigate(['/login']);
    return throwError(() => new Error(errorMessage));
  }

  private handleErrorProductByCat(
    error: HttpErrorResponse,
    toastr: ToastrService
  ): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
   this.statusCode=error.status
    
    return throwError(() => new Error(errorMessage));
  }

  getProductByCategory(catid: any) {

    console.log('catid', catid);
    if(catid==0){
      this.fn_getAllCategories()
      this.fn_GetAllProducts()
    }
    else{
    this.productfilterService
      .filterByCategory(catid)
      .pipe(catchError((error) => this.handleErrorProductByCat(error, this.toastr)))
      .subscribe((result: any) => {
        console.log('result : ', result.status);

        if (result.status == 200) {
          // console.log("products: ",result.productList);

          this.products = result.productList;
          this.dataSource.data = result.productList;
          console.log('products : ', this.products);
          this.statusCode=result.status
          this.dataSource.sort = this.sort; // Ensure sort is assigned after data load

        }
      });
    }
  }

  announceSortChange(sortState: Sort) {
    console.log('Sort announce : ', sortState);

    if (sortState.direction) {
      this._liveannouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveannouncer.announce('Sorting cleared');
    }
  }
}
