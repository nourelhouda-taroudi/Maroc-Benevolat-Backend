import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('membres')
export class MembresEntity{
@PrimaryGeneratedColumn()
id: number;

@Column()
name:string;

@Column()
lastname:string;

@Column()
email:string;

@Column()
position:string;








}
