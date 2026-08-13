import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateApplicationDto) {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${dto.jobId} not found`);
    }

    if (job.deadline && job.deadline < new Date()) {
      throw new BadRequestException('The application deadline has passed');
    }

    const existingApplication = await this.prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId: dto.jobId,
        },
      },
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied for this job');
    }

    return this.prisma.application.create({
      data: {
        userId,
        jobId: dto.jobId,
      },
      include: {
        Job: true,
      },
    });
  }

  async findAll() {
    const applications = await this.prisma.application.findMany({
      select: {
        id: true,
        appliedAt: true,
        status: true,
        Job: {
          select: {
            title: true,
            id: true,
          },
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return applications.map((application) => ({
      id: application.id,
      userId: application.User.id,
      userName: application.User.name,
      userEmail: application.User.email,
      jobId: application.Job.id,
      jobTitle: application.Job.title,
      status: application.status,
      appliedAt: application.appliedAt,
    }));
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },

      include: {
        User: {
          include: {
            Profile: true,
            UserSkill: {
              include: {
                Skill: true,
              },
            },
          },
        },

        Job: {
          include: {
            JobSkill: {
              include: {
                Skill: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return {
      id: application.id,
      status: application.status,
      appliedAt: application.appliedAt,

      student: {
        id: application.User.id,
        name: application.User.name,
        email: application.User.email,

        profile: application.User.Profile,

        skills: application.User.UserSkill.map((item) => ({
          id: item.Skill.id,
          name: item.Skill.name,
          level: item.level,
        })),
      },

      job: {
        id: application.Job.id,
        title: application.Job.title,
        description: application.Job.description,
        minGpa: application.Job.minGpa,
        minExperience: application.Job.minExperience,
        deadline: application.Job.deadline,

        skills: application.Job.JobSkill.map((item) => ({
          id: item.Skill.id,
          name: item.Skill.name,
          requiredLevel: item.requiredLevel,
        })),
      },
    };
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: id,
      },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return this.prisma.application.update({
      where: {
        id: id,
      },
      data: {
        status: updateApplicationDto.status,
      },
    });
  }

  async remove(id: string, userId: string) {
    const application = await this.prisma.application.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return this.prisma.application.delete({
      where: {
        id,
      },
    });
  }

  findMyApplications(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },
      include: {
        Job: true,
      },
    });
  }

  async getRecentApplication(limit: number = 5) {
    const recentApplications = await this.prisma.application.findMany({
      take: limit,
      orderBy: {
        appliedAt: 'desc',
      },
      include: {
        User: {
          select: {
            name: true,
            id: true,
          },
        },
        Job: {
          select: {
            title: true,
          },
        },
      },
    });

    return recentApplications.map((recentApplication) => ({
      id: recentApplication.id,
      userId: recentApplication.User.id,
      userName: recentApplication.User.name,
      jobTitle: recentApplication.Job.title,
      status: recentApplication.status,
    }));
  }
}
