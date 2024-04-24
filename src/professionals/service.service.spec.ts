import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

describe('ServiceService', () => {
  
  let service: ServiceService;

  const serviceEntity = {
    id: "f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0",
    title: "Service 1",
    description: "Description of service 1",
    price: 50.0,
    professionals: []
  };

  const services = [
    {
      id: "f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0",
      title: "Service 1",
      description: "Description of service 1",
      price: 50.0,
      professionals: []
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      title: "Service 2",
      description: "Description of service 2",
      price: 70.0,
      professionals: []
    },
    {
      id: "96c3f312-e1c1-4c0a-92ef-8f31d2a6863c",
      title: "Service 3",
      description: "Description of service 3",
      price: 60.0,
      professionals: []
    }
  ];

  const mockServiceRepository = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => (dto)),
    preload: jest.fn((dto) => (dto)),
    remove: jest.fn((id) => ({})), 
    findOneBy: jest.fn((id) => (serviceEntity)), 
    find: jest.fn((paginationDto) => (services)),
    update: jest.fn((id, dto) => ({ id, ...dto }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService,
        {
          provide: getRepositoryToken(Service), 
          useValue: mockServiceRepository,
        }
      ],
    }).compile();

    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a service', async () => {
    const dto = {
      title: "Service 1",
      description: "Description of service 1",
      price: 50.0,
      professionals: []
    };

    expect(await service.create(dto)).toEqual({ id: expect.any(Number), ...dto });
    expect(mockServiceRepository.create).toHaveBeenCalledWith(dto);
    expect(mockServiceRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should update a service', async () => {
    const dto_update = {
      title: "Updated Service 1",
      description: "Updated description of service 1",
      price: 60.0,
      professionals: []
    };

    expect(await service.update('1', dto_update)).toEqual({ id: '1', ...dto_update });
    expect(mockServiceRepository.preload).toHaveBeenCalledWith({ id: '1', ...dto_update });
    expect(mockServiceRepository.preload).toHaveBeenCalledTimes(1);
  });

  it('should remove a service', async () => {
    expect(await service.remove('f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0')).toEqual(undefined);
    expect(mockServiceRepository.remove).toHaveBeenCalledWith(serviceEntity);
    expect(mockServiceRepository.remove).toHaveBeenCalledTimes(1);
  });

  it('should retrieve all services', () => {
    expect(service.findAll(10,2)).toEqual(services);
    expect(mockServiceRepository.find).toHaveBeenCalledTimes(1);
  });
});
