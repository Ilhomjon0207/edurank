import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {SkillService} from "./skill.service";
import {CreateSkillDto} from "./dto/create-skill.dto";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AddUserSkillDto} from "./dto/add-user-skill.dto";
import {Roles} from "../common/decorators/roles.decorator";
import {Role} from "../common/enums";

@ApiBearerAuth("JWT")
@Controller('skills')
export class SkillController {

    constructor(private readonly skillService: SkillService) {
    }


    @Post()
    @Roles(Role.ADMIN,Role.STUDENT)
    create(
        @Body() dto: CreateSkillDto,
    ) {
        return this.skillService.create(dto);
    }


    @Get()
    findAll() {
        return this.skillService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.skillService.findOne(id);
    }


    @Post('users/:userId')
    addUserSkill(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() dto: AddUserSkillDto,
    ) {
        return this.skillService.addUserSkill(
            userId,
            dto,
        );
    }


    @Get('users/:userId')
    getUserSkills(
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.skillService.getUserSkills(userId);
    }


    @Patch('users/:userId/:skillId')
    updateUserSkill(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('skillId', ParseIntPipe) skillId: number,
        @Body('level', ParseIntPipe) level: number,
    ) {
        return this.skillService.update(
            userId,
            skillId,
            level,
        );
    }


    @Delete('users/:userId/:skillId')
    removeUserSkill(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('skillId', ParseIntPipe) skillId: number,
    ) {
        return this.skillService.removeUserSkill(
            userId,
            skillId,
        );
    }
}
