import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {JobService} from './job.service';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobDto} from './dto/update-job.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {CreateJobSkillDTO} from "./dto/create-job-skill.dto";

@ApiBearerAuth('JWT')
@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) {
    }

    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobService.create(createJobDto);
    }

    @Get()
    findAll() {
        return this.jobService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobService.update(+id, updateJobDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobService.remove(+id);
    }

    @Patch(':jobId/skills')
    addJobSkills(@Param('jobId') jobId: number, @Body() dto: CreateJobSkillDTO) {

        return this.jobService.addJobSkill(jobId, dto);
    }
}
