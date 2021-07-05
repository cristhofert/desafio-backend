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

    @OneToMany(() => Empresa, empresa => empresa.actividad_principal)
    empresa: Empresa[];

    @OneToMany(() => Empresa, empresa => empresa.actividad_secundaria)
    empresaSecundaria: Empresa[];

}