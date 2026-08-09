import { Component, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { IRecentApplication, IRecentApplicationResponse } from '@/app/core/interfaces';

@Component({
    selector: 'app-recent-applications',
    imports: [TableModule, CurrencyPipe],
    templateUrl: './recent-applications.html',
    standalone: true,
    styleUrl: './recent-applications.scss'
})
export class RecentApplications {
    applications = input<IRecentApplicationResponse[]>([]);

    ngOnInit() {

    }
}
