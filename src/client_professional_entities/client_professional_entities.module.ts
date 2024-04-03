import { Module } from '@nestjs/common';
import { ClientProfessionalEntitiesService } from './client_professional_entities.service';
import { ClientProfessionalEntitiesController } from './client_professional_entities.controller';

@Module({
  controllers: [ClientProfessionalEntitiesController],
  providers: [ClientProfessionalEntitiesService],
})
export class ClientProfessionalEntitiesModule {}
