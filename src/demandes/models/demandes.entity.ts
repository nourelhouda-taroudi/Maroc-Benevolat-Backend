import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('inscription')
export class DemandesEntity{
@PrimaryGeneratedColumn()
id: number;

@Column({default:'Demande Inscription'})
demandes:string;

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

@Column()
nameAssociation: string;

@Column()
sigleAssociation: string;

@Column()
objetSocial: string;

@Column({width:100,type:'numeric'})
phoneAssociation: number;

@Column()
address: string;

@Column()
codePostal: string;

@Column()
city: string;

@Column({ nullable: true })
infos: string;

@Column({ nullable: true })
logo: string;

@Column()
emailAssociation: string;

@Column({ nullable: true })
facebook: string;

@Column({ nullable: true })
instagram: string;

@Column({ nullable: true })
twitter: string;

}