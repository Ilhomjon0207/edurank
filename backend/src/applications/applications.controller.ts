import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ApplicationsService} from './applications.service';
import {CreateApplicationDto} from './dto/create-application.dto';
import {UpdateApplicationDto} from './dto/update-application.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../common/decorators/roles.decorator";
import {Role} from "../common/enums";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {CurrentUser} from "../common/decorators";

@ApiBearerAuth('JWT')
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {
    }

    @Post()
    create(@CurrentUser() user,@Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationsService.create(user.id, createApplicationDto);
    }

    @Get()
    findAll() {
        return this.applicationsService.findAll();
    }

    @Get('my')
    myApplications(
        @CurrentUser() user
    ) {

        return this.applicationsService.findMyApplications(
            user.id
        );

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.applicationsService.findOne(+id);
    }


    @Patch(':id')
    @Roles(Role.TEACHER, Role.ADMIN)
    update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
        return this.applicationsService.update(+id, updateApplicationDto);
    }

    @Delete(':id')
    remove(@CurrentUser() user,@Param('id') id: string) {
        return this.applicationsService.remove(+id, user.id);
    }
}
