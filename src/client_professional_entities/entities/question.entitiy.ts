import { Entity, Column, PrimaryGeneratedColumn, Double } from "typeorm";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'float'})
    score: number;

    @Column()
    comment: string;

}

