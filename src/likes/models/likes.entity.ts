import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class likesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_post: number;

  @Column()
  adresse: string;
}
