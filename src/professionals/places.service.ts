import { Injectable } from "@nestjs/common";
import { CreatePlaceDTO } from "./dto/create-place.dto";
import { Place } from "./entities/place.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfessionalsService } from "./professionals.service";


@Injectable()
export class PlacesService {

    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        private readonly professionalService: ProfessionalsService
    ) {}

    async create( professionalId: string, createPlaceDto: CreatePlaceDTO) {

        const professional = await this.professionalService.findOne(professionalId);

        const place = this.placeRepository.create(createPlaceDto);
        
        place.professional = professional;
        
        return await this.placeRepository.save(place);
    }

    async findByProfessional(professionalId: string) {
        return await this.placeRepository.find({
            where: { professional: { id: professionalId } }
        });
    }

    async remove(id: string) {
        const place = await this.placeRepository.findOne({
            where:{id}
        });

        return await this.placeRepository.remove(place);
    }

    async update(id: string, updatePlaceDto: CreatePlaceDTO) {
        return await this.placeRepository.preload({
            id: id,
            ...updatePlaceDto
        });
    }



}