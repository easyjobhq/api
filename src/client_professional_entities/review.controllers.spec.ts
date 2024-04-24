import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsController } from './controllers/reviews.controller';

describe('ReviewController', () => {
  let controller: ReviewsController;

  const reviews = [
    {
      id: "1",
      score: 4.5,
      comment: "This professional did a great job!",
      client: { id: "1" },
      professional: { id: "1" }
    },
    {
      id: "2",
      score: 3.8,
      comment: "Could improve communication, but overall satisfied.",
      client: { id: "2" },
      professional: { id: "2" }
    }
  ];

  const mockReviewService = {
    create: jest.fn((id1, id2, dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    findAll: jest.fn(() => reviews),
    findOne: jest.fn((id) => reviews.find(review => review.id === id)),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    }).compile();

    controller  = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a review', () => {
    const dto = {
      score: 4.5,
      comment: "This professional did a great job!",
      client: undefined,
      professional: undefined
    };

    expect(controller.create("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto)).toEqual({ id: expect.any(Number), ...dto });
    expect(mockReviewService.create).toHaveBeenCalledWith("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto);
    expect(mockReviewService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all reviews', () => {
    expect(controller.findAll()).toEqual(reviews);
    expect(mockReviewService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find a review by id', () => {
    const reviewId = "1";
    expect(controller.findOne(reviewId)).toEqual(reviews[0]);
    expect(mockReviewService.findOne).toHaveBeenCalledWith(reviewId);
    expect(mockReviewService.findOne).toHaveBeenCalledTimes(1);
  });


  it('should remove a review', () => {
    const reviewId = "1";
    expect(controller.remove(reviewId)).toEqual({});
    expect(mockReviewService.remove).toHaveBeenCalledWith(reviewId);
    expect(mockReviewService.remove).toHaveBeenCalledTimes(1);
  });
});
