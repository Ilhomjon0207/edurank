import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Button, ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {FloatingConfigurator} from "@/app/layout/floating-configurator/floating-configurator";
@Component({
  selector: 'app-error',
    imports: [
        FloatingConfigurator,
        Button
    ],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {

}
