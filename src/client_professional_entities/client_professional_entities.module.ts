import { Module } from '@nestjs/common';
import { ClientProfessionalEntitiesService } from './client_professional_entities.service';
import { ClientProfessionalEntitiesController } from './client_professional_entities.controller';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entitiy';
import { Review } from './entities/review.entity';

@Module({
  controllers: [ClientProfessionalEntitiesController],
  providers: [ClientProfessionalEntitiesService],
  exports: [ClientProfessionalEntitiesService],
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review])
  ]
})
export class ClientProfessionalEntitiesModule {}
