import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpErrorResponse } from '@angular/common/http';

import {provideToastr} from "ngx-toastr"

import { provideAnimations  } from "@angular/platform-browser/animations";
import { customInterceptor } from '../services/custom.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([customInterceptor])),provideToastr(
{
  // closeButton:true,
timeOut:1500,
}


  ),provideAnimations(), provideAnimationsAsync(),
  

]
};
