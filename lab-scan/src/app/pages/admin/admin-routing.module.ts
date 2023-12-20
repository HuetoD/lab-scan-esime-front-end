import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AdminisComponent } from './adminis/adminis.component';
import { NewRegComponent } from "./new-reg/new-reg.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'adminis',
    component: AdminisComponent
  },
  {
    path: 'new-reg',
    component: NewRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }