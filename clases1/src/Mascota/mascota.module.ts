import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { MascotaEntity } from './mascota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaController } from './mascota.controller';

// @Decorador()
@Module({
  imports: [
    // Modulos
    TypeOrmModule.forFeature(
      [MascotaEntity],
      'default', // nombre cadena de conexión
    ),
  ],
  controllers: [
    // Controladores
    MascotaController,
  ],
  providers: [
    // Servicios DECLARADOS
    MascotaService,
  ],
  exports: [
    // Servicios EXPORTADOS
    MascotaService,
  ],
})
export class MascotaModule {}
