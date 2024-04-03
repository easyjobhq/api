import { Test, TestingModule } from '@nestjs/testing';
import { GeneralResourcesController } from './general_resources.controller';
import { GeneralResourcesService } from './general_resources.service';

describe('GeneralResourcesController', () => {
  let controller: GeneralResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralResourcesController],
      providers: [GeneralResourcesService],
    }).compile();

    controller = module.get<GeneralResourcesController>(GeneralResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
