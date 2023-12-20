import { Component, EventEmitter, OnInit } from '@angular/core';
import { GroupResponse, LaboratoryDTO, SemesterResponse } from '../../../types';
import { GuestService } from 'src/app/services/guest.service';
import { SuperUserService } from 'src/app/services/superuser.service';
import { mergeMap, tap } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  protected semesters: SemesterResponse[] = []

  protected labsMap: Map<LaboratoryDTO, GroupResponse[]>

  protected labs: LaboratoryDTO[] = []

  protected semester?: SemesterResponse | undefined = undefined

  protected group?: GroupResponse | undefined = undefined

  datos: any[] = [];
  columnas: string[] = ['noComputadora', 'tipoIdentificacion', 'nombreAlumno', 'observaciones', 'asistencia', 'actions'];

  constructor(
    private readonly adminService: AdminService,
    private readonly guestService: GuestService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.labsMap = new Map<LaboratoryDTO, GroupResponse[]>()
    this.guestService.getSemesters().pipe(
      tap(semesters => this.semesters = semesters),
      mergeMap(_ => this.guestService.getLabs()),
      tap(labs => labs.forEach(lab => this.labsMap.set(lab, [])))
    ).subscribe()
    this.generarDatos();
  }

  //Stop Propagation
  loadGroups(lab: LaboratoryDTO) {
    if(this.semester) {
      const array = this.labsMap.get(lab)
      if(array) {
      this.guestService.getGroupsOfTheWeek(lab.lab_name, this.semester.semester_id).subscribe(groups => {
          this.labsMap.forEach((value, _) => value.splice(0, value.length))
          array.push(...groups)
        })
      }
    }
    else throw new Error('Debes seleccionar un semestre hdp')
  }

  createNewAttendances() {
    this.router.navigate(['new-reg'])
  }


  generarDatos() {
    const nombres = ["Luis Ansiola", "Pedro Barrera", "Arturo Hernandez", "Kevin Miranda", "Max Aguilar"];
    const tiposIdentificacion = ["Credencial institucional", "Permiso Sacadem", "Prorroga"];

    for (let i = 1; i <= 30; i++) {
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
