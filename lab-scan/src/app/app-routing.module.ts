import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleEnum } from '@shared/constants/roles.enum';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
        canMatch: [AuthGuard(RoleEnum.ADMIN)],
    },
    {
        path: 'superuser',
        loadChildren: () => import('./pages/superuser/superuser.module').then(m => m.SuperuserModule),
        canMatch: [AuthGuard(RoleEnum.SUPERUSER)]
    },
    {
        path: 'guest',
        loadChildren: () => import('./pages/guest/guest.module').then(m => m.GuestModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
