import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('suppression')
export class SuppressionEntity{
@PrimaryGeneratedColumn()
id: number;

@Column({default:'Demande de suppression'})
demandes:string;

@Column()
name:string

@Column()
name_asso:string;

@Column()
email_asso:string;







}