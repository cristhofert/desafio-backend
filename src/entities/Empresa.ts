import { Users } from './Users';
import { Localidad } from './Localidad';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, 
  BaseEntity,
  PrimaryColumn
} from 'typeorm';
import { Empresa_Persona } from './Empresa_Persona';

@Entity()
export class Empresa extends BaseEntity{
  @Column({unique: true})
  razon_social: string;

  @Column()
  nombre_fantasia: string;

  @PrimaryColumn({unique: true})
  RUT: string;

  @Column()
  direccion: string;

  @Column({unique: true})
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

  @OneToMany(() => Localidad, localidad => localidad.empresa)
  localidad: Localidad;
  
  @ManyToOne(() => Users, user => user.empresa)
  user: Users[];

  @OneToMany(() => Empresa_Persona, empresa_persona => empresa_persona.empresa)
  empresa_persona: Empresa_Persona[];
}
