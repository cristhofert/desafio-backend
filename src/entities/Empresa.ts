import { Users } from './Users';
import { Localidad } from './Localidad';
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany,
  BaseEntity,
  PrimaryColumn
} from 'typeorm';
import { Empresa_Persona } from './Empresa_Persona';
import { Rubro } from './Rubro';

@Entity()
export class Empresa extends BaseEntity {
  @Column({ unique: true })
  razon_social: string;

  @Column()
  nombre_fantasia: string;

  @PrimaryColumn({ unique: true })
  RUT: string;

  @Column()
  direccion: string;

  @Column({ unique: true })
  email: string;

  @Column()
  celular: string;

  @Column()
  telefono: string;

  @Column()
  nro_BPS: string;

  @Column()
  nro_referencia: string;

  @OneToMany(() => Rubro, rubro => rubro.empresa)
  actividad_principal: Rubro;

  @OneToMany(() => Rubro, rubro => rubro.empresa)
  actividad_secundaria: Rubro;

  @Column()
  fecha_afiliacion: string;

  @Column()
  fecha_inicio_empresa: string;

  @Column()
  estado: boolean;

  @Column()
  fecha_de_baja: string;

  @Column()
  observaciones: string;

  @Column()
  imagen: string;

  @ManyToOne(() => Localidad, localidad => localidad.empresa, {
    onDelete: 'SET NULL'
  })
  localidad: Localidad;

  @ManyToOne(() => Users, user => user.empresa)
  user: Users[];

  @OneToMany(() => Empresa_Persona, empresa_persona => empresa_persona.empresa)
  empresa_persona: Empresa_Persona[];
}
