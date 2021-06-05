import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Cualificacion } from "./Cualificacion"
import { Habilidad } from "./Habilidad"
import { Responsabilidad } from "./Responsabilidad"
import { Condicion } from "./Condicion"
import { RegistroProfesional } from './RegistroProfesional';

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
    politica_teletrabajo: string;

    @OneToMany(() => Cualificacion, cualificacion => cualificacion.id)
    cualificaciones: Cualificacion[];

    @OneToMany(()=> Condicion, condicion => condicion.id)
    condiciones: Condicion[];

    @OneToMany(() => Habilidad, habilidad => habilidad.id )
    habilidades: Habilidad[];

    @OneToMany(() => Responsabilidad, responsabilidad => responsabilidad.id )
    responsabilidades: Responsabilidad[];

    @ManyToMany(() => RegistroProfesional)
    @JoinTable()
    aplicantes: RegistroProfesional[];
}