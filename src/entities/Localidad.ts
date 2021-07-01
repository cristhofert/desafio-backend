import { Departamento } from './Departamento';
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';

@Entity()
export class Localidad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Departamento, departamento => departamento.localidades)
    departamento: Departamento;
}