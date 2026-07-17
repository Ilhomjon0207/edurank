import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {SkillService} from "./skill.service";
import {CreateSkillDto} from "./dto/create-skill.dto";
import {Public} from "../common/decorators/public.decorator";
import {ApiBearerAuth} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CurrentUser} from "../common/decorators";
import {AddUserSkillDto} from "./dto/add-user-skill.dto";
import {UpdateUserSkillDto} from "./dto/update-user-skill.dto";

@Controller('skills')
export class SkillController {

    constructor(private readonly skillService: SkillService){}

    @Public()
    @Get()
    findAll(){
        return this.skillService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.skillService.findOne(+id);
    }
    @ApiBearerAuth("JWT")
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateSkillDto){
        return this.skillService.create(dto);
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Patch('me/:skillId')
    update(
        @CurrentUser() user,
        @Param('skillId', ParseIntPipe) skillId: number,
        @Body() dto: UpdateUserSkillDto,
    ) {
        return this.skillService.update(
            user.id,
            skillId,
            dto.level,
        );
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Delete('me/:skillId')
    remove(
        @CurrentUser() user,
        @Param('skillId', ParseIntPipe) skillId: number,
    ) {
        return this.skillService.removeUserSkill(
            user.id,
            skillId,
        );
    }

    @ApiBearerAuth("JWT")
    @UseGuards(JwtAuthGuard)
    @Post('me')
    addUserSkills(@CurrentUser() user,@Body() dto: AddUserSkillDto){
        return this.skillService.addUserSkill(user.id, dto);

    }

    @Get('me')
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    getMySkills(
        @CurrentUser() user,
    ) {
        return this.skillService.getUserSkills(user.id);
    }

}
