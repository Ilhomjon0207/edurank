import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobDto} from './dto/update-job.dto';
import {PrismaService} from "../prisma/prisma.service";
import {CreateJobSkillDTO} from "./dto/create-job-skill.dto";

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
            where: {id},
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        return this.prisma.$transaction(async (tx) => {
            await tx.job.update({
                where: {id},
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
                where: {id},
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

    async addJobSkill(jobId: number, dto: CreateJobSkillDTO) {

        const job = await this.prisma.job.findUnique({
            where: {
                id: jobId
            }
        })

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        const skill = await this.prisma.skill.findUnique({
            where: {
                id: dto.skillId,
            }
        })

        if (!skill) {
            throw new NotFoundException('Skill not found');
        }

        const exists = await this.prisma.jobSkill.findUnique({
            where: {
                jobId_skillId: {
                    jobId: jobId,
                    skillId: dto.skillId,
                }
            }
        })

        if (exists) {
            throw new NotFoundException('Skill already added');
        }

        return this.prisma.jobSkill.create({
            data: {
                jobId: jobId,
                skillId: dto.skillId,
                requiredLevel: dto.requiredLevel,
            },
            include: {
                Skill: true,
            }
        })
    }

    async getJobSkills(jobId: number) {
        const job = await this.prisma.job.findUnique({
            where: {
                id: jobId,
            }
        })

        if (!job) {
            throw new NotFoundException('Job not found');

        }

        return this.prisma.jobSkill.findMany({
            where: {
                jobId: jobId,
            },
            include: {
                Skill: true,
            }
        })
    }

    async updateJobSkill(jobId: number, skillId: number, requiredLevel: number) {

        const jobSkill = await this.prisma.jobSkill.findUnique({
            where: {
                jobId_skillId: {
                    jobId: jobId,
                    skillId: skillId,
                }
            }
        })

        if (!jobSkill) {
            throw new NotFoundException('Job Skill not found');
        }

        return this.prisma.jobSkill.update({
            where: {
                jobId_skillId: {
                    jobId: jobId,
                    skillId: skillId,
                }
            },
            data: {
                requiredLevel: requiredLevel,
            },
            include: {
                Skill: true,
            }
        })


    }
    async removeJobSkill(
        jobId: number,
        skillId: number,
    ) {

        const jobSkill = await this.prisma.jobSkill.findUnique({
            where: {
                jobId_skillId: {
                    jobId,
                    skillId,
                },
            },
        });

        if (!jobSkill) {
            throw new NotFoundException('Job skill not found');
        }

        return this.prisma.jobSkill.delete({
            where: {
                jobId_skillId: {
                    jobId,
                    skillId,
                },
            },
        });
    }
}
