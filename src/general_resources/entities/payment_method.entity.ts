import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment_method {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    payment_method_name: string;
}

