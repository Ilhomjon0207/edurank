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

  async create(userId: number, dto: CreateApplicationDto) {
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

  findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: number) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: id,
      },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
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

  async remove(id: number, userId: number) {
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

  findMyApplications(userId: number) {
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
    return this.prisma.application.findMany({
      take: limit,
      orderBy: {
        appliedAt: 'desc',
      },
      include: {
        User: true,
        Job: true,
      },
    });
  }
}
