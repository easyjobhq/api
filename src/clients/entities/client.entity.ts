import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Question } from "src/client_professional_entities/entities/question.entitiy";
import { Review } from "src/client_professional_entities/entities/review.entity";

@Entity()
export class Client extends User {
    @OneToMany(()=>Question, (question)=>question.client)
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.client)
    reviews: Review[]
}