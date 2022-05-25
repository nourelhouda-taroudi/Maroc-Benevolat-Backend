import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity('posts')
export class PostEntity{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({default:''})
 text:string;

 @Column({default:''})
 image:string;
  
 @Column({default:''})
 visualisation:string;

 @Column({default:true})
 like:boolean;

 @Column({default:0})
 likeNum:number;

 @CreateDateColumn()
 createdAt:Date;

}

