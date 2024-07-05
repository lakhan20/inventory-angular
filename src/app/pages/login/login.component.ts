import { Component, OnInit, inject, ErrorHandler } from '@angular/core';
import { Login } from '../../interfaces/login';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) // private httperrorresponse:HttpErrorResponse
  {
    this.loginForm = new FormGroup({
      user_email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      user_password: new FormControl<string>('', Validators.required),
    });
  }
  loginObj: Login = {
    user_email: '',
    user_password: '',
  };

  resp: any;
  onLogin() {
    if (!this.loginForm.valid) {
      this.toastr.warning('Please Enter valid input');
      return;
    }

    // debugger;

    //const  tempp=this.loginForm.controls["user_email"];
    //  console.log(tempp && tempp.errors && tempp.errors['required']);
    // console.log("inside on login", this.loginForm.controls["user_email"].value);

    this.loginObj.user_email = this.loginForm.controls['user_email'].value;
    this.loginObj.user_password = this.loginForm.controls[
      'user_password'
    ].value;

    // console.log("login form", this.loginForm)
    //  this.resp= this.loginservice.login(this.loginObj);

    this.loginservice
      .login(this.loginObj)
      .pipe(catchError((error) => this.handleError(error, this.toastr)))
      .subscribe((result: any) => {
        if (result.status == 200) {
          console.log('result  : ', result);

          localStorage.setItem('token', result.token);

          this.toastr.success(result.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        } else {
          this.toastr.error(result.message);
        }
      });
    // console.log("response",response);
    // console.log("inside onlogin", this.loginObj);

    //   this.http.post('https://localhost:7045/api/Login',this.loginObj).subscribe((res:any)=>{
    //     // debugger;
    //     console.log("resss : ",res);
    //     if(res.status==200){
    //       console.log(res);
    //       alert(res.message);
    //     }
    //     else{
    // alert(res.message);
    //     }
    //   })
    // console.log("errr resp ::::  ",this.httperrorresponse);
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
    return throwError(() => new Error(errorMessage));
  }
}
