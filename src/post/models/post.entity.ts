import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Association } from './../../modules/association/entities/association.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

 @Column({default:''})
 text:string;
 @Column({default:''})
 commentaire:string;
  
 @Column({default:''})
 visualisation:string;



  @Column({ default: '', nullable: true })
  image: string;

  @Column({ default: true })
  like: boolean;

  @Column({ default: 0 })
  likeNum: number;

  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => Association, (association) => association.posts)
  @JoinColumn({ name: 'association_id' })
  association: Association;
}
