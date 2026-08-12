import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators';
import * as JwtPayload from '../common/interfaces/JwtPayload';
import * as JwtPayload_2 from '../common/interfaces/JwtPayload';

@ApiBearerAuth('JWT')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post('calculate-all')
  calculateAll() {
    return this.rankingService.calculateAll();
  }
  @Post('calculate/:jobId')
  calculate(
    @Param('jobId', ParseIntPipe) jobId: string,
    @CurrentUser() user: JwtPayload.IJwtPayload,
  ) {
    return this.rankingService.calculate(jobId, user.sub);
  }
  @Get()
  findAll() {
    return this.rankingService.findAll();
  }
  @Get('top')
  findTop(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ) {
    return this.rankingService.findTop(String(limit));
  }
  @Get('me')
  myRanking(@CurrentUser() user: JwtPayload_2.IJwtPayload) {
    return this.rankingService.findMyRanking(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
  //   return this.rankingService.update(+id, updateRankingDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rankingService.remove(+id);
  // }
}
