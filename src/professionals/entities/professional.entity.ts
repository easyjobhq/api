import { User } from "src/clients/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from "typeorm";

@ChildEntity()
export class Professional extends User {
    
    @Column()
    score: string;

    @Column()
    description: string;
}

