import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProfessionalsModule } from '../src/professionals/professionals.module';
import { ProfessionalsService } from '../src/professionals/professionals.service';
import { Professional } from '../src/professionals/entities/professional.entity';
import { AppModule } from '../src/app.module';

describe('ProfessionalsController (e2e)', () => {
  let app: INestApplication;

  const professionals = [
    {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: '3',
      name: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
    },
  ];

  const mockProfessionalsService = {
    findAll: jest.fn(() => professionals),
    findOne: jest.fn((id: string) => professionals.find(professional => professional.id === id)),
    create: jest.fn((data: Professional) => ({ id: '4', ...data })),
    update: jest.fn((id: string, data: Professional) => ({ id, ...data })),
    remove: jest.fn((id: string) => ({})),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProfessionalsService)
      .useValue(mockProfessionalsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/professionals (GET)', async () => {
    return request(app.getHttpServer())
      .get('/professionals')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(professionals);
      });
  });

  it('/professionals (POST)', async () => {
    const newProfessional = {
      name: 'New',
      lastName: 'Professional',
      email: 'new.professional@example.com',
    };
    return request(app.getHttpServer())
      .post('/professionals')
      .send(newProfessional)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ id: '4', ...newProfessional });
      });
  });

  it('/professionals/:id (PUT)', async () => {
    const professionalId = '1';
    const updatedProfessional = {
      name: 'Updated',
      lastName: 'Professional',
      email: 'updated.professional@example.com',
    };
    return request(app.getHttpServer())
      .put(`/professionals/${professionalId}`)
      .send(updatedProfessional)
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('/professionals/:id (DELETE)', async () => {
    const professionalId = '1';
    return request(app.getHttpServer())
      .delete(`/professionals/${professionalId}`)
      .expect(200);
  });
});
