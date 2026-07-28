import {Component, inject} from '@angular/core';

import {RouterLink} from "@angular/router";
import {StyleClass} from "primeng/styleclass";
import {MenuItem} from "primeng/api";
import {LayoutService} from "@/app/layout/service/layout.service";
import {NgClass} from "@angular/common";
import {Configurator} from "@/app/layout/configurator/configurator";

@Component({
  selector: 'app-topbar',
    imports: [
        Configurator,
        RouterLink,
        StyleClass,
        NgClass
    ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
    items!: MenuItem[];

    layoutService = inject(LayoutService);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
