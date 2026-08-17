import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators';
import * as JwtPayload_2 from '../common/interfaces/JwtPayload';

@ApiBearerAuth('JWT')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post('calculate-all/:jobId')
  calculateAll(@Param('jobId') jobId: string) {
    return this.rankingService.calculateAll(jobId);
  }
  @Post('calculate/:jobId')
  calculate(
    @Param('jobId') jobId: string,
    @CurrentUser() user: JwtPayload_2.IJwtPayload,
  ) {
    return this.rankingService.calculate(jobId, user.id);
  }
  @Get()
  findAll() {
    return this.rankingService.findAll();
  }
  @Get('top')
  findTop(
    @Query('limit')
    limit: number,

    @Query('jobId')
    jobId?: string,
  ) {
    return this.rankingService.findTop(jobId, limit);
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
