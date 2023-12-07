import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin1Component } from './admin1/admin1.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    Admin1Component
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    Admin1Component
  ]
})
export class AdminModule { }
