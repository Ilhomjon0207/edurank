import { Component, inject, OnInit, signal } from '@angular/core';
import { StatsWidget } from '@/app/shared/components/stats-widget/stats-widget';
import { DashboardService } from '@/app/features/dashboard/dashboard.service';
import { IDashboard, IRankingTop, IRecentApplication, IRecentApplicationResponse } from '@/app/core/interfaces';
import { TopCandidates } from '@/app/shared/components/top-candidants/top-candidates.component';
import { RecentApplications } from '@/app/shared/components/recent-applications/recent-applications';
import { ApplicationStatus } from '@/app/core/enums';
import { Linter } from 'eslint';


@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, TopCandidates, RecentApplications],
    templateUrl: './dashboard.html',
    standalone: true,
    styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
    private service = inject(DashboardService);
    statistics = signal<IDashboard | null>(null);
    tops = signal<IRankingTop[] | null>(null);
    recentApplications = signal<IRecentApplicationResponse[] >([]);
    loadStatistics() {
        this.service.getAllStatic().subscribe({
            next: (data) => {
                this.statistics.set(data);
            }
        });
    }

    loadTops() {
        this.service.getTopCandidates().subscribe({
            next: (data) => {
                this.tops.set(data);
            }
        });
    }

    loadRecentApplications() {
        this.service.getRecentApplications().subscribe({
            next: (data) => {
            this.recentApplications.set(data)
            }
        })
    }
    ngOnInit() {
        this.loadRecentApplications()
        this.loadStatistics();
        this.loadTops();
    }
}
