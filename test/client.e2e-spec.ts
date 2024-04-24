import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientsModule } from '../src/clients/clients.module';
import { Client } from '../src/clients/entities/client.entity';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('ClientsController (e2e)', () => {
  
    let app: INestApplication;

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
    findOneBy: jest.fn((id) => (clients[0])), 
    find: jest.fn((paginationDto) => (clients))
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Client))
      .useValue(mockClientRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/clients (GET)', async () => {
    return request(app.getHttpServer())
      .get('/clients')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(clients);
      });
  });

  it('/clients (POST)', async () => {
    const client_dto = { 
        name: "Juan Jose", 
        last_name: "Diaz Parra",
        email: "juan@gmail.com", 
        photo_url: "wwww.fotico.com/juanjose",
        phone_number: "+57 3121234567",
        password: "Secreto123*"
    }

    return request(app.getHttpServer())
      .post('/clients')
      .send(client_dto)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...client_dto
        });
      });
  });

  it('/clients (GET)', async () => {
    const client_dto = { 
        name: "Juan Jose", 
        last_name: "Diaz Parra",
        email: "juan@gmail.com", 
        photo_url: "wwww.fotico.com/juanjose",
        phone_number: "+57 3121234567",
        password: "Secreto123*"
    }

    return request(app.getHttpServer())
      .get('/clients/f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0')
      .send(client_dto)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: 'f4e5d1c4-3ca3-4f95-bc52-2f7d2e2b0fc0' ,
          ...client_dto
        });
      });
  });

  it('/clients (PATCH)', async () => {
    const client_dto = { 
        name: "Juan Jose", 
        last_name: "Diaz Parra",
        email: "juan@gmail.com", 
        photo_url: "wwww.fotico.com/juanjose",
        phone_number: "+57 3121234567",
        password: "Secreto123*"
    }

    return request(app.getHttpServer())
      .patch('/clients/589e70e6-1b82-4fd4-ae25-29c226fa88b1')
      .send(client_dto)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
          ...client_dto
        });
      });
  });

});
