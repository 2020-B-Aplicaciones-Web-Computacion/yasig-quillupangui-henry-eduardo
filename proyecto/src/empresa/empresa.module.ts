import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaEntity], 'default')],
  controllers: [
    // Controladores
    EmpresaController,
  ],
  providers: [
    // Servicios DECLARADOS
    EmpresaService,
  ],
  exports: [
    // Servicios EXPORTADOS
  ],
})
export class EmpresaModule {}
