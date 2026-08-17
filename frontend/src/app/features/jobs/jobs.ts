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
import { Dialog } from 'primeng/dialog';
import { form, max, min, required, schema } from '@angular/forms/signals';

@Component({
    selector: 'app-jobs',
    imports: [Card, TableModule, Button, IconField, InputIcon, InputText, Tooltip, Dialog],
    templateUrl: './jobs.html',
    styleUrl: './jobs.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Jobs implements OnInit {
    jobs = signal<IJob[]>([]);
    visible = signal(false);
    loading = signal(false);
    jobModel = signal({
        title: '',
        description: '',
        minGpa: undefined as number | undefined,
        minExperience: undefined as number | undefined,
        deadline: undefined as string | undefined,
        skills: [] as {
            skillId: string;
            requiredLevel: number;
        }[]
    });

    jobForm = form(
        this.jobModel,
        schema((path) => {
            required(path.title);

            min(path.minGpa, 0);
            max(path.minGpa, 4);

            min(path.minExperience, 0);
        })
    );
    closeDialog() {
        this.visible.set(false);
    }
    private service = inject(JobsService);

    openDialog() {
        this.visible.set(true);
    }
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
