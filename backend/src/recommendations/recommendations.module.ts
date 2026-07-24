import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import {AiService} from "../ai/ai.service";

@Module({
  providers: [RecommendationsService,AiService],
  controllers: [RecommendationsController]
})
export class RecommendationsModule {}
