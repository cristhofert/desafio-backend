import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Oferta } from './Oferta';

@Entity()
export class Cualificacion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Oferta, oferta => oferta.cualificaciones)
    oferta: Oferta;
}