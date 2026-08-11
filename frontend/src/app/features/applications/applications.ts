import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { IApplication } from '@/app/core/interfaces';
import { ApplicationsService } from '@/app/features/applications/applications.service';
import { Card } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ApplicationStatus } from '@/app/core/enums';
import { Tag } from 'primeng/tag';
import { Severety } from '@/app/core/types';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-applications',
    imports: [Card, TableModule, DatePipe, IconFieldModule, InputIconModule, InputTextModule, FormsModule, Tag, Button, Tooltip],
    templateUrl: './applications.html',
    styleUrl: './applications.scss'
})
export class Applications implements OnInit {
    applications = signal<IApplication[]>([]);

    private service = inject(ApplicationsService);

    loadApplications() {
        this.service.getApplications().subscribe({
            next: (data) => {
                this.applications.set(data);
            }
        });
    }
    dt1 = viewChild('dt1');
    globalFilter = '';

    getStatusLabel(status: ApplicationStatus): { label: string; severity: Severety } {
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

    ngOnInit(): void {
        this.loadApplications();
    }
}
