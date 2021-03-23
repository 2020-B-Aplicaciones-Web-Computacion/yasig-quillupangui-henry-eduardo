import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmpresaEntity } from '../empresa/empresa.entity';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity('SUCURSAL')
export class MatrizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'NOMBRE_SUCURSAL',
  })
  nombre: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'DIRECCION_SUCURSAL',
  })
  direccion: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'EMPLEADOS_SUCURSAL',
  })
  empleados: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'HORARIO_SUCURSAL',
  })
  horario: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'ESTADO_SUCURSAL',
  })
  estado: string;

  @ManyToOne((type) => EmpresaEntity, (empresa) => empresa.matrices)
  fkEmpresa: EmpresaEntity;
}
