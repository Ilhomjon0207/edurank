import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { IApplication, IApplicationDetail } from '@/app/core/interfaces';
import { ApplicationsService } from '@/app/features/applications/applications.service';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ApplicationStatus } from '@/app/core/enums';
import { Tag } from 'primeng/tag';
import { Severity } from '@/app/core/types';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-applications',
    imports: [Card, TableModule, DatePipe, IconFieldModule, InputIconModule, InputTextModule, FormsModule, Tag, Button, Tooltip, Dialog],
    templateUrl: './applications.html',
    standalone: true,
    styleUrl: './applications.scss'
})
export class Applications implements OnInit {
    applications = signal<IApplication[]>([]);

    detailApplication = signal<IApplicationDetail>({} as IApplicationDetail);
    private service = inject(ApplicationsService);

    visibleDetails = signal(false);
    loadApplications() {
        this.service.getApplications().subscribe({
            next: (data) => {
                this.applications.set(data);
            }
        });
    }
    dt1 = viewChild('dt1');
    globalFilter = '';

    getStatusLabel(status: ApplicationStatus): { label: string; severity: Severity } {
        switch (status) {
            case ApplicationStatus.PENDING:
                return {
                    label: 'Pending',
                    severity: 'warn'
                };

            case ApplicationStatus.ACCEPTED:
                return {
                    label: 'Accepted',
                    severity: 'success'
                };

            case ApplicationStatus.REJECTED:
                return {
                    label: 'Rejected',
                    severity: 'danger'
                };

            default:
                return {
                    label: 'Unknown',
                    severity: 'secondary'
                };
        }
    }

    openDetails(id: string) {
        this.visibleDetails.set(true);
        this.service.getApplicationById(id).subscribe({
            next: (data) => {
                this.detailApplication.set(data);
            },
            error: (error) => {
                console.error('Error fetching application details:', error);
            }
        });
    }
    closeDetails() {
        this.visibleDetails.set(false);
        this.detailApplication.set({} as IApplicationDetail);
    }
    ngOnInit(): void {
        this.loadApplications();
    }
}
