import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Table1Component } from './tables/table1/table1.component';

const routes: Routes = [
  {path: '', redirectTo: 'table1', pathMatch: 'full'},
  { path: 'table1', component: Table1Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperuserRoutingModule {}

