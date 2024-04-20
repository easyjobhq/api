import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '../general_resources/entities/language.entity';
import { City } from '../general_resources/entities/city.entity';
import { Department } from '../general_resources/entities/department.entity';
import { Professional } from '../professionals/entities/professional.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Department]),
    TypeOrmModule.forFeature([Professional])
  ]
})
export class SeedModule {}
