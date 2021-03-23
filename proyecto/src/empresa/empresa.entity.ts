import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MatrizEntity } from '../matriz/matriz.entity';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@Entity('EMPRESA')
export class EmpresaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'NOMBRE_EMPRESA',
  })
  nombre: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'UBICACION_EMPRESA',
  })
  ubicacion: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'FECHA_EMPRESA',
  })
  creacion: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'PRESIDENTE_EMPRESA',
  })
  presidente: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'INGRESOS_EMPRESA',
  })
  ingresos: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'EMPLEADOS_EMPRESA',
  })
  empleados: string;

  @OneToMany((type) => MatrizEntity, (matriz) => matriz.fkEmpresa)
  matrices: MatrizEntity[];
}
