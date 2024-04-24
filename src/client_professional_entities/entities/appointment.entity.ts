import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, ManyToMany } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { Payment_method } from "../../general_resources/entities/payment_method.entity";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'timestamp'})
    date: number;

    @Column({type: 'point'})
    location: string;

    @ManyToOne(()=>Client, (client)=>client.questions)
    client: Client

    @ManyToOne(()=>Professional, (professional)=>professional.questions)
    professional: Professional

    @ManyToOne(()=>Payment_method, (payment_method)=>payment_method.appointments)
    payment_method: Payment_method


}

