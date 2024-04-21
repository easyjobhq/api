import { Module } from '@nestjs/common';
import { ClientProfessionalEntitiesController } from './client_professional_entities.controller';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entitiy';
import { Review } from './entities/review.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';

@Module({
  controllers: [ClientProfessionalEntitiesController],
  providers: [AppointmentService],
  exports: [AppointmentService, ClientProfessionalEntitiesModule],
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Professional]),
    TypeOrmModule.forFeature([Appointment]),
  ], 
})
export class ClientProfessionalEntitiesModule {}
