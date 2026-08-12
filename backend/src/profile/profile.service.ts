import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    const exists = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (exists) {
      throw new ConflictException('Profile already exists');
    }
    return this.prisma.profile.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile does not exist');
    }

    return profile;
  }

  async update(userId: string, dto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile does not exist');
    }

    return this.prisma.profile.update({
      where: {
        userId,
      },
      data: dto,
    });
  }
}
