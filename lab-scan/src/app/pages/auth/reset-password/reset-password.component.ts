import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    protected emailForm: FormControl<string>

    constructor(private readonly authService: AuthService) {

    }

    ngOnInit(): void {
        this.emailForm = new FormControl('', Validators.required)
    }

    resetPassword(): void {
        if(this.emailForm.valid)
            this.authService.resetPassowrd(this.emailForm.value).subscribe(response => console.log(response))
    }

}
