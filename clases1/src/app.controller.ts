import {
  BadRequestException, Body,
  Controller,
  ForbiddenException,
  Get, HttpCode, Post,
  Query,
  Req,
  Session,
} from '@nestjs/common';
import path from 'node:path';
import { AppService } from './app.service';
import {FormularioCrearDto} from "./dto/formulario-crear.dto";
import {validate} from "class-validator";
import objectContaining = jasmine.objectContaining;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('validacion-formulario')
  async validacionFormulario(
      @Body() parametrosCuerpo
  ) {
      const dtoFormulario= new FormularioCrearDto();
      dtoFormulario.nombre=parametrosCuerpo.nombre;
      dtoFormulario.cedula=parametrosCuerpo.cedula;
      dtoFormulario.correo=parametrosCuerpo.correo;
      dtoFormulario.edad=parametrosCuerpo.edad;
      dtoFormulario.soltero=parametrosCuerpo.soltero;
      const errores =await validate (dtoFormulario);
      if (errores.length > 0){
        console.error(JSON.stringify(errores))
        console.error(errores.toString());
        throw new BadRequestException(objectContaining('no envia correctamente los parametros'))
      }else{
        return 'ok';
      }


  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(@Session() session, @Query() parametrosConsulta): string {
    if (parametrosConsulta.nombre && parametrosConsulta.apellido) {
      session.usuario = {
        nombre: parametrosConsulta.nombre,
        apellido: parametrosConsulta.apellido,
      };
      if (parametrosConsulta.apellido === 'yasig') {
        session.usuario.esAdministrador = true;
      }
      return 'Se logeo el Usuario';
    } else {
      throw new BadRequestException('NO ENVIA NOMBRE Y APELLIDO'); //400
    }
  }

  @Get('quien-soy')
  quienSoy(@Session() session): string {
    if (session.usuario) {
      return session.usuario.nombre + ' ' + session.usuario.apellido;
    } else {
      return 'No te has logeado';
    }
  }

  @Get('logout')
  logout(@Session() session, @Req() request): string {
    session.usuario = undefined;
    request.session.destroy();
    return 'Gracias por visitarnos';
  }

  @Get('protegido')
  protegido(@Session() session): string {
    if (session.usuario) {
      if (session.usuario.esAdministrador) {
        return 'CONTENIDO SUPER OCULTO';
      } else {
        throw new ForbiddenException('No tienes rol Admin');
      }
    } else {
      throw new ForbiddenException('No tienes rol Admin');
    }
  }
}
