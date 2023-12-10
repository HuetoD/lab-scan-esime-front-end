import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from "./guest/guest.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FeatureModule } from 'src/app/features/feature.module';

@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    GuestRoutingModule,
    CommonModule,

    FeatureModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    GuestComponent
  ],
})
export class GuestModule {}