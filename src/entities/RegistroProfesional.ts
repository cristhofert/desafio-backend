import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { PerfilProfesional } from './PerfilProfesional';

@Entity()
export class RegistroProfesional extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    contrasenna: string;

    @OneToOne(() => PerfilProfesional)
    @JoinColumn()
    perfil: PerfilProfesional;
}