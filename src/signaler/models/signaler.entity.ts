import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('signaler')
export class SignalerEntity{
@PrimaryGeneratedColumn()
id: number;

@Column()
nom:string;

@Column()
description:string;
}