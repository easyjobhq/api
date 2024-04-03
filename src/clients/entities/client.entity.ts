import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Client extends User {
    
}