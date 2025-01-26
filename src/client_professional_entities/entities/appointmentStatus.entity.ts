import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Appointment } from "./appointment.entity";
import { AppointmentStatusEnum } from "./appointment.status.enum";

@Entity()
export class AppointmentStatus {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'enum',
        enum:  AppointmentStatusEnum,
        default: AppointmentStatusEnum.pending
    })
    status: AppointmentStatusEnum;

    @OneToMany(() => Appointment, (appointment) => appointment.appointmentStatus)
    appointments: Appointment[];
}
