import { Empresa } from './Empresa';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany, ManyToOne
} from 'typeorm';

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;
 
  @ManyToOne(() => Empresa, empresa => empresa.user)
  empresa: Empresa;
}