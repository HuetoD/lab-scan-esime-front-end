import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';
import { CrudCuentasComponent } from './crud-cuentas/crud-cuentas.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';

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
        path:'crudCrearCuentas',
        component:CrudCuentasComponent,
        title:'Crud Cuentas'
    },
    {
        path:'laboratorios',
        component:LaboratoriosComponent,
        title:'Agregar Alumno'
    },
    {
        path:'**',
        component:LoginComponent,
    }
];
