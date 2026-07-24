import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";
import {CandidatesService} from "./candidates.service";

@ApiBearerAuth("JWT")
@Controller('candidates')
export class CandidatesController {


    constructor(private service: CandidatesService) {
    }

    @Get(':id/candidates')
    getCandidates(
        @Param('id', ParseIntPipe)
        id: number
    ) {

        return this.service
            .getJobCandidates(id);

    }

    @Get(':id/candidates/ai')
    analyzeCandidates(
        @Param('id', ParseIntPipe)
        id:number
    ){

        return this.service
            .analyzeCandidates(id);

    }
}
