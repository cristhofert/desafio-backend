import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, ManyToOne
} from 'typeorm';
import { PerfilProfesional } from './PerfilProfesional';

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

    //@OneToMany(() => Oferta)
    //ofertas: number[];

}