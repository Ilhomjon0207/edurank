import {Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import {RankingService} from './ranking.service';
import {ApiBearerAuth} from "@nestjs/swagger";
import {CurrentUser} from "../common/decorators";

@ApiBearerAuth('JWT')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post('calculate')
  calculate() {
    return this.rankingService.calculateAll();
  }

  @Get()
  findAll() {
    return this.rankingService.findAll();
  }
  @Get('top')
  findTop(
      @Query(
          'limit',
          new DefaultValuePipe(10),
          ParseIntPipe,
      )
      limit: number,
  ) {
    return this.rankingService.findTop(limit);
  }
  @Get('me')
  myRanking(@CurrentUser() user ) {

    console.log(user)
    return this.rankingService.findMyRanking(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingService.findOne(+id);
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
