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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SeemoreproductdetailsComponent } from '../seemoreproductdetails/seemoreproductdetails.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Array<ProductList> = [];
  categories: Array<Category> = [];
  dataSource = new MatTableDataSource<ProductList>();
  displayedColumns: string[] = [
    'product_id',
    'product_name',
    'product_price',
    'see_more',
  ];
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
    this.productService
      .getAllproducts()
      .pipe(catchError((error) => this.handleError(error, this.toastr)))
      .subscribe((result: any) => {
        this.products = result.products;

        console.log('inside result : ', this.products);
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort; // Ensure sort is assigned after data load
      });

    this.categoryService.getAllCategories().subscribe((categoryResp: any) => {
      this.categories = categoryResp.categories;

      console.log(this.categories);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog(product_id: any) {
    // console.log("see more",product_id);
    const dialogRef = this.dialog.open(SeemoreproductdetailsComponent, {
      data: { product_id: product_id },
    });

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

  getProductByCategory(catid: any) {
    console.log('catid', catid);
    this.productfilterService
      .filterByCategory(catid)
      .subscribe((result: any) => {
        console.log('result : ', result.status);

        if (result.status == 200) {
          // console.log("products: ",result.productList);

          this.products = result.productList;
          this.dataSource.data = result.productList;
          console.log('products : ', this.products);
        }
      });
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
