import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IRecentApplicationResponse } from '@/app/core/interfaces';

@Component({
    selector: 'app-recent-applications',
    imports: [TableModule],
    templateUrl: './recent-applications.html',
    standalone: true,
    styleUrl: './recent-applications.scss'
})
export class RecentApplications {
    applications = input<IRecentApplicationResponse[]>([]);
    ngOnInit() {}
}
