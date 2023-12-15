import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AdminisComponent } from './adminis/adminis.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'adminis',
    component: AdminisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }