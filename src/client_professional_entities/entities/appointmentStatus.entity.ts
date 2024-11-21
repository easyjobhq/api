import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity()
export class AppointmentStatus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    status: string;

    @OneToOne(() => Appointment, (appointment) => appointment.appointmentStatus)
    appointment: Appointment;


}
