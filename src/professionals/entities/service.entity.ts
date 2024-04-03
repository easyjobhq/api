import { Entity, Column, PrimaryGeneratedColumn, Double } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: Double;

}

