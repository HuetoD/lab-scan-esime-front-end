import { Component } from '@angular/core';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.scss']
})
export class Table1Component {
  dataSource = ELEMENT_DATA;

  columnas: string[] = ['correo', 'contrasena', 'editar', 'eliminar'];

  editarFila(element: any): void {
    console.log('Editar', element);
  }

  eliminarFila(element: any): void {
    console.log('Eliminar', element);
  }

  crearFila(): void {
    console.log('Crear');
  }
}

const ELEMENT_DATA: any[] = [
  { correo: 'alancr1@ipn.com', contrasena: '*****' },
  { correo: 'arturohv2@ipn.com', contrasena: '*****' },
  { correo: 'max3@ipn.com', contrasena: '*****' },
  { correo: 'kevin4@ipn.com', contrasena: '*****' },
  { correo: 'jesus5@ipn.com', contrasena: '*****' },
  { correo: 'will6@ipn.com', contrasena: '*****' }
];



