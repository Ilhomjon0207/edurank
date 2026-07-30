import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FloatingConfigurator} from "@/app/layout/floating-configurator/floating-configurator";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-access',
    imports: [
        Button,
        FloatingConfigurator,
        RouterLink
    ],
  templateUrl: './access.html',
  styleUrl: './access.scss',
})
export class Access {

}
