import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany
} from 'typeorm';
import { Localidad } from './Localidad';

@Entity()
export class Departamento extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  nombre: string; 

   @OneToMany(() => Localidad, localidad => localidad.departamentos)
   localidades: Localidad[];

}