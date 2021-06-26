import { Empresa_Persona } from './Empresa_Persona';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
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
 
  @ManyToOne(() => Empresa_Persona, empresa_persona => empresa_persona.id)
  empresa_persona: Empresa_Persona[];
}