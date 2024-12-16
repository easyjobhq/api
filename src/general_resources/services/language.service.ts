import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "../entities/language.entity";
import { Repository } from "typeorm";



export class LanguageService{
    private readonly logger = new Logger('LanguageService');

    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>
    ){}

    async findAll(){
        return this.languageRepository.find()
    }

    async findOne(id:string){
        
        let language: Language =null;

        try {
            language = await this.languageRepository.findOneBy({id:id})
        } catch (error) {
            console.log(error);
        }

        return language; 
    }
}