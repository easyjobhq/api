import { Test, TestingModule } from '@nestjs/testing';
import { SpecialityService } from './speciality.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speciality } from './entities/speciality.entity';

describe('SpecialityService', () => {
    let service: SpecialityService;
    let repository: Repository<Speciality>;

    const speciality = {
        id: '22d082e1-fd15-4f4e-a4d7-7a99c2644829',
        speciality_name: 'Speciality Test',
    };

    const specialities = [
        { id: '1', speciality_name: 'Speciality 1' },
        { id: '2', speciality_name: 'Speciality 2' },
    ];

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        preload: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SpecialityService,
                {
                    provide: getRepositoryToken(Speciality),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<SpecialityService>(SpecialityService);
        repository = module.get<Repository<Speciality>>(getRepositoryToken(Speciality));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a speciality', async () => {
        mockRepository.create.mockReturnValueOnce(speciality);
        mockRepository.save.mockReturnValueOnce(speciality);

        expect(await service.create(speciality)).toEqual(speciality);
        expect(mockRepository.create).toBeCalledWith(speciality);
        expect(mockRepository.save).toBeCalledWith(speciality);
    });

    it('should find all specialities', async () => {
        mockRepository.find.mockResolvedValueOnce(specialities);

        expect(await service.findAll(10, 0)).toEqual(specialities);
        expect(mockRepository.find).toBeCalledWith({ take: 10, skip: 0 });
    });

    it('should find a speciality by id', async () => {
        const id = '22d082e1-fd15-4f4e-a4d7-7a99c2644829';
        const speciality = { id, speciality_name: 'Speciality 1' };

        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(speciality as any);

        expect(await service.findOne(id)).toEqual(speciality);
    });


});
