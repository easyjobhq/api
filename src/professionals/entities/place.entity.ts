import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Professional } from './professional.entity';

@Entity()
export class Place {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision' })
    longitude: number;

    @ManyToOne(() => Professional, professional => professional.places)
    professional: Professional;
}