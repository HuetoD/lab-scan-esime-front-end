import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminComponent } from './admin/admin.component';
import { AdminisComponent } from './adminis/adminis.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NewRegComponent } from './new-reg/new-reg.component';
import { QrButtonComponent } from 'src/app/features/qr-button/qr-button.component';
import { FeatureModule } from 'src/app/features/feature.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminisComponent,
    NewRegComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    FeatureModule
  ],
  exports: [
    AdminComponent,
    AdminisComponent,
    NewRegComponent
  ]
})
export class AdminModule { }