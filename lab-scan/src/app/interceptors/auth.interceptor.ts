import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PUBLIC_URLS } from '@shared/constants/public-urls';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private messageService : MessageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRequestOnPubliUrl(request))
            if (!this.authService.isLoggedIn())
                this.navigateToLogin()
            else
                request = this.setTokenInHeader(request)
        console.log('request: ', request)
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(JSON.parse(error.error) )
                if (error.error)
                    this.messageService.add({severity: 'error', summary: JSON.parse(error.error).message, detail: JSON.parse(error.error).details})
                return throwError(() => error)
            })
        )
    }

    private navigateToLogin(): void { this.router.navigate(['auth/login']) }

    private setTokenInHeader(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            withCredentials: true,
            setHeaders: {
                "Authorization": environment.bearer_name.concat(this.authService._token),
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    }

    private isRequestOnPubliUrl(request: HttpRequest<any>): boolean {
        return PUBLIC_URLS.find(url => request.url.includes(!url.includes("**") ? url : url.split('/')[0])) !== undefined
    }

    private parse(error: HttpErrorResponse): string {
        if (!error.error)
            return 'Error desconocido'

        if (error.error.message)
            if (Array.isArray(error.error.message))
                if (error.error.message.length > 0)
                    return error.error.message[0]
                else
                    return 'Error desconocido'

            else
                return error.error.message
        else
            return 'Error desconocido'
    }

}