import {Component, computed, inject} from '@angular/core';
import {Button} from "primeng/button";
import {Checkbox} from "primeng/checkbox";
import {FloatingConfigurator} from "@/app/layout/floating-configurator/floating-configurator";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Password} from "primeng/password";
import {RouterLink} from "@angular/router";
import {LayoutService} from "@/app/layout/service/layout.service";
import {Image} from "primeng/image";

@Component({
  selector: 'app-login',
    imports: [
        Button,
        Checkbox,
        FloatingConfigurator,
        FormsModule,
        InputText,
        Password,
        RouterLink,
        Image
    ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;
    private layoutService=inject(LayoutService);
    isDark=computed(()=>this.layoutService.layoutConfig().darkTheme);
}
