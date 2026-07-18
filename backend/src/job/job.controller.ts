import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {JobService} from './job.service';
import {CreateJobDto} from './dto/create-job.dto';
import {UpdateJobDto} from './dto/update-job.dto';
import {ApiBearerAuth} from "@nestjs/swagger";
import {CreateJobSkillDTO} from "./dto/create-job-skill.dto";
import {UpdateJobSkillDto} from "./dto/update-job-skill.dto";

@ApiBearerAuth('JWT')
@Controller('jobs')
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

    @Post(':jobId/skills')
    addJobSkills(@Param('jobId') jobId: number, @Body() dto: CreateJobSkillDTO) {

        return this.jobService.addJobSkill(jobId, dto);
    }

    @Get(':jobId/skills')
    getJobSkills(@Param('jobId') jobId: number) {
        return this.jobService.getJobSkills(jobId);
    }

    @Patch(':jobId/skills/:skillId')
    updateJobSkill(
        @Param('jobId', ParseIntPipe) jobId: number,
        @Param('skillId', ParseIntPipe) skillId: number,
        @Body() dto: UpdateJobSkillDto,
    ) {
        return this.jobService.updateJobSkill(
            jobId,
            skillId,
            dto.requiredLevel,
        );
    }

    @Delete(':jobId/skills/:skillId')
    removeJobSkill(
        @Param('jobId', ParseIntPipe) jobId: number,
        @Param('skillId', ParseIntPipe) skillId: number,
    ) {
        return this.jobService.removeJobSkill(
            jobId,
            skillId,
        );
    }

}
