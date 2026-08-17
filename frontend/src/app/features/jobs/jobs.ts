import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { IJob } from '@/app/core/interfaces';
import { JobsService } from '@/app/features/jobs/jobs.service';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-jobs',
    imports: [Card, TableModule, Button, IconField, InputIcon, InputText, Tooltip],
    templateUrl: './jobs.html',
    styleUrl: './jobs.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Jobs implements OnInit {
    jobs = signal<IJob[]>([]);
    private service = inject(JobsService);

    loadJobs(): void {
        this.service.getAllJobs().subscribe({
            next: (jobs: IJob[]) => {
                this.jobs.set(jobs);
            }
        });
    }
    ngOnInit() {
        this.loadJobs();
    }
}
