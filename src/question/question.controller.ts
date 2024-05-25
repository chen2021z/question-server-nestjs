import { QuestionService } from './question.service';
import {
  Body,
  Controller,
  Delete,
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

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.QuestionService.delete(id);
  }

  @Post()
  create() {
    return this.QuestionService.create();
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const list = await this.QuestionService.findAllList({
      keyword,
      page,
      pageSize,
    });
    const count = await this.QuestionService.countAll({ keyword });
    return {
      list,
      count,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.QuestionService.findOne(id);
    // return { id };
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    return this.QuestionService.update(id, questionDto);
  }

  @Get('test')
  test(): string {
    throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  }
}
