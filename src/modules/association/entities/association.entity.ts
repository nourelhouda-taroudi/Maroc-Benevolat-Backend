import { StoryEntity } from './../../stories/models/story.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user';
import { PostEntity } from './../../../post/models/post.entity';

@Entity('associations')
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => User, (user) => user.association)
  user: User;

  @OneToMany(() => PostEntity, (post) =>post.association)
  posts: PostEntity[];

  @OneToMany(() => StoryEntity, (post) =>post.association)
  stories: StoryEntity[];
}
