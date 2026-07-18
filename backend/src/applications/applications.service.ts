import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateApplicationDto} from './dto/create-application.dto';
import {UpdateApplicationDto} from './dto/update-application.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ApplicationsService {

    constructor(private readonly prisma: PrismaService) {

    }

    create(userId: number, dto: CreateApplicationDto) {
        return this.prisma.application.create({
            data: {
                userId,
                jobId: dto.JobId
            }
        })
    }

    findAll() {
        return this.prisma.application.findMany();
    }

   async findOne(id: number) {
        const application = await  this.prisma.application.findUnique({
          where: {
              id: id
          }
        })
     if (!application) {
       throw new NotFoundException(`Application with ID ${id} not found`);
     }

     return application;
    }

 async   update(id: number, updateApplicationDto: UpdateApplicationDto) {

      const application = await  this.prisma.application.findUnique({
        where: {
          id: id
        }
      })
      if (!application) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }


      return this.prisma.application.update({
        where: {
          id: id
        },
        data: {
          status:updateApplicationDto.status,

        }
      })
    }

   async  remove(id: number, userId: number) {

      const application = await this.prisma.application.findFirst({
        where: {
          id: id,
          userId: userId
        }
      })

     if (!application) {
       throw new NotFoundException(`Application with ID ${id} not found`);
     }
        return this.prisma.application.delete({
            where: {
                id
            }
        })
    }

    findMyApplications(userId: number) {
        return this.prisma.application.findMany({
            where: {
                userId
            },
            include: {
                Job: true
            }
        })
    }


}
