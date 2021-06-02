import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { PerfilProfesional } from './PerfilProfesional';

@Entity()
export class RegistroProfesional extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    contrasenna: string;

    @OneToOne(() => PerfilProfesional, perfilProfesional => perfilProfesional.registro)
    perfil: PerfilProfesional[];
}