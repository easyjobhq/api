import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { ServiceController } from './controllers/services.controller';
import {SpecialityController} from "./controllers/specialities.controller";
import {SpecialityService} from "./speciality.service";
import {createSpecialityDto} from "./dto/create-speciality.dto";
import {UpdateSpecialityDto} from "./dto/update-speciality.dto";

describe('SpecialityController', () => {
    let controller: SpecialityController;
    let service: SpecialityService;

    const mockSpecialityService = {
        create: jest.fn((dto) => ({ id: '1', ...dto })),
        findAll: jest.fn(() => [{ id: '1', speciality_name: 'Speciality Test' }]),
        findOne: jest.fn((id) => ({ id: '1', speciality_name: 'Speciality Test' })),
        update: jest.fn((id, dto) => ({ id, ...dto })),
        remove: jest.fn((id) => ({ id })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpecialityController],
            providers: [
                {
                    provide: SpecialityService,
                    useValue: mockSpecialityService,
                },
            ],
        }).compile();

        controller = module.get<SpecialityController>(SpecialityController);
        service = module.get<SpecialityService>(SpecialityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a speciality', async () => {
            const dto: createSpecialityDto = { speciality_name: 'New Speciality' };
            const result = await controller.create(dto);
            expect(result).toEqual({ id: '1', ...dto });
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return an array of specialities', async () => {
            const result = await controller.findAll();
            expect(result).toEqual([{ id: '1', speciality_name: 'Speciality Test' }]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a speciality', async () => {
            const id = '1';
            const result = await controller.findOne(id);
            expect(result).toEqual({ id: '1', speciality_name: 'Speciality Test' });
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('update', () => {
        it('should update a speciality', async () => {
            const id = '1';
            const dto: UpdateSpecialityDto = { speciality_name: 'Updated Speciality' };
            const result = await controller.update(id, dto);
            expect(result).toEqual({ id, ...dto });
            expect(service.update).toHaveBeenCalledWith(id, dto);
        });
    });

    describe('remove', () => {
        it('should remove a speciality', async () => {
            const id = '1';
            const result = await controller.remove(id);
            expect(result).toEqual({ id });
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});