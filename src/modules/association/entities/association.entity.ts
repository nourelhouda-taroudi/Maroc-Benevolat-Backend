import { User } from '../../user/entities/user';
import { Column, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

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

  @Column()
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
}
