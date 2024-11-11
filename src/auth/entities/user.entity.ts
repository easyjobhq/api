import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "./role.enum";
import { Chat } from "src/chat/entities/chat.entity";


export abstract class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable:false
    })
    name: string;

    @Column('text',{
        nullable:false
    })
    last_name: string;

    @Column('text',{
        unique:true,
        nullable:false
    })
    email: string;

    @Column('text',{
        nullable:true,
        unique:true
    })
    phone_number: string;

    @Column('text',{
        nullable:true
    })
    photo_url: string;

    @Column('text',{
        select:false,
        nullable:false
    })
    password: string;

    @Column('text',{
        array: true,
        nullable:true
    })
    roles: Role[]

}

