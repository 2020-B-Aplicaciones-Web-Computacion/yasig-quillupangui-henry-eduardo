import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';

@Controller('calculadora')
export class CalculadoraController {
  @Get('suma')
  @HttpCode(200)
  sumar(
    @Query()
    parametrosConsulta,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    const cookietemp = request.cookies;
    const nombreUsuario = parametrosConsulta.nombre;
    let valorCok = cookietemp[nombreUsuario];
    if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
      return 'Ingrese su Nombre';
    }

    const resultado = parametrosConsulta.numUno + parametrosConsulta.numDos;
    valorCok = valorCok - resultado;
    if (valorCok < 0) {
      this.deleteCookie(response, nombreUsuario);
      return 'FELICIDADES GANASTE!';
    } else {
      response.cookie(nombreUsuario, valorCok);
      return (
        'El Resultado es : ' +
        resultado +
        ', te quedan: ' +
        valorCok +
        ' puntos'
      );
    }
  }

  @Post('resta')
  @HttpCode(201)
  @Header('Resultado', 'valor')
  restar(
    @Body() bodyParams,
    @Res({ passthrough: true })
    response,
    @Headers() headers,
    @Req()
    request,
  ) {
    const cookietemp = request.cookies;
    const nombreUsuario = bodyParams.nombre;
    let valorCok = cookietemp[nombreUsuario];
    if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
      return 'Ingrese su Nombre';
    }
    const resultado = bodyParams.numeroUno - bodyParams.numeroDos;
    valorCok = valorCok - resultado;
    if (valorCok < 0) {
      this.deleteCookie(response, nombreUsuario);
      return 'FELICIDADES GANASTE!';
    } else {
      response.cookie(nombreUsuario, valorCok);
      response.header('Resultado', resultado);
      return (
        'El Resultado es : ' +
        resultado +
        ', te quedan: ' +
        valorCok +
        ' puntos'
      );
    }
  }

  @Put('multiplicar/:numeroUno/:numeroDos/:nombre')
  @HttpCode(200)
  multiplicar(
    @Param() parametrosRuta,
    @Res({ passthrough: true })
    response,
    @Req()
    request,
  ) {
    const cookietemp = request.cookies;
    const nombreUsuario = parametrosRuta.nombre;
    let valorCok = cookietemp[nombreUsuario];
    if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
      return 'Ingrese su Nombre';
    }
    const resultado = parametrosRuta.numeroDos * parametrosRuta.numeroUno;
    valorCok = valorCok - resultado;
    if (valorCok < 0) {
      this.deleteCookie(response, nombreUsuario);
      return 'FELICIDADES GANASTE!';
    } else {
      response.cookie(nombreUsuario, valorCok);
      return (
        'El Resultado es : ' +
        resultado +
        ', te quedan: ' +
        valorCok +
        ' puntos'
      );
    }
  }

  @Get('dividir')
  @HttpCode(201)
  dividir(
    @Req()
    request,
    @Headers()
    hearderparams,
    @Res({ passthrough: true })
    response,
  ) {
    const cookietemp = request.cookies;
    const nombreUsuario = hearderparams.nombre;
    let valorCok = cookietemp[nombreUsuario];
    if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
      return 'Ingrese el nombre de Usuario';
    }
    const resultado = hearderparams.numero1 / hearderparams.numero2;
    valorCok = valorCok - resultado;
    if (valorCok < 0) {
      this.deleteCookie(response, nombreUsuario);
      return 'FELICIDADES GANASTE!';
    } else {
      response.cookie(nombreUsuario, valorCok);
      return (
        'El Resultado es : ' +
        resultado +
        ', te quedan: ' +
        valorCok +
        ' puntos'
      );
    }
  }

  @Get('setName/:nombre')
  setUserName(
    @Param()
    parametrosRuta,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    response.cookie(parametrosRuta.nombre, 100);
    return 'Cookie' + parametrosRuta.nombre + ' seteada';
  }

  @Get('borrarCookie/:nombre')
  borrarCookie(
    @Param()
    parametrosRuta,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    response.clearCookie(parametrosRuta.nombre);
    return 'Cookie ' + parametrosRuta.nombre + ' eliminada';
  }

  deleteCookie(
    @Res({ passthrough: true })
    response,
    nombre,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    response.clearCookie(nombre);
  }
}
