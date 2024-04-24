import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';
import { ProfessionalsService } from '../professionals/professionals.service';
import { Question } from './entities/question.entitiy';

describe('QuestionService', () => {
  
  let service: QuestionService;

  const questions = [
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      title: "Question 1",
      question_description: "Description 1",
      client: undefined,
      professional: undefined
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      title: "Question 2",
      question_description: "Description 2",
      client: undefined,
      professional: undefined
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      title: "Question 3",
      question_description: "Description 3",
      client: undefined,
      professional: undefined
    },
  ];
  

  const mockQuestionRepository = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => (dto)),
    preload: jest.fn((dto) => (dto)),
    remove: jest.fn((id) => (undefined)), 
    findOneBy: jest.fn((id) => (questions[0])), 
    find: jest.fn((paginationDto) => (questions))
  };

  const mockClientService = {
    findOne: jest.fn((id) => (undefined)),
  };

  const mockProfessionalService = {
    findOne: jest.fn((id) => (undefined)),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, ClientsService, ProfessionalsService,
        {
          provide: getRepositoryToken(Question), 
          useValue: mockQuestionRepository,
        },
        {
            provide: ClientsService, 
            useValue: mockClientService,
        },
        {
            provide: ProfessionalsService, 
            useValue: mockProfessionalService,
        }
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a question', async () => {
    const dto = {
      title: "Question 1",
      question_description: "Description 1",
    };

    const createdQuestion = await service.create("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto);

    expect(createdQuestion).toEqual({
      id: expect.any(Number), 
      ...dto
    });
  });

  it('should find all questions', async () => {
    const limit = 10;
    const offset = 0;
    const questions = await service.findAll(limit, offset);

    expect(questions.length).toBeGreaterThan(0);
    expect(mockQuestionRepository.find).toHaveBeenCalled();
  });

  it('should find a question by id', async () => {
    const questionId = "589e70e6-1b82-4fd4-ae25-29c226fa88b1";
    const question = await service.findOne(questionId);

    expect(question).toBeDefined();
    expect(mockQuestionRepository.findOneBy).toHaveBeenCalledWith({id: questionId});
  });

  it('should update a question', async () => {
    const questionId = "589e70e6-1b82-4fd4-ae25-29c226fa88b1";
    const dto = {
      title: "Updated Question 1",
      question_description: "Updated Description 1",
    };

    const updatedQuestion = await service.update(questionId, dto);

    expect(updatedQuestion).toBeTruthy();
    expect(mockQuestionRepository.preload).toHaveBeenCalledWith({ id: questionId, ...dto });
  });

  it('should remove a question', async () => {
    const questionId = "589e70e6-1b82-4fd4-ae25-29c226fa88b1";
    await service.remove(questionId);

    expect(mockQuestionRepository.remove).toHaveBeenCalled();
  });
});
