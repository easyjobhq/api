import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Speciality {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    speciality_name: string;
}

