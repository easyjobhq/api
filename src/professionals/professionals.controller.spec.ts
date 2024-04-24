import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsController } from './controllers/professionals.controller';
import { ProfessionalsService } from './professionals.service';

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;

  const professionals = [{
      id: "1",
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      photo_url: "example.com/johndoe",
      phone_number: "+123456789",
      password: "Secret123*",
      score: "5",
      description: "Professional description"
    },
    {
      id: "2",
      name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      photo_url: "example.com/janesmith",
      phone_number: "+987654321",
      password: "Password123*",
      score: "4",
      description: "Another professional description"
    }
  ];

  const mockProfessionalsService = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    findAll: jest.fn(() => professionals),
    findOne: jest.fn((id) => professionals.find(professional => professional.id === id)),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalsController],
      providers: [{ provide: ProfessionalsService, useValue: mockProfessionalsService }],
    }).compile();

    controller = module.get<ProfessionalsController>(ProfessionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a professional', () => {
    const dto = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone_number: "+123456789",
      photo_url: "example.com/johndoe",
      password: "Secret123*",
      score: "5",
      description: "Professional description"
    };

    expect(controller.create(dto)).toEqual({ id: expect.any(Number), ...dto });
    expect(mockProfessionalsService.create).toHaveBeenCalledWith(dto);
    expect(mockProfessionalsService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all professionals', () => {
    expect(controller.findAll()).toEqual(professionals);
    expect(mockProfessionalsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find a professional by id', () => {
    const professionalId = "1";
    expect(controller.findOne(professionalId)).toEqual(professionals[0]);
    expect(mockProfessionalsService.findOne).toHaveBeenCalledWith(professionalId);
    expect(mockProfessionalsService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a professional', () => {
    const professionalId = "1";
    const dto = {
      name: "Updated John",
      last_name: "Updated Doe",
      email: "updated.john.doe@example.com",
      phone_number: "+987654321",
      photo_url: "example.com/updatedjohndoe",
      password: "UpdatedSecret123*",
      score: "4",
      description: "Updated professional description"
    };

    expect(controller.update(professionalId, dto)).toEqual({ id: professionalId, ...dto });
    expect(mockProfessionalsService.update).toHaveBeenCalledWith(professionalId, dto);
    expect(mockProfessionalsService.update).toHaveBeenCalledTimes(1);
  });

  it('should remove a professional', () => {
    const professionalId = "1";
    expect(controller.remove(professionalId)).toEqual({});
    expect(mockProfessionalsService.remove).toHaveBeenCalledWith(professionalId);
    expect(mockProfessionalsService.remove).toHaveBeenCalledTimes(1);
  });
  
});
