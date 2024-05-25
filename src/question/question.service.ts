import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create() {
    const question = new this.questionModel({
      title: 'Question ' + Date.now(),
      desc: 'description of question',
    });

    return await question.save();
  }

  async findOne(id: string){
    return await this.questionModel.findById(id);
  }
}
