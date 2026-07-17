import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UpdateSkillDto} from "./dto/update-skill.dto";

@Injectable()
export class SkillService {
    constructor(private readonly prisma: PrismaService) {

    }

    create(data:{name: string}){
        return this.prisma.skill.create({
            data
        })
    }

    findAll(){
        return this.prisma.skill.findMany();
    }

    findOne(id: number){
        return this.prisma.skill.findUnique({
            where:{
                id
            }
        })
    }

    update(
        id: number,
        dto: UpdateSkillDto,
    ) {
        return this.prisma.skill.update({
            where: { id },
            data: dto,
        });
    }

    remove(id: number){
        return this.prisma.skill.delete({
            where:{
                id
            }
        })
    }
}
