import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {SkillService} from "./skill.service";
import {Roles} from "../common/decorators/roles.decorator";
import {Role} from "../common/enums";
import {CreateSkillDto} from "./dto/create-skill.dto";
import {UpdateSkillDto} from "./dto/update-skill.dto";
import {Public} from "../common/decorators/public.decorator";
import {ApiBearerAuth} from "@nestjs/swagger";
@ApiBearerAuth('JWT')
@Controller('skills')
export class SkillController {

    constructor(private readonly skillService: SkillService){}

    @Get()
    @Public()
    findAll(){
        return this.skillService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.skillService.findOne(+id);
    }

    @Post()
    create(@Body() createSkillDto: CreateSkillDto){
        return this.skillService.create(createSkillDto);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    update(@Param('id') id:string, @Body() updateSkillDto: UpdateSkillDto){
        return this.skillService.update(+id,updateSkillDto)
    }


    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id',ParseIntPipe) id:number){
        return this.skillService.remove(id);
    }

}
