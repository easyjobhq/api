import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: number;

    @Column()
    photo_url: string;
}

