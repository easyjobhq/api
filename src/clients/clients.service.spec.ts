import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from 'src/auth/entities/user.entity';

describe('ClientsService', () => {
  
  let service: ClientsService;

  const client = {
    id: "f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0",
    name: "Juan Jose", 
    last_name: "Diaz Parra",
    email: "juan@gmail.com", 
    photo_url: "wwww.fotico.com/juanjose",
    phone_number: "+57 3121234567",
    password: "Secreto123*"
  }

  const clients =[
    {
      id: "f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0",
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      name: "Maria", 
      last_name: "Garcia",
      email: "maria@gmail.com", 
      photo_url: "wwww.fotico.com/maria",
      phone_number: "+57 3129876543",
      password: "Contraseña123*"
    },
    {
      id: "96c3f312-e1c1-4c0a-92ef-8f31d2a6863c",
      name: "Pedro", 
      last_name: "Lopez",
      email: "pedro@gmail.com", 
      photo_url: "wwww.fotico.com/pedro",
      phone_number: "+57 3101234567",
      password: "Password123*"
    }
  ];

  const mockClientRepository = {


    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => (dto)),
    preload: jest.fn((dto) => (dto)),
    remove: jest.fn((id) => ({})), 
    findOneBy: jest.fn((id) => (client)), 
    find: jest.fn((paginationDto) => (clients))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [ClientsService,
        {
          provide: getRepositoryToken(Client), 
          useValue: mockClientRepository,
        }
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const dto = {
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    }

    expect( await service.create(dto) ).toEqual( {
      id: expect.any(Number), 
      ... dto
    })
  });

  it('should update a client', async () => {
    const dto = {
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    }
    
    expect(await service.update('1', dto)).toEqual({
      id: '1', 
      ...dto
    })
  })


  it('should remove a client', async () => {
    //console.log(await service.remove('1'));
    expect(await service.remove('f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0')).toEqual(undefined);
  })

  it('should retrive all todos', () => {
    expect(service.findAll( {limit: 10, offset: 0})).toEqual(clients);
  }) 

});
