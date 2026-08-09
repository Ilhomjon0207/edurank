import {Component, input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-stats-widget',
    imports: [NgClass],
    templateUrl: './stats-widget.html',
    styleUrl: './stats-widget.scss',
    standalone: true
})
export class StatsWidget {
    title = input('');
    count = input(0);
    newsCount = input(0);
    icon = input('');
}
