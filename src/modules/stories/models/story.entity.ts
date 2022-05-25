import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity('story')
export class StoryEntity{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({default:''})
 text:string;

 @Column({default:''})
 image:string;

 @Column({default:true})
 like:boolean;

 @Column({default:0})
 likeNum:number;

 @CreateDateColumn()
 createdAt:Date;

}

