import {Component, computed, effect, inject} from '@angular/core';

import {RouterOutlet} from "@angular/router";
import {LayoutService} from "@/app/layout/service/layout.service";
import {NgClass} from "@angular/common";
import {Topbar} from '../topbar/topbar'
import {Sidebar} from "@/app/layout/sidebar/sidebar";
import {Footer} from "@/app/layout/footer/footer";

@Component({
  selector: 'app-main-layout',
    imports: [
        RouterOutlet,
        NgClass,
        Topbar,
        Sidebar,
        Footer
    ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
    layoutService = inject(LayoutService);

    constructor() {
        effect(() => {
            const state = this.layoutService.layoutState();
            if (state.mobileMenuActive) {
                document.body.classList.add('blocked-scroll');
            } else {
                document.body.classList.remove('blocked-scroll');
            }
        });
    }

    containerClass = computed(() => {
        const config = this.layoutService.layoutConfig();
        const state = this.layoutService.layoutState();
        return {
            'layout-overlay': config.menuMode === 'overlay',
            'layout-static': config.menuMode === 'static',
            'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
            'layout-overlay-active': state.overlayMenuActive,
            'layout-mobile-active': state.mobileMenuActive
        };
    })
}
