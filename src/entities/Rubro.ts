import { Departamento } from './Departamento';
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity,
    OneToMany,
    PrimaryColumn
} from 'typeorm';
import { Empresa } from './Empresa';

@Entity()
export class Rubro extends BaseEntity {
    @PrimaryColumn()
    nombre: string;

    @ManyToOne(() => Empresa, empresa => empresa.user)
    empresa: Empresa[];

}