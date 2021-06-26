import { Departamento } from './Departamento';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany,
  BaseEntity, JoinTable
} from 'typeorm';

@Entity()
export class Localidad extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  
  @ManyToOne(() => Departamento, departamento => departamento.id)
  departamento: Departamento;

  @OneToMany(() => Localidad, localidad => localidad.id)
  localidad: Localidad[];
}