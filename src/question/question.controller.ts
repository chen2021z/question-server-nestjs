import { QuestionService } from './question.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  // 依赖注入
  constructor(private readonly QuestionService: QuestionService) {}

  @Post()
  create(){
    console.log(999999999);
    
    return this.QuestionService.create();
  }

  @Get()
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
    return this.QuestionService.findOne(id);
    // return { id };
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
    throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  }
}
