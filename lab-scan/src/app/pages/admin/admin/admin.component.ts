import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  datos: any[] = [];
  columnas: string[] = ['noComputadora', 'tipoIdentificacion', 'nombreAlumno', 'observaciones', 'asistencia'];

  constructor() { }

  ngOnInit(): void {
    this.generarDatos();
  }

  generarDatos() {
    const nombres = ["Luis Ansiola", "Pedro Barrera", "Arturo Hernandez", "Kevin Miranda", "Max Aguilar"];
    const tiposIdentificacion = ["Credencial institucional", "Permiso Sacadem", "Prorroga"];

    for (let i = 1; i <= 10; i++) {
      const fila = {
        noComputadora: this.generarNumeroUnico(30),
        tipoIdentificacion: tiposIdentificacion[i % tiposIdentificacion.length],
        nombreAlumno: nombres[i % nombres.length],
        observaciones: '***',
        asistencia: false
      };
      this.datos.push(fila);
    }
  }

  generarNumeroUnico(max: number): number {
    let numero: number;
    do {
      numero = Math.floor(Math.random() * max) + 1;
    } while (this.datos.some(fila => fila.noComputadora === numero));
    return numero;
  }
}
