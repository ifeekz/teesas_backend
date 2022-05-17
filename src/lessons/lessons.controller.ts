import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetLessonsStatus } from './interfaces/lessons-status.interface';
import { LessonsService } from './lessons.service';

@Controller('api/v1/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async list(): Promise<GetLessonsStatus> {
    const result = this.lessonsService.findAll();

    return result;
  }
}
