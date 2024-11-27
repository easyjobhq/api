import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { City } from "../entities/city.entity";



export class CityService{
    private readonly logger = new Logger('CityService');

    constructor(
        @InjectRepository(City)
        private readonly CityRepository: Repository<City>
    ){}

    async findAll(){
        return this.CityRepository.find()
    }

    async findOne(id:string){
        
        let city: City =null;

        try {
            city = await this.CityRepository.findOneBy({id:id})
        } catch (error) {  
            console.log(error);
        }
        return city;
    }
}