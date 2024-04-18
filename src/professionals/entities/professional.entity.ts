import { User } from "../../auth/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, JoinTable, ManyToMany, OneToMany, BeforeInsert } from "typeorm";
import { Question } from "../../client_professional_entities/entities/question.entitiy";
import { Review } from "../../client_professional_entities/entities/review.entity";
import { Speciality } from "./speciality.entity";
import { Service } from "./service.entity";
import { Language } from "../../general_resources/entities/language.entity";
import { City } from "../../general_resources/entities/city.entity";
import { Role } from "../../auth/entities/role.enum";

@Entity()
export class Professional extends User {
    
    @Column()
    score: string;

    @Column()
    description: string;

    @ManyToMany(()=>Question, (question)=>question.professionals)
    @JoinTable({
        name: 'professional_question'
    })
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.professionals)   
    reviews: Review[]

    @ManyToMany(()=>Speciality, (specilities)=>specilities.professionals)
    @JoinTable({
        name:'professional_speciality'
    })
    specialities: Speciality[]

    @ManyToMany(()=>Service, (services)=>services.professionals)
    @JoinTable({
        name:'professional_service'
    })
    services: Service[]

    @ManyToMany(()=>Language, (language)=>language.professionals)
    @JoinTable({
        name:'professional_language'
    })
    languages: Language[]

    @ManyToMany(()=>City, (city)=>city.professionals)
    @JoinTable({
        name:'professional_city'
    })
    cities: City[]

    @BeforeInsert()
    giveRole(){
        if(!this.roles)
            this.roles = []

        this.roles.push(Role.Professional)
    }

}

