import {Component, input} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Menu} from "primeng/menu";
import {IRankingTop} from "@/app/core/interfaces";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-top-candidates',
    imports: [ButtonDirective, Menu, NgClass],
    templateUrl: './top-candidates.component.html',
    styleUrl: './top-candidates.component.scss',
    standalone: true
})
export class TopCandidates {
    menu = null;
    candidates = input<IRankingTop[] | null>();
    colors = [
        { bg: 'bg-blue-500', text: 'text-blue-500' },
        { bg: 'bg-purple-500', text: 'text-purple-500' },
        { bg: 'bg-orange-500', text: 'text-orange-500' },
        { bg: 'bg-green-500', text: 'text-green-500' },
        { bg: 'bg-yellow-500', text: 'text-yellow-500' },
        { bg: 'bg-red-500', text: 'text-red-500' },
        { bg: 'bg-cyan-500', text: 'text-cyan-500' },
        { bg: 'bg-pink-500', text: 'text-pink-500' },
        { bg: 'bg-cyan-500', text: 'text-cyan-500' },
        { bg: 'bg-pink-500', text: 'text-pink-500' },
        { bg: 'bg-green-500', text: 'text-green-500' }
    ];
    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
    getRankColor(rank: number | null | undefined) {
        return this.colors[rank ?? 0] ?? this.colors[0];
    }
}
