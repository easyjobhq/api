import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsService } from './professionals.service';
import { ServiceService } from './service.service';
import { SpecialityService } from './speciality.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Service } from './entities/service.entity';
import { Speciality } from './entities/speciality.entity';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

  const professional = {
    id: "1",
    name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "+123456789",
    photo_url: "example.com/johndoe",
    password: "Secret123*",
    score: "5",
    description: "Professional description"
  };

  const mockProfessionalRepository = {
    create: jest.fn(dto => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn(dto => dto),
    preload: jest.fn(dto => dto),
    remove: jest.fn(id => ({})),
    findOne: jest.fn(id => professional),
    find: jest.fn(() => [professional]),
  };

  const mockServiceRepository = {
    // Implementa los métodos necesarios para el mock de Service Repository
  };

  const mockSpecialityRepository = {
    // Implementa los métodos necesarios para el mock de Speciality Repository
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalsService,
        ServiceService,
        SpecialityService,

        {
          provide: getRepositoryToken(Professional),
          useValue: mockProfessionalRepository,
        },
        {
          provide: getRepositoryToken(Service),
          useValue: mockServiceRepository,
        },
        {
          provide: getRepositoryToken(Speciality),
          useValue: mockSpecialityRepository,
        }
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a professional', async () => {
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

    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    });
  });

  it('should find all professionals', async () => {
    expect(await service.findAll(10, 0)).toEqual([professional]);
  });

  it('should find a professional by id', async () => {
    const professionalId = "1";
    expect(await service.findOne(professionalId)).toEqual(professional);
  });

  it('should update a professional', async () => {
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

    expect(await service.update(professionalId, dto)).toEqual({ id: professionalId, ...dto });
  });

  it('should remove a professional', async () => {
    const professionalId = "1";
    expect(await service.remove(professionalId)).toEqual(undefined);
  });
});