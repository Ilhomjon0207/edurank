import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { IJobsList, IRankingTop } from '@/app/core/interfaces';
import { Card } from 'primeng/card';
import { RankingService } from '@/app/features/ranking/ranking.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-ranking',
    imports: [Select, Button, Card, TableModule, Toast, Dialog, Tag, Tooltip, IconField, InputIcon, InputText],
    templateUrl: './ranking.html',
    styleUrl: './ranking.scss',
    standalone: true,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ranking implements OnInit {
    loading = signal(false);
    jobs = signal<IJobsList[]>([]);
    selectedJobId = signal('');
    selectedJob = signal<string>('');
    limit = signal(0);
    candidates = signal<IRankingTop[]>([]);
    private service = inject(RankingService);
    private messageService = inject(MessageService);
    calculate() {
        this.loading.set(true);

        this.service.calculatingByJob(this.selectedJobId()).subscribe({
            next: () => {
                this.loading.set(false);
                this.loadCandidates();
                this.messageService.add({
                    severity: 'success',
                    detail: 'Ranking calculate successfully.'
                });
                const selectedJob = this.jobs().filter((job) => job.id === this.selectedJobId());
                this.selectedJob.set(selectedJob[0].title);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    onJobChange(id: string) {
        this.selectedJobId.set(id);
    }
    setLimit(limit: number) {
        this.limit.set(limit);
    }

    selectedCandidate = signal<IRankingTop | null>(null);
    candidateDialogVisible = signal(false);

    openCandidate(candidate: IRankingTop): void {
        this.selectedCandidate.set(candidate);
        this.candidateDialogVisible.set(true);
    }

    closeCandidate(): void {
        this.candidateDialogVisible.set(false);
        this.selectedCandidate.set(null);
    }
    loadJobs() {
        this.service.getJobs().subscribe({
            next: (data) => {
                this.jobs.set(data);
            }
        });
    }

    ngOnInit() {
        this.loadJobs();
    }

    loadCandidates() {
        this.service.getCandidates(this.selectedJobId()).subscribe({
            next: (data) => {
                this.candidates.set(data);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    detail: err.message
                });
            }
        });
    }
}
