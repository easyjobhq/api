import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionController } from './controllers/questions.controller';

describe('QuestionController', () => {
  let controller: QuestionController;

  const questions = [
    {
      id: "1",
      title: "Question 1",
      question_description: "Description of question 1",
      client: { id: "1" },
      professional: { id: "1" }
    },
    {
      id: "2",
      title: "Question 2",
      question_description: "Description of question 2",
      client: { id: "2" },
      professional: { id: "2" }
    }
  ];

  const mockQuestionService = {
    create: jest.fn((id1, id2, dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    findAll: jest.fn(() => questions),
    findOne: jest.fn((id) => questions.find(question => question.id === id)),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [{ provide: QuestionService, useValue: mockQuestionService }],
    }).compile();

    controller  = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a question', () => {
    const dto = {
      title: "Question 1",
      question_description: "Description of question 1",
      client: undefined,
      professional: undefined
    };

    expect(controller.create(dto, "589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1")).toEqual({ id: expect.any(Number), ...dto });
    expect(mockQuestionService.create).toHaveBeenCalledWith("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto);
    expect(mockQuestionService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all questions', () => {
    expect(controller.findAll()).toEqual(questions);
    expect(mockQuestionService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find a question by id', () => {
    const questionId = "1";
    expect(controller.findOne(questionId)).toEqual(questions[0]);
    expect(mockQuestionService.findOne).toHaveBeenCalledWith(questionId);
    expect(mockQuestionService.findOne).toHaveBeenCalledTimes(1);
  });


  it('should remove a question', () => {
    const questionId = "1";
    expect(controller.remove(questionId)).toEqual({});
    expect(mockQuestionService.remove).toHaveBeenCalledWith(questionId);
    expect(mockQuestionService.remove).toHaveBeenCalledTimes(1);
  });
});
