import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: "", component: NavComponent, children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "add-customer", component: AddCustomerComponent },
      { path: "add-category", component: CategoryComponent },
      { path: "add-product", component: ProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
