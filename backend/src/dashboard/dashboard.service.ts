import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ApplicationStatus, Role} from "@prisma/client";

@Injectable()
export class DashboardService {

    constructor(private prisma: PrismaService) {
    }


    async statistics() {

        const students = await this.prisma.user.count({
            where: {
                role: Role.STUDENT,
            }
        });


        const jobs = await this.prisma.job.count();

        const applications = await this.prisma.application.count();

        const acceptedApplications = await this.prisma.application.count({
            where: {
                status: ApplicationStatus.ACCEPTED,
            }
        });

        const pendingApplications =
            await this.prisma.application.count({
                where: {
                    status: ApplicationStatus.PENDING,
                },
            });


        const rejectedApplications =
            await this.prisma.application.count({
                where: {
                    status: ApplicationStatus.REJECTED,
                },
            });


        const ranking =
            await this.prisma.ranking.aggregate({

                _avg: {
                    score: true,
                },

                _max: {
                    score: true,
                },

                _min: {
                    score: true,
                },

            });


        return {

            students,

            jobs,

            applications,

            averageScore:
                Number(
                    ranking._avg.score?.toFixed(2) ?? 0
                ),

            highestScore:
                Number(
                    ranking._max.score?.toFixed(2) ?? 0
                ),

            lowestScore:
                Number(
                    ranking._min.score?.toFixed(2) ?? 0
                ),


            acceptedApplications,

            pendingApplications,

            rejectedApplications,

        };


    }
}
