import {Component, inject, OnInit, signal} from '@angular/core';
import {RecentSalesWidget} from "@/app/pages/dashboard/components/recentsaleswidget";
import {StatsWidget} from "@/app/shared/components/stats-widget/stats-widget";
import {DashboardService} from "@/app/features/dashboard/dashboard.service";
import {IDashboard, IRankingTop} from "@/app/core/interfaces";
import {TopCandidates} from "@/app/shared/components/top-candidants/top-candidates.component";

@Component({
    selector: 'app-dashboard',
    imports: [
        RecentSalesWidget,
        StatsWidget,
        TopCandidates
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

    private service = inject(DashboardService);
    statistics = signal<IDashboard | null>(null);
    tops = signal<IRankingTop[] | null>(null);

    loadStatistics() {
        this.service.getAllStatic().subscribe({
            next: data => {
                this.statistics.set(data)
            }

        })
    }

    loadTops() {
        this.service.getTopCandidates().subscribe({
            next: data => {
                this.tops.set(data)
            }
        })
    }

    ngOnInit() {
        this.loadStatistics();
        this.loadTops();
    }
}
