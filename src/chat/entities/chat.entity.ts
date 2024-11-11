import { Client } from "src/clients/entities/client.entity";
import { Professional } from "src/professionals/entities/professional.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupChat } from "./groupChat.entity";

@Entity()
export class Chat{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    message: string;

    @ManyToOne(() => Client, { nullable: true })
    client: Client;

    @ManyToOne(() => Professional, { nullable: true })
    professional: Professional;

    @ManyToOne(() => GroupChat, (groupChat) => groupChat.chats )
    groupChat: GroupChat;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

}