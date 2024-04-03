import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    city_name: string;

}

