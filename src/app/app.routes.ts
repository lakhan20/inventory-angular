import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
{
    path:'',pathMatch:"full",
   redirectTo:"login"
},
{
    path:'login',component:LoginComponent
},
{
    path:'',component:LayoutComponent,
    children:
    [
        {path:'dashboard',component:DashboardComponent,canActivateChild:[authGuard]},   
        {path:'products',component:ProductListComponent,canActivateChild:[authGuard]},   
    
    ]
},
{
    path:"logout",
    component:LogoutComponent
}

];
