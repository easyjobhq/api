import { Test, TestingModule } from '@nestjs/testing';
import { ClientProfessionalEntitiesService } from './client_professional_entities.service';

describe('ClientProfessionalEntitiesService', () => {
  let service: ClientProfessionalEntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientProfessionalEntitiesService],
    }).compile();

    service = module.get<ClientProfessionalEntitiesService>(ClientProfessionalEntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
