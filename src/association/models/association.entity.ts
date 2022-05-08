import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('association')
export class AssociationEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    nom:string;
    @Column()
    siege:string;
    @Column()
    objet:string;
    @Column()
    telephone:number;
    @Column()
    adresse:string;
    @Column()
    code_postal:number;
    @Column()
    ville:string;
    @Column()
    description:string;
    @Column()
    email:string;
    @Column()
    facebook:string;
    @Column()
    instagram:string;
    @Column()
    twitter:string;
}




