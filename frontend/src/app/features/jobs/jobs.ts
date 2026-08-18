import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { IJob, ISkills } from '@/app/core/interfaces';
import { JobsService } from '@/app/features/jobs/jobs.service';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
import { form, max, min, required, schema, Field } from '@angular/forms/signals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Severity } from '@/app/core/types';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
    selector: 'app-jobs',
    imports: [Card, TableModule, Button, IconField, InputIcon, InputText, Tooltip, ConfirmDialogModule, Dialog, ReactiveFormsModule, DatePicker, Textarea, InputNumber, Select, FormsModule, Field, Toast, DatePipe, Tag],
    templateUrl: './jobs.html',
    styleUrl: './jobs.scss',
    standalone: true,
    providers: [MessageService, ConfirmationService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Jobs implements OnInit {
    jobs = signal<IJob[]>([]);
    visible = signal(false);
    loading = signal(false);
    today = new Date();
    skillsOptions = signal<ISkills[]>([]);
    skills = signal<ISkills[]>([]);
    jobModel = signal({
        title: '',
        description: '',
        minGpa: 0,
        minExperience: 0,
        deadline: '',
        skills: [] as {
            skillId: string;
            requiredLevel: number;
        }[]
    });
    skillLevels = signal([
        { label: '1 — Beginner', value: 1 },
        { label: '2 — Basic', value: 2 },
        { label: '3 — Intermediate', value: 3 },
        { label: '4 — Advanced', value: 4 },
        { label: '5 — Expert', value: 5 }
    ]);
    private service = inject(JobsService);
    private messageService = inject(MessageService);
    private confirmService = inject(ConfirmationService);
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

    openDialog() {
        this.visible.set(true);
    }
    addSkill() {
        this.jobModel.update((model) => ({
            ...model,
            skills: [
                ...model.skills,
                {
                    skillId: '',
                    requiredLevel: 1
                }
            ]
        }));
    }
    removeSkill(index: number) {
        this.jobModel.update((model) => ({
            ...model,
            skills: model.skills.filter((_, i) => i !== index)
        }));
    }
    createJob() {
        this.service.createJob(this.jobForm().value()).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'Job created successfully.'
                });
                this.jobForm().reset();
                this.visible.set(false);
                this.loadJobs();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Job created failed.'
                });
            }
        });
    }

    deleteJob(id: string, event: Event) {
        this.confirmService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want delete this job?',
            header: 'Delete job',
            closable: true,
            blockScroll: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
                outlined: true
            },
            accept: () => {
                this.service.deleteJob(id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'You delete this job!' });
                        this.loadJobs();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Job deleted failed.'
                        });
                    }
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000
                });
            }
        });
    }
    getJobStatus(status: boolean): { label: string; type: Severity } {
        if (status) {
            return { label: 'Active', type: 'success' };
        } else {
            return { label: 'Inactive', type: 'danger' };
        }
    }
    loadJobs(): void {
        this.service.getAllJobs().subscribe({
            next: (jobs: IJob[]) => {
                this.jobs.set(jobs);
            }
        });
    }

    loadSkills() {
        this.service.getSkills().subscribe({
            next: (skills: ISkills[]) => {
                this.skillsOptions.set(skills);
            },
            error: (err: Error) => {
                this.messageService.add({
                    severity: 'error',
                    detail: err.message
                });
            }
        });
    }
    ngOnInit() {
        this.loadJobs();
        this.loadSkills();
    }
}
