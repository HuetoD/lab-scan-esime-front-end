import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
