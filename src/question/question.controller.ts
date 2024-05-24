import { Controller, Get } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  @Get('')
  findAll() {
    return {
      list: [1, 2, 3],
      count: 10,
    };
  }

  
  @Get('test')
  test(): string {
    return 'question test!';
  }
}
