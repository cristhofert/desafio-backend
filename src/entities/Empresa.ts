import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, OneToMany
} from 'typeorm';
import { Oferta } from './Oferta';

@Entity()
export class Empresa extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    contrasenna: string;

    @Column()
    nombre: string;

    @Column()
    icono: string;

    @Column()
    descripcion: string;

    @Column()
    departamento: string;

    @Column()
    direccion: string;

    @Column()
    sitio_web: string;

    @Column()
    comentarios: string;

    @Column()
    twitter: string;

    @Column()
    facebook: string;

    @Column()
    linkedin: string;

    @Column()
    github: string;

    @OneToMany(() => Oferta, oferta => oferta.empresa)
    ofertas: Oferta[];
}