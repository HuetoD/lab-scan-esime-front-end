import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink, RouterLinkActive, MatCardModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {

}
