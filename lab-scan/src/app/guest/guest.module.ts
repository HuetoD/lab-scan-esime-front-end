import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { Guest1Component } from "./guest1/guest1.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    Guest1Component
  ],
  imports: [
    GuestRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    Guest1Component
  ],
})
export class GuestModule {}