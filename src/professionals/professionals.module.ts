import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Service } from './entities/service.entity';
import { Speciality } from './entities/speciality.entity';

@Module({
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
  imports: [
    TypeOrmModule.forFeature([Professional]),
    TypeOrmModule.forFeature([Service]), 
    TypeOrmModule.forFeature([Speciality])
  ]
})
export class ProfessionalsModule {}
