import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Guest1Component } from "./guest1/guest1.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest1',
    pathMatch: 'full'
  },
  {
    path: 'guest1',
    component: Guest1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule { }