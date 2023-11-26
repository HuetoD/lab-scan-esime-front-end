import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
interface documento {
  value: string;
  viewValue: string;
}
interface laboratorio{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-laboratorios',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './laboratorios.component.html',
  styleUrl: './laboratorios.component.scss'
})
export class LaboratoriosComponent {
  selectedValue!: string;

  documentos: documento[] = [
    {value: 'identificacion', viewValue: 'IDENTIFICACIÓN'},
    {value: 'prorroga', viewValue: 'PRORROGA'},
    {value: 'sacadem', viewValue: 'SACADEM'},
  ];

  laboratorios: laboratorio[]=[
    {value: '1', viewValue: 'Laboratorio 1'},
    {value: '2', viewValue: 'Laboratorio 2'}
  ]
}
