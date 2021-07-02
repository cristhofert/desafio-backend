import { Departamento } from './Departamento';
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';
import { Empresa } from './Empresa';

@Entity()
export class Localidad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Departamento, departamento => departamento.localidades, {
        onDelete: 'CASCADE'
    })
    departamento: Departamento;
}