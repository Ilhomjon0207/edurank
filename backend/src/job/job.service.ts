import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobDto} from './dto/update-job.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class JobService {

    constructor(private readonly prisma: PrismaService) {
    }

    async create(createJobDto: CreateJobDto) {
        return this.prisma.job.create({
            data: {
                title: createJobDto.title,
                description: createJobDto.description,
                minGpa: createJobDto.minGpa,
                deadline: createJobDto.deadline,
                minExperience: createJobDto.minExperience,

                JobSkill: {
                    create: createJobDto.skills?.map((skill) => ({
                        skillId: skill.skillId,
                        requiredLevel: skill.requiredLevel,
                    })),
                },
            },
            include: {
                JobSkill: {
                    include: {
                        Skill: true,
                    },
                },
            },
        });
    }

    findAll() {


        return this.prisma.job.findMany({
            include: {
                JobSkill: {
                    include: {
                        Skill: true
                    }
                },
                Application: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findOne(id: number) {

        const job = await this.prisma.job.findUnique({
            where: {
                id
            },
            include: {
                JobSkill: {
                    include: {
                        Skill: true
                    }
                }
            }
        })

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        return job;
    }

    async update(id: number, dto: UpdateJobDto) {
        const job = await this.prisma.job.findUnique({
            where: { id },
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        return this.prisma.$transaction(async (tx) => {
            await tx.job.update({
                where: { id },
                data: {
                    title: dto.title,
                    description: dto.description,
                    minGpa: dto.minGpa,
                    deadline: dto.deadline,
                    minExperience: dto.minExperience,
                },
            });

            if (dto.skills) {
                await tx.jobSkill.deleteMany({
                    where: {
                        jobId: id,
                    },
                });

                await tx.jobSkill.createMany({
                    data: dto.skills.map((skill) => ({
                        jobId: id,
                        skillId: skill.skillId,
                        requiredLevel: skill.requiredLevel,
                    })),
                });
            }

            return tx.job.findUnique({
                where: { id },
                include: {
                    JobSkill: {
                        include: {
                            Skill: true,
                        },
                    },
                },
            });
        });
    }

    remove(id: number) {


        return this.prisma.job.delete({
            where: {
                id
            }
        });
    }
}
