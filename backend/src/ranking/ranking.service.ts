import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateRankingDto} from './dto/create-ranking.dto';
import {UpdateRankingDto} from './dto/update-ranking.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RankingService {
    constructor(private readonly prisma: PrismaService) {
    }

    create(createRankingDto: CreateRankingDto) {
        return 'This action adds a new ranking';
    }

    async calculate(studentId: number) {

        const student =
            await this.prisma.user.findUnique({
                where: {
                    id: studentId,
                },
                include: {
                    Profile: true,
                    UserSkill: {
                        include: {
                            Skill: true,
                        },
                    },
                    Application: {
                        include: {
                            Job: {
                                include: {
                                    JobSkill: true
                                }
                            }
                        }
                    }
                },
            });


        if (!student) {
            throw new Error('Student not found');
        }


        // =====================
        // GPA SCORE
        // =====================

        const gpa =
            student.Profile?.gpa ?? 0;


        const gpaScore =
            (gpa / 4) * 100;


        // =====================
        // SKILL SCORE
        // =====================

        let skillScore = 0;


        if (student.UserSkill.length > 0) {

            const total =
                student.UserSkill.reduce(
                    (sum, item) =>
                        sum + item.level,
                    0,
                );


            const average =
                total / student.UserSkill.length;


            skillScore =
                (average / 5) * 100;
        }

        let jobMatchScore = 0;

        if (student.Application.length > 0) {
            const applications = student.Application;

            let totalMatch = 0;

            for (const application of applications) {
                const requiredSkills = application.Job.JobSkill;

                if (requiredSkills.length === 0)
                    continue;


                let matched = 0;


                for (const required of requiredSkills) {
                    const hasSkill = student.UserSkill.some(
                        userSkill => userSkill.skillId === required.skillId && userSkill.level >= required.requiredLevel
                    )

                    if (hasSkill) {
                        matched++;
                    }
                }

                totalMatch += matched / requiredSkills.length;
            }

            jobMatchScore = (totalMatch / applications.length) * 100;
        }

        // =====================
        // EXPERIENCE SCORE
        // =====================

        const months =
            student.Profile?.experienceMonths ?? 0;


        const experienceScore =
            Math.min(months / 36, 1) * 100;


        // =====================
        // FINAL SCORE
        // =====================

        const finalScore =
            (gpaScore * 0.40) +
            (skillScore * 0.35) +
            (experienceScore * 0.15) +
            (jobMatchScore * 0.10);


        // =====================
        // SAVE RANKING
        // =====================

        const ranking =
            await this.prisma.ranking.upsert({

                where: {
                    id: studentId,
                },

                update: {
                    score: finalScore,
                },

                create: {

                    studentId,

                    score: finalScore,

                },

            });


        return {
            student: student.name,

            gpaScore:
                Number(gpaScore.toFixed(2)),

            skillScore:
                Number(skillScore.toFixed(2)),

            experienceScore:
                Number(experienceScore.toFixed(2)),

            finalScore:
                Number(finalScore.toFixed(2)),

            ranking,
        };

    }

    async calculateAll() {

        const students = await this.prisma.user.findMany({
            where: {
                role: 'STUDENT',
            },
            select: {
                id: true,
            },
        });

        for (const student of students) {
            await this.calculate(student.id);
        }

        const rankings = await this.prisma.ranking.findMany({
            orderBy: {
                score: 'desc',
            },
        });

        for (let i = 0; i < rankings.length; i++) {
            await this.prisma.ranking.update({
                where: { id: rankings[i].id },
                data: { rank: i + 1 },
            });
        }
        return {
            message: 'Ranking successfully recalculated.',
            processedStudents: students.length,
        };
    }

    findAll() {
        return this.prisma.ranking.findMany();
    }

    async findOne(id: number) {


        const rank = await this.prisma.ranking.findUnique({
            where: {
                id
            }
        });
        if (!rank) {
            throw new NotFoundException('Student not found');
        }

        return rank;
    }

    update(id: number, updateRankingDto: UpdateRankingDto) {
        return `This action updates a #${id} ranking`;
    }

    remove(id: number) {
        return `This action removes a #${id} ranking`;
    }


}
