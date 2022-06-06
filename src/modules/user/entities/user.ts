import { Otp } from './otp';
import { Association } from '../../association/entities/association.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({unique:true})
    email:string;

    @Column()
    password:string;
    @Column()
    association_id:number;
    

    @OneToOne(()=>Association,(association)=>association.user, { onDelete: 'CASCADE' })
    @JoinColumn({name:'association_id'})
    association:Association;

    
    @OneToMany(()=>Otp,(otp)=>otp.user)
    otps:Otp[];

}
