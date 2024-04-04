import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Service } from './entities/service.entity';
import { Speciality } from './entities/speciality.entity';
import { Question } from 'src/client_professional_entities/entities/question.entitiy';
import { Review } from 'src/client_professional_entities/entities/review.entity';

@Module({
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
  imports: [
    TypeOrmModule.forFeature([Professional]),
    TypeOrmModule.forFeature([Service]), 
    TypeOrmModule.forFeature([Speciality]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review])
  ]
})
export class ProfessionalsModule {}
