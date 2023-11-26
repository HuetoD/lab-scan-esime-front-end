import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        title:'Login'
    },
    {
        path:'recuperarCuenta',
        component:RecuperarCuentaComponent,
        title:'Recupera tu Cuenta'
    },
    {
        path:'**',
        component:LoginComponent,
    }
];
