import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ClientsService } from '../clients/clients.service';
import { ProfessionalsService } from '../professionals/professionals.service';

describe('ReviewService', () => {
  
  let service: ReviewService;

  const reviews = [
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      score: 4,
      comment: "Review 1",
      client: undefined,
      professional: undefined
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      score: 5,
      comment: "Review 2",
      client: undefined,
      professional: undefined
    },
    {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      score: 3,
      comment: "Review 3",
      client: undefined,
      professional: undefined
    },
  ];
  

  const mockReviewRepository = {
    create: jest.fn((dto) => ({ id: dto.id, ...dto })),
    save: jest.fn((dto) => (dto)),
    preload: jest.fn((dto) => (dto)),
    remove: jest.fn((id) => (undefined)), 
    findOneBy: jest.fn((id) => (reviews[0])), 
    find: jest.fn((paginationDto) => (reviews))
  };

  const mockClientService = {
    findOne: jest.fn((id) => (undefined)),
  };

  const mockProfessionalService = {
    findOne: jest.fn((id) => (undefined)),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, ClientsService, ProfessionalsService,
        {
          provide: getRepositoryToken(Review), 
          useValue: mockReviewRepository,
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

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a review', async () => {
    const dto = {
      id: "589e70e6-1b82-4fd4-ae25-29c226fa88b1",
      score: 4,
      comment: "Review 1",
    };

    const createdReview = await service.create("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto);

    expect(createdReview).toEqual({
      id: dto.id, 
      ...dto
    });
  });

  it('should find all reviews', async () => {
    const paginationDto = { limit: 10, offset: 0 };
    const foundReviews = await service.findAll(paginationDto);

    expect(foundReviews.length).toBeGreaterThan(0);
    expect(mockReviewRepository.find).toHaveBeenCalled();
  });

  it('should find a review by id', async () => {
    const reviewId = "589e70e6-1b82-4fd4-ae25-29c226fa88b1";
    const foundReview = await service.findOne(reviewId);

    expect(foundReview).toBeDefined();
    expect(mockReviewRepository.findOneBy).toHaveBeenCalledWith({ id: reviewId });
  });

  it('should remove a review', async () => {
    const reviewId = "589e70e6-1b82-4fd4-ae25-29c226fa88b1";
    await service.remove(reviewId);

    expect(mockReviewRepository.remove).toHaveBeenCalled();
  });
});
