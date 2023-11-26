import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recuperar-cuenta',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive,MatFormFieldModule,MatInputModule, MatButtonModule,MatIconModule],
  templateUrl: './recuperar-cuenta.component.html',
  styleUrl: '../login/login.component.scss'
})
export class RecuperarCuentaComponent {

}
