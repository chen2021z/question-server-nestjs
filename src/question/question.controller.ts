import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  @Get('')
  findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return {
      list: [1, 2, 3],
      count: 10,
      keyword,
      page,
      pageSize,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    console.log(id, questionDto);

    return {
      id,
      questionDto,
    };
  }

  @Get('test')
  test(): string {
    throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST)
  }
}
