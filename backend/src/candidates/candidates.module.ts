import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import {AiService} from "../ai/ai.service";

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService,AiService]
})
export class CandidatesModule {}
