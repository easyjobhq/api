import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, OneToMany, BeforeInsert } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Question } from "../../client_professional_entities/entities/question.entitiy";
import { Review } from "../../client_professional_entities/entities/review.entity";
import { Role } from "../../auth/entities/role.enum";

@Entity()
export class Client extends User {
    @OneToMany(()=>Question, (question)=>question.client)
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.client)
    reviews: Review[]

    @BeforeInsert()
    giveRole(){
        if(!this.roles)
            this.roles = []
        
        this.roles.push(Role.Client)

    }

}