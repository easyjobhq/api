import { Appointment } from "src/client_professional_entities/entities/appointment.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Payment_method {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type:'text',
        nullable:false,
        width:20
    })
    payment_method_name: string;

    @OneToMany(()=>Appointment, (appointment)=>appointment.payment_method)
    appointments: Appointment[]
}

