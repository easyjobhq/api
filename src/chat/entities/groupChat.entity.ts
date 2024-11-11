import { Client } from "src/clients/entities/client.entity";
import { Professional } from "src/professionals/entities/professional.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class GroupChat{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @ManyToOne(()=>Professional, (professional)=>professional.groupChats)
    professional: Professional

    @ManyToOne(()=>Client, (client)=>client.groupChats)
    client: Client

    @OneToMany(()=> Chat, (chat) => chat.groupChat )
    chats: Chat[]


}