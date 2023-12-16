import { Component, OnInit } from '@angular/core';
import { ModelFormGroup } from '@shared/constants';
import { LoginRequest } from '../../../types';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    protected loginForm: ModelFormGroup<LoginRequest>

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.nonNullable.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    login(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe()
        }
    }

    navigateToResetPassword(): void {
        this.router.navigate(['auth/reset-password'])
    }

}
