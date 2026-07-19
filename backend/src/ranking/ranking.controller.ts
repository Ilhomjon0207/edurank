import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {RankingService} from './ranking.service';
import {UpdateRankingDto} from './dto/update-ranking.dto';
import {ApiBearerAuth} from "@nestjs/swagger";

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
