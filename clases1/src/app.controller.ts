import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Query,
  Req,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
      if (parametrosConsulta.apellido === 'Murgueytio') {
        session.usuario.esAdministrador = true;
      }
      return 'Se logeo el usuario';
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
