import { Entity, Column, PrimaryGeneratedColumn, ChildEntity } from "typeorm";
import { User } from "./user.entity";

@ChildEntity()
export class Client extends User {
    
}