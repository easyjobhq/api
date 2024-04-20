import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { Language } from './entities/language.entity';
import { Payment_method } from './entities/payment_method.entity';
import { Professional } from '../professionals/entities/professional.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Department]),
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([Payment_method]),
    TypeOrmModule.forFeature([Professional]),

  ],
  exports: [GeneralResourcesModule]
})
export class GeneralResourcesModule {}
