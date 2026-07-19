import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCriterionDto} from './dto/create-criterion.dto';
import {UpdateCriterionDto} from './dto/update-criterion.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CriterionService {

    constructor(private readonly prisma: PrismaService) {
    }


    create(createCriterionDto: CreateCriterionDto) {
        return this.prisma.criterion.create({
            data: createCriterionDto,
        });
    }

    findAll() {
        return this.prisma.criterion.findMany();
    }

    async findOne(id: number) {

        const criterion = await this.prisma.criterion.findUnique({
            where: {id: id}
        })

        if (!criterion) {
            throw new NotFoundException('No criterion found');
        }
        return criterion;
    }

    async update(id: number, updateCriterionDto: UpdateCriterionDto) {

        const criterion = await this.prisma.criterion.findUnique({
            where: {id: id}
        })

        if (!criterion) {
            throw new NotFoundException('No criterion found');
        }


        return this.prisma.criterion.update({
            where: {id: id},
            data: updateCriterionDto,
        })
            ;
    }

    async remove(id: number) {
        const criterion = await this.prisma.criterion.findUnique({
            where: {id: id}
        })

        if (!criterion) {
            throw new NotFoundException('No criterion found');
        }

        return this.prisma.criterion.delete({
            where: {id: id}
        })
    }
}
