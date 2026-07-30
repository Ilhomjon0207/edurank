import {Component, computed, inject, signal} from '@angular/core';
import {Button} from "primeng/button";
import {Checkbox} from "primeng/checkbox";
import {FloatingConfigurator} from "@/app/layout/floating-configurator/floating-configurator";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Password} from "primeng/password";
import {LayoutService} from "@/app/layout/service/layout.service";
import {Image} from "primeng/image";
import {AuthService} from "@/app/core/services/auth.service";
import {ILoginRequest} from "@/app/core/interfaces";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    imports: [
        Button,
        Checkbox,
        FloatingConfigurator,
        FormsModule,
        InputText,
        Password,
        Image,
        ReactiveFormsModule
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;
    private layoutService = inject(LayoutService);
    private authService = inject(AuthService);
    private router=inject(Router)
    isDark = computed(() => this.layoutService.layoutConfig().darkTheme);



    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

    login() {
        const request = this.loginForm.getRawValue() as ILoginRequest;
        console.log(request);
        this.authService.login(request).subscribe({
            next:(res)=>{
                this.router.navigateByUrl('/');
            }
        })
    }
}
