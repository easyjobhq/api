import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment_method {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type:'text',
        nullable:false,
        width:20
    })
    payment_method_name: string;
}

