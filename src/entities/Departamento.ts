import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany
} from 'typeorm';

@Entity()
export class Departamento extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  nombre: string; 

  @OneToMany(() => Departamento, departamento => departamento.id)
  departamento: Departamento[];
}