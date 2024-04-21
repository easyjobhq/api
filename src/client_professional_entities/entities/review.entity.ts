import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable:false
    })
    title: string;

    @Column({
        type:'text',
        nullable:true,
        width:200
    })
    question_description: string;

    @ManyToOne(()=>Client, (client)=>client.reviews)
    client: Client

    @ManyToOne(()=>Professional, (professional)=> professional.reviews)
    professionals: Professional[]

}

