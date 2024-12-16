import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToMany, OneToMany } from "typeorm";
import { Professional } from "./professional.entity";
import { Appointment } from "src/client_professional_entities/entities/appointment.entity";

@Entity()
export class Service {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'text',
        nullable:false
    })
    title: string;

    @Column({
        type:'text',
        nullable:true,
        width:900
    })
    description: string;

    @Column({type: 'float'})
    price: number;

    @ManyToMany(()=>Professional, (professional)=>professional.services)
    professionals: Professional[]

    @OneToMany(()=>Appointment, (appointment)=>appointment.professional)
    appointments: Appointment[]

}

