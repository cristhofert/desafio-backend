import { Departamento } from './Departamento';
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,
    BaseEntity, JoinTable
} from 'typeorm';
import { Empresa } from './Empresa';

@Entity()
export class Localidad extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Departamento, departamento => departamento.localidades)
    departamentos: Departamento;

    @OneToMany(() => Empresa, empresa => empresa.localidades)
    empresas: Empresa[];
}