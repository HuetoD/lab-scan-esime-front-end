import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../types";
import { Observable, map, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from "../types/token.types";
import { RoleEnum } from "@shared/constants/roles.enum";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly API = `${environment.api_url}/auth`

    private readonly jwtHelper = new JwtHelperService()

    private token: string | null = null

    constructor(private readonly http: HttpClient) { }

    public ping(): Observable<string> {
        return this.http.get(`${this.API}/ping`, { responseType: 'text' })
    }

    public login(request: Partial<LoginRequest>): Observable<string> {
        return this.http.post(`${this.API}/login`, request, { responseType: 'text', observe: 'response' }).pipe(
            tap(response => {
                const token = response.headers.get(environment.header_token_name)
                if (!token)
                    throw new Error('No hemos podido verificar tus credenciales de inicio de sesión')
                localStorage.setItem(
                    environment.header_token_name,
                    token.replace(environment.bearer_name, '')
                )
            }),
            map(response => response.body)
        )
    }

    public logout(): void {
        this.token = null
        localStorage.removeItem(environment.header_token_name)
    }

    public resetPassowrd(request: LoginRequest): Observable<string> {
        request.password = request.password === '' ? null : request.password
        return this.http.post(`${this.API}/reset-password`, request, { responseType: 'text' })
    }

    public encodePassword(password: string) {
        return this.http.get(`${this.API}/encode-password`, { params: { password }, responseType: 'text' })
    }

    public isLoggedIn(): boolean {
        try {
            this.loadToken()
            if (!this.token)
                return false
            return !this.jwtHelper.isTokenExpired(this.token)
        } catch (err) {
            console.error('No user logged in', err)
            return false
        }
    }

    public get _token(): string | null {
        this.loadToken()
        return this.token
    }

    public decodeToken(): Token | null {
        const token = this._token
        return !token ? null : this.jwtHelper.decodeToken(token)
    }

    public hasRole(roles: RoleEnum[]): boolean {
        return this.decodeToken()?.roles?.some(r => roles.includes(r))
    }

    private loadToken(): void {
        this.token = localStorage.getItem(environment.header_token_name)
    }

}