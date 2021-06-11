import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

import { Cualificacion } from "./Cualificacion"
import { Habilidad } from "./Habilidad"
import { Responsabilidad } from "./Responsabilidad"
import { Condicion } from "./Condicion"
import { RegistroProfesional } from './RegistroProfesional';
import { Empresa } from './Empresa';

@Entity()
export class Oferta extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    fecha: string;

    @Column()
    descripcion: string;

    @Column()
    presencialidad: string;

    @Column()
    estado: string;

    @OneToMany(() => Cualificacion, cualificacion => cualificacion.oferta, {cascade: true})
    cualificaciones: Cualificacion[];

    @OneToMany(()=> Condicion, condicion => condicion.oferta, {cascade: true})
    condiciones: Condicion[];

    @OneToMany(() => Habilidad, habilidad => habilidad.oferta, {cascade: true})
    habilidades: Habilidad[];

    @OneToMany(() => Responsabilidad, responsabilidad => responsabilidad.oferta, {cascade: true})
    responsabilidades: Responsabilidad[];

    @ManyToOne(() => Empresa, empresa => empresa.ofertas)
    empresa: Empresa;

    @ManyToMany(() => RegistroProfesional)
    @JoinTable()
    aplicantes: RegistroProfesional[];
}