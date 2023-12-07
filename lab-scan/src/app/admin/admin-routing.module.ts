import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin1Component } from "./admin1/admin1.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin1',
    pathMatch: 'full'
  },
  {
    path: 'admin1',
    component: Admin1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }