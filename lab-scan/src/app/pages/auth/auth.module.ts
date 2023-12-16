import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from "./login/login.component";
import { AuthRouting } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/interceptors/auth.interceptor";


@NgModule({
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
    ],
    imports: [
        AuthRouting,
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
})
export class AuthModule {

}