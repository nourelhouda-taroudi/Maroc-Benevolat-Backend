import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Association } from './../../association/entities/association.entity';

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

 @ManyToOne(()=>Association,(association)=>association.stories)
 @JoinColumn({name:'association_id'})
 association:Association;

}

