import { ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { User } from './user';
import { Column, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity('otp')
export class Otp{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    code:string;
    @ManyToOne(()=>User,(user)=>user.otps)
    @JoinColumn({name:'user_id'})
    user:User;
    

}