import { Test, TestingModule } from '@nestjs/testing';
import { ClientProfessionalEntitiesController } from './client_professional_entities.controller';
import { ClientProfessionalEntitiesService } from './appointment.service';

describe('ClientProfessionalEntitiesController', () => {
  let controller: ClientProfessionalEntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientProfessionalEntitiesController],
      providers: [ClientProfessionalEntitiesService],
    }).compile();

    controller = module.get<ClientProfessionalEntitiesController>(ClientProfessionalEntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
