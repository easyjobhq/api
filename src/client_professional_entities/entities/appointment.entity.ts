import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { Service } from "src/professionals/entities/service.entity";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    date: Date;  

    @Column({ type: 'text' })
    location: string;

    @Column({ type: 'text' })
    hour: string;

    @ManyToOne(() => Service, (service) => service.appointments, { nullable: true })
    service: Service;

    @ManyToOne(() => Client, (client) => client.questions)
    client: Client;

    @ManyToOne(() => Professional, (professional) => professional.appointments)
    professional: Professional;

}
