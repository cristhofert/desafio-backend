import { Persona } from './Persona';
import { Empresa } from './Empresa';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany, PrimaryColumn
} from 'typeorm';

@Entity()
export class Empresa_Persona extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

  @OneToMany(() => Empresa, empresa => empresa.RUT)
  empresa: Empresa;

  @OneToMany(() => Persona, persona => persona.id)
  persona: Persona;

  @Column()
  cargo: string;
}