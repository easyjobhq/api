import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity()
export class AppointmentStatus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    status: string;

    @OneToMany(() => Appointment, (appointment) => appointment.appointmentStatus)
    appointments: Appointment[];
}
