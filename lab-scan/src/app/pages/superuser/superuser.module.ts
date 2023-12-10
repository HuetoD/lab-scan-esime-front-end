import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperuserRoutingModule } from './superuser-routing.module';
import { TableComponent } from './tables/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,

    SuperuserRoutingModule, 
    
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SuperuserModule {}
