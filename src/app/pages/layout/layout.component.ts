import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { ValidatetokenService } from '../../../services/validatetoken.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  constructor(private router:Router,private validateTokenService:ValidatetokenService,private toastr:ToastrService){
  }
  ngOnInit(){
    this.validateTokenService.validateToken()
    .pipe(catchError((error) => this.handleError(error, this.toastr)))
    .subscribe((result:any)=>{
      if(result==null){
        this.toastr.error("Please Login Again.!");

        this.router.navigate(['/']);
 
      }
    })
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
    console.log("errorMessage layout : ",error);
    
    // toastr.error(error.error.message);
    this.router.navigate(['/login']);
    return throwError(() => new Error(error.error.message));
  }

}
