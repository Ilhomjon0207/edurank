import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IRecentApplicationResponse } from '@/app/core/interfaces';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'app-recent-applications',
    imports: [TableModule, Tag],
    templateUrl: './recent-applications.html',
    standalone: true,
    styleUrl: './recent-applications.scss'
})
export class RecentApplications {
    applications = input<IRecentApplicationResponse[]>([]);
    getStatusSeverity(status: string) {
        switch (status) {
            case 'ACCEPTED':
                return 'success';

            case 'REJECTED':
                return 'danger';

            case 'PENDING':
                return 'warn';

            default:
                return 'secondary';
        }
    }
    ngOnInit() {}
}
