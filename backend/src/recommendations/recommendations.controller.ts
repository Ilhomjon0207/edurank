import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";
import {RecommendationsService} from "./recommendations.service";

@ApiBearerAuth("JWT")
@Controller('recommendations')
export class RecommendationsController {

    constructor(private readonly recommendationsService: RecommendationsService) {
    }

    @Get('student/:id')
    getStudentRecommendation(@Param('id', ParseIntPipe) id: number) {

        return this.recommendationsService.getStudentRecommendations(id)
    }
    @Get('student/:id/ai')
    async aiRecommendation(
        @Param('id', ParseIntPipe) id:number
    ){

        return this.recommendationsService.aiRecommendation(id);

    }
}
