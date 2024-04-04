import { Module } from '@nestjs/common';
import { ClientProfessionalEntitiesService } from './client_professional_entities.service';
import { ClientProfessionalEntitiesController } from './client_professional_entities.controller';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entitiy';
import { Review } from './entities/review.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';


@Module({
  controllers: [ClientProfessionalEntitiesController],
  providers: [ClientProfessionalEntitiesService],
  exports: [ClientProfessionalEntitiesService, ClientProfessionalEntitiesModule],
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Professional]),
  ], 

})
export class ClientProfessionalEntitiesModule {}
