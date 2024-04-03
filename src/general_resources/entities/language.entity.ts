import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    language_name: string;

}
