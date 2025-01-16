import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Professional } from "../../professionals/entities/professional.entity";
import { Service } from "../../professionals/entities/service.entity";
import { AppointmentStatus } from "./appointmentStatus.entity";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    date: Date;  

    @Column({ type: 'time', nullable: true })
    hour: string;

    @ManyToOne(() => AppointmentStatus, (status) => status.appointments)
    appointmentStatus: AppointmentStatus;
    
    @ManyToOne(() => Service, (service) => service.appointments, { nullable: true })
    service: Service;

    @ManyToOne(() => Client, (client) => client.questions)
    client: Client;

    @ManyToOne(() => Professional, (professional) => professional.appointments)
    professional: Professional;

}
