import {Component, computed, inject} from '@angular/core';

import {Router, RouterLink} from "@angular/router";
import {StyleClass} from "primeng/styleclass";
import {MenuItem} from "primeng/api";
import {LayoutService} from "@/app/layout/service/layout.service";
import {NgClass} from "@angular/common";
import {Image} from "primeng/image";
import {AuthService} from "@/app/core/services/auth.service";

@Component({
  selector: 'app-topbar',
    imports: [
        RouterLink,
        StyleClass,
        NgClass,
        Image
    ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
    items!: MenuItem[];

    layoutService = inject(LayoutService);
    isDark = computed(() =>
        this.layoutService.layoutConfig().darkTheme
    );
    private authService = inject(AuthService);
    private router=inject(Router);
    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigateByUrl('/auth/login');
            }
        });
    }

}
