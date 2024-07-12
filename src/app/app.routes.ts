import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CanactivateGuard } from './canactivate.guard';
import { AddProductComponent } from './pages/add-product/add-product.component';

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
        {path:'dashboard',component:DashboardComponent},   
        {path:'products',component:ProductListComponent}, 
        {path:'addproduct',component:AddProductComponent}  
        
    ],
    
    
},
{
    path:"logout",
    component:LogoutComponent
}

];
