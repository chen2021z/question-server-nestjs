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

  async update(id: string, updateData) {
    return this.questionModel.updateOne({ _id: id }, updateData);
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }

  async delete(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }

  async findAllList({ keyword = '', page = 1, pageSize = 10 }) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊搜索 'abc'
    }
    return this.questionModel
      .find(whereOpt)
      .sort({ _id: 1 }) // _id 逆序
      .skip((page - 1) * pageSize) // 分页
      .limit(pageSize);
  }

  async countAll({ keyword = '' }) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊搜索 'abc'
    }
    return this.questionModel.countDocuments(whereOpt);
  }
}
