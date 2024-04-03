import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    department_name: string;

}

