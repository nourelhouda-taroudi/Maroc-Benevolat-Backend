import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

 @Entity('posts')
export class PostEntity{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({default:''})
 text:string;
 @Column({default:''})
 commentaire:string;
  
 @Column({default:''})
 visualisation:string;

 @Column({default:''})
 image:string;

 @Column({default:true})
 like:boolean;

 @Column({default:0})
 likeNum:number;

 @CreateDateColumn()
 createdAt:Date;
}

