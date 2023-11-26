import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
export interface Usuarios {
  correo:String,
  password:String,
  edit:boolean,
  delete:boolean
}
const ELEMENT_DATA: Usuarios[] = [
  {correo:'usuario@ipn.mx',password:'123',edit:false,delete:false},
];
@Component({
  selector: 'app-crud-cuentas',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive, MatButtonModule, MatTableModule],
  templateUrl: './crud-cuentas.component.html',
  styleUrl: './crud-cuentas.component.scss'
})
export class CrudCuentasComponent {
  displayedColumns: string[] = ['correo','password','edit','delete'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<Usuarios>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }
  editar(){

  }
}
