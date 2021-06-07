import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Oferta } from './Oferta';

@Entity()
export class Habilidad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Oferta, oferta => oferta.habilidades)
    oferta: Oferta;
}