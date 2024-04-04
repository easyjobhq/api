import { User } from "src/clients/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Question } from "src/client_professional_entities/entities/question.entitiy";
import { Review } from "src/client_professional_entities/entities/review.entity";
import { Speciality } from "./speciality.entity";
import { Service } from "./service.entity";

@Entity()
export class Professional extends User {
    
    @Column()
    score: string;

    @Column()
    description: string;

    @ManyToMany(()=>Question, (question)=>question.professionals, {
        cascade:true,
    })
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.professionals)
    reviews: Review[]

    @ManyToMany(()=>Speciality, (specilities)=>specilities.professionals, {
        cascade: true
    })
    specialities: Speciality[]

    @ManyToMany(()=>Service, (services)=>services.professionals,{
        cascade:true
    })
    services: Service[]

}

