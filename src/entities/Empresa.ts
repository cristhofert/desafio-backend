import { Users } from './Users';
import { Localidad } from './Localidad';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
  BaseEntity
} from 'typeorm';
import { Empresa_Persona } from './Empresa_Persona';

@Entity()
export class Empresa extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  razon_social: string;
  @Column()
  nombre_fantasia: string;
  @Column()
  RUT: number;
  @Column()
  direccion: string;
  @Column()
  email: string;
  @Column()
  celular: string;
  @Column()
  telefono: string;
  @Column()
  nro_BPS: string;
  @Column()
  nro_referencia: string;
  @Column()
  actividad_principal: string;
  @Column()
  actividad_secunadria: string;
  @Column()
  fecha_afiliacion: string;
  @Column()
  fecha_inicio_empresa: string;
  @Column()
  estado: string;
  @Column()
  fecha_de_baja: string;
  @Column()
  observaciones: string;
  @Column()
  imagen: string;
 
  @ManyToOne(() => Localidad, localidad => localidad.id)
  localidad: Localidad;

  @ManyToOne(() => Users, user => user.id)
  users: Users[];

  @ManyToOne(() => Empresa_Persona, empresa_persona => empresa_persona.id)
  empresa_persona: Empresa_Persona[];
}
