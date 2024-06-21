import { Component, OnInit, inject } from '@angular/core';
import { Login } from '../../interfaces/login';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from '../../app.routes';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, RouterOutlet,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private loginservice: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      user_email: new FormControl<string>('',[Validators.required,Validators.email]),
      user_password: new FormControl<string>('',Validators.required),
    });
    
  }
  loginObj:Login={
    user_email:"",
    user_password:""
  }
  onLogin() {
    // debugger;
  
   const  tempp=this.loginForm.controls["user_email"]; 
    console.log(tempp && tempp.errors && tempp.errors['required']);
    console.log("inside on login", this.loginForm.controls["user_email"].value);
   
    this.loginObj.user_email= this.loginForm.controls["user_email"].value;
    this.loginObj.user_password=this.loginForm.controls["user_password"].value;
   
    console.log("login form", this.loginForm)
    this.loginservice.login(this.loginObj).subscribe((result: any) => {
      if (result.status == 200) {
        localStorage.setItem('token', result.token);
        //  console.log(result.token)

        this.toastr.success(result.message);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      } else {
        //  alert(result.message)
        this.toastr.error(result.message);
        // this.loginObj.user_email = '';
        // this.loginObj.user_password = '';
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
  }
}
