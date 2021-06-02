import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { PerfilProfesional } from './PerfilProfesional';

@Entity()
export class Idioma extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => PerfilProfesional, perfilProfesional => perfilProfesional.idiomas)
    perfilProfesional: PerfilProfesional;
}