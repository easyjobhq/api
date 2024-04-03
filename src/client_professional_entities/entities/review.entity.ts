import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    question_description: string;

}

