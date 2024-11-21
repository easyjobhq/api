import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { Language } from './entities/language.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { CityService } from './services/city.service';
import { LanguageService } from './services/language.service';
import { CityController } from './controllers/city.controller';
import { LanguageController } from './controllers/language.controller';
import { Appointment } from '../client_professional_entities/entities/appointment.entity';
import { AppointmentService } from '../client_professional_entities/appointment.service';
import { ClientsService } from '../clients/clients.service';
import { ProfessionalsService } from '../professionals/professionals.service';
import { Client } from '../clients/entities/client.entity';
import { ServiceService } from '../professionals/service.service';
import { Service } from '../professionals/entities/service.entity';
import { Speciality } from '../professionals/entities/speciality.entity';
import { SpecialityService } from '../professionals/speciality.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  controllers: [CityController, LanguageController],
  providers: [
    CityService, 
    LanguageService, 
    AppointmentService, 
    ClientsService, 
    ProfessionalsService, 
    ServiceService, 
    SpecialityService
  ],
  imports: [
    TypeOrmModule.forFeature([
      City,
      Department,
      Language,
      Professional,
      Appointment,
      Client,
      Service,
      Speciality
    ]),
    S3Module
  ],
  exports: [
    CityService, 
    LanguageService,
    TypeOrmModule
  ]
})
export class GeneralResourcesModule {}