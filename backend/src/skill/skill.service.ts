import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateSkillDto} from "./dto/create-skill.dto";
import {AddUserSkillDto} from "./dto/add-user-skill.dto";

@Injectable()
export class SkillService {
    constructor(private readonly prisma: PrismaService) {

    }

    create(dto: CreateSkillDto) {
        return this.prisma.skill.create({
            data: dto
        });
    }

    findAll() {
        return this.prisma.skill.findMany();
    }

    findOne(id: number) {
        return this.prisma.skill.findUnique({
            where: {
                id
            }
        })
    }

    async update(
        userId: number,
        skillId:number,
        level:number,
    ) {

        const skill=await this.prisma.userSkill.findUnique({
            where: {
                userId_skillId:{
                    userId,
                    skillId
                }
            }
        })

        if(!skill){
            throw new NotFoundException('No skill with this id')
        }

        return this.prisma.userSkill.update({
            where: {
                userId_skillId:{
                    userId,
                    skillId
                }
            },
            data: {
                level
            },
        });
    }

   async removeUserSkill(userId: number,skillId:number) {
        return this.prisma.userSkill.delete({
            where: {
                userId_skillId:{
                    userId,
                    skillId
                }
            }
        })
    }

    async addUserSkill(
        userId: number,
        dto: AddUserSkillDto,
    ) {
        const exists=await this.prisma.userSkill.findUnique({
            where: {
                userId_skillId: {
                    userId: userId,
                    skillId:dto.skillId
                }
            }
        })

        if (exists) {
            throw new ConflictException('Skill already exists');
        }

        return this.prisma.userSkill.create({
            data: {
                userId,
                skillId: dto.skillId,
                level: dto.level,
            },
        });
    }

    getUserSkills(userId: number) {
        return this.prisma.userSkill.findMany({
            where: {
                userId,
            },
            include: {
                Skill: true,
            },
        });
    }
}
