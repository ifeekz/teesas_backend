import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetLessonsStatus } from './interfaces/lessons-status.interface';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private LessonRepo: Repository<Lesson>,
  ) {}

  async findAll(): Promise<GetLessonsStatus> {
    let status: GetLessonsStatus = {
      status: true,
      message: 'Success.',
      data: [],
    };

    try {
      const lessons = await this.LessonRepo.find();
      status.data = lessons;
    } catch (err) {
      status = {
        status: false,
        message: err,
        data: [],
      };
    }

    return status;
  }
}
