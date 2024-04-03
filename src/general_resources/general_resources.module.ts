import { Module } from '@nestjs/common';
import { GeneralResourcesService } from './general_resources.service';
import { GeneralResourcesController } from './general_resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { Language } from './entities/language.entity';
import { Payment_method } from './entities/payment_method.entity';

@Module({
  controllers: [GeneralResourcesController],
  providers: [GeneralResourcesService],
  imports: [
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Department]),
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([Payment_method]),

  ]
})
export class GeneralResourcesModule {}
