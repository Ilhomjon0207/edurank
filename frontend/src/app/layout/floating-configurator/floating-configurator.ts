import {Component, computed, inject, input} from '@angular/core';

import {Button} from "primeng/button";
import {StyleClass} from "primeng/styleclass";
import {LayoutService} from "@/app/layout/service/layout.service";
import {Configurator} from "@/app/layout/configurator/configurator";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-floating-configurator',
    imports: [
        Configurator,
        Button,
        StyleClass,
        NgClass
    ],
  templateUrl: './floating-configurator.html',
  styleUrl: './floating-configurator.scss',
})
export class FloatingConfigurator {
    LayoutService = inject(LayoutService);

    float = input<boolean>(true);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

}
