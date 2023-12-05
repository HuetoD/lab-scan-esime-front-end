import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperuserRoutingModule } from './superuser-routing.module';
import { Table1Component } from './tables/table1/table1.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [Table1Component],
  imports: [CommonModule, SuperuserRoutingModule, MatTableModule],
})
export class SuperuserModule {}
