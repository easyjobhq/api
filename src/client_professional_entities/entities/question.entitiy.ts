import { Entity, Column, PrimaryGeneratedColumn, Double } from "typeorm";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    score: Double;

    @Column()
    comment: string;

}

