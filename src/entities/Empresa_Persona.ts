import { Persona } from './Persona';
import { Empresa } from './Empresa';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany, PrimaryColumn, ManyToOne,
} from 'typeorm';

@Entity()
export class Empresa_Persona extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Empresa, empresa => empresa.empresa_persona)
  empresa: Empresa;

  @ManyToOne(() => Persona, persona => persona.empresa_persona)
  persona: Persona;

  @Column()
  cargo: string;
}