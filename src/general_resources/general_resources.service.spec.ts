import { Test, TestingModule } from '@nestjs/testing';
import { GeneralResourcesService } from './general_resources.service';

describe('GeneralResourcesService', () => {
  let service: GeneralResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralResourcesService],
    }).compile();

    service = module.get<GeneralResourcesService>(GeneralResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
