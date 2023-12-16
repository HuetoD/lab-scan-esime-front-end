import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-adminis',
  templateUrl: './adminis.component.html',
  styleUrls: ['./adminis.component.scss'],
})
export class AdminisComponent implements OnInit {
  datos: any[] = [];
  datosPaginados = new MatTableDataSource<any>(this.datos);
  displayedColumns: string[] = [
    'noComputadora',
    'boleta',
    'tipoIdentificacion',
    'nombreAlumno',
    'observaciones',
    'asistencia',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.generarDatos();
  }

  generarDatos() {
    const tiposIdentificacion = ['Credencial institucional', 'Permiso de Sacadem', 'Prórroga'];
    const nombresAlumno = ['Hernández Arturo', 'Aguilar Max', 'Miranda Kevin', 'Barrera Pedro', 'Ansiola Sergio'];

    for (let i = 1; i <= 10; i++) {
      const boleta = '2020' + this.generarNumeroAleatorio(100000, 999999);
      const fila = {
        noComputadora: this.generarNumeroUnico(30),
        boleta: boleta,
        tipoIdentificacion: tiposIdentificacion[i % tiposIdentificacion.length],
        nombreAlumno: nombresAlumno[i % nombresAlumno.length],
        observaciones: '***',
        asistencia: false,
      };
      this.datos.push(fila);
    }

    // Después de generar los datos, asignamos la fuente de datos al paginador
    this.datosPaginados = new MatTableDataSource<any>(this.datos);
    this.datosPaginados.paginator = this.paginator;
  }

  generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generarNumeroUnico(max: number): number {
    let numero: number;
    do {
      numero = Math.floor(Math.random() * max) + 1;
    } while (this.datos.some((fila) => fila.noComputadora === numero));
    return numero;
  }

  onPageChange(event: any) {
    // Puedes realizar acciones adicionales si es necesario
  }
}






