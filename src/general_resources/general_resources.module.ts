import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { Language } from './entities/language.entity';
import { Payment_method } from './entities/payment_method.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { CityService } from './services/city.service';
import { LanguageService } from './services/language.service';
import { CityController } from './controllers/city.controller';
import { LanguageController } from './controllers/language.controller';

@Module({
  controllers: [CityController, LanguageController],
  providers: [CityService, LanguageService],
  imports: [
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Department]),
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([Payment_method]),
    TypeOrmModule.forFeature([Professional]),

  ],
  exports: [GeneralResourcesModule, CityService, LanguageService]
})
export class GeneralResourcesModule {}
