import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

//Decorador: funciones con @
@Module({
  imports: [
    //Modulos
  ],
  controllers: [
    //Controladores
    UsuarioController,
  ],
  providers: [
    //Servicios Declarados
  ],
  exports: [
    //Servicios Exportados
  ],
})
export class UsuarioModule {}
