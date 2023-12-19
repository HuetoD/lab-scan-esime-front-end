import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    protected emailControl: FormControl<string>

    constructor(private readonly authService: AuthService) { }

    ngOnInit(): void {
        this.emailControl = new FormControl<string>('', Validators.required)
    }

    public resetPassword(): void {
        if (this.emailControl.valid)
            this.authService.resetPassowrd(this.emailControl.value)
                .subscribe(response => alert(response))
    }

}
