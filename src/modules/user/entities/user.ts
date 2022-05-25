import { Association } from '../../association/entities/association.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    gender:string;

    @Column({width:100,type:'numeric'})
    phone:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToOne(()=>Association,(association)=>association.user)
    @JoinColumn({name:'association_id'})
    association:Association;
}
