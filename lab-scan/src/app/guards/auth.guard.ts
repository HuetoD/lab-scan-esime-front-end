import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { RoleEnum } from "@shared/constants/roles.enum";

export const AuthGuard = <R extends RoleEnum[]>(...accepted: R) => async () => {
    const authService = inject(AuthService)
    const router = inject(Router)
    if (authService.isLoggedIn())
        return authService.hasRole(accepted)

    await router.navigate(['login'])
    return false

}