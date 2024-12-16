import { Entity, Column, PrimaryGeneratedColumn, ChildEntity, OneToMany, BeforeInsert, ManyToMany, JoinTable } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Question } from "../../client_professional_entities/entities/question.entitiy";
import { Review } from "../../client_professional_entities/entities/review.entity";
import { Role } from "../../auth/entities/role.enum";
import { Appointment } from "../../client_professional_entities/entities/appointment.entity";
import { GroupChat } from "src/chat/entities/groupChat.entity";
import { Chat } from "src/chat/entities/chat.entity";
import { Professional } from "src/professionals/entities/professional.entity";

@Entity()
export class Client extends User {
    @OneToMany(()=>Question, (question)=>question.client)
    questions: Question[]

    @OneToMany(()=>Review, (review)=>review.client)
    reviews: Review[]

    @OneToMany(()=>Appointment, (appointment)=>appointment.client)
    appointments: Appointment[]

    @BeforeInsert()
    giveRole(){
        if(!this.roles)
            this.roles = []
        
        this.roles.push(Role.Client)

    }

    @OneToMany(()=> GroupChat, (groupChat)=>groupChat.client)
    groupChats: GroupChat[]

    @OneToMany(()=> Chat, (chat)=>chat.client)
    chats: Chat[]

    @ManyToMany(()=> Professional, (professional)=>professional.likedBy)
    @JoinTable()
    likes: Professional[]

}