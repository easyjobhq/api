import { User } from "../../auth/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, JoinTable, ManyToMany, OneToMany, BeforeInsert, ManyToOne } from "typeorm";
import { Question } from "../../client_professional_entities/entities/question.entitiy";
import { Review } from "../../client_professional_entities/entities/review.entity";
import { Speciality } from "./speciality.entity";
import { Service } from "./service.entity";
import { Language } from "../../general_resources/entities/language.entity";
import { City } from "../../general_resources/entities/city.entity";
import { Role } from "../../auth/entities/role.enum";
import { Appointment } from "src/client_professional_entities/entities/appointment.entity";

@Entity()
export class Professional extends User {
    
    @Column()
    score: string;

    @Column()
    description: string;

    @ManyToOne(()=>Question, (question)=>question.professional)
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.professional)   
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

    @OneToMany(()=>Appointment, (appointment)=>appointment.professional)
    appointments: Appointment[]

    @BeforeInsert()
    giveRole(){
        if(!this.roles)
            this.roles = []

        this.roles.push(Role.Professional)
    }

}

