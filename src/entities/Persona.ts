import { Empresa_Persona } from './Empresa_Persona';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,
  BaseEntity, JoinTable
} from 'typeorm';

@Entity()
export class Persona extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({unique: true})
  email: string;

  @Column()
  celular: string;
  
  @Column()
  estado: string;
 
  @OneToMany(() => Empresa_Persona, empresa_persona => empresa_persona.persona)
  empresa_persona: Empresa_Persona[];
}