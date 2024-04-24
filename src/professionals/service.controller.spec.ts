import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { ServiceController } from './controllers/services.controller';

describe('ServiceController', () => {
  let controller: ServiceController;

  const services = [{
      id: "1",
      title: "Service 1",
      description: "Description of service 1",
      price: 50.0,
      professionals: []
    },
    {
      id: "2",
      title: "Service 2",
      description: "Description of service 2",
      price: 70.0,
      professionals: []
    }
  ];

  const mockServiceService = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    findAll: jest.fn(() => services),
    findOne: jest.fn((id) => services.find(service => service.id === id)),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [{ provide: ServiceService, useValue: mockServiceService }],
    }).compile();

    controller  = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a service', () => {
    const dto = {
      title: "Service 1",
      description: "Description of service 1",
      price: 50.0,
      professionals: []
    };

    expect(controller.create(dto)).toEqual({ id: expect.any(Number), ...dto });
    expect(mockServiceService.create).toHaveBeenCalledWith(dto);
    expect(mockServiceService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all services', () => {
    expect(controller.findAll()).toEqual(services);
    expect(mockServiceService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find a service by id', () => {
    const serviceId = "1";
    expect(controller.findOne(serviceId)).toEqual(services[0]);
    expect(mockServiceService.findOne).toHaveBeenCalledWith(serviceId);
    expect(mockServiceService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a service', () => {
    const serviceId = "1";
    const dto = {
      title: "Updated Service 1",
      description: "Updated description of service 1",
      price: 60.0,
      professionals: []
    };

    expect(controller.update(serviceId, dto)).toEqual({ id: serviceId, ...dto });
    expect(mockServiceService.update).toHaveBeenCalledWith(serviceId, dto);
    expect(mockServiceService.update).toHaveBeenCalledTimes(1);
  });

  it('should remove a service', () => {
    const serviceId = "1";
    expect(controller.remove(serviceId)).toEqual({});
    expect(mockServiceService.remove).toHaveBeenCalledWith(serviceId);
    expect(mockServiceService.remove).toHaveBeenCalledTimes(1);
  });
});
