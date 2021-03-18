import {
  Controller,
  Get,
  Req,
  HttpCode,
  Header,
  Headers,
  Param,
  Res,
  Post,
  Body,
  Query,
  Put,
} from '@nestjs/common';
import { FindConditions, FindManyOptions, Like } from 'typeorm';

@Controller('usuario')
export class UsuarioController {
  @Get('hola')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  @Header('EPN', 'SISTEMAS')
  hola(
    @Req()
    request,
    @Headers()
    headers,
    // @Res()
    // response // Ustedes deben devolver la respuesta
  ) {
    // response.send('HOLA DESDE SEND')
    console.log(headers);
    // return 'Hola mundo http';
    // return {
    //     nombre:'Adrian'
    // }
    // return '<xml>Hola Mundo</xml>'
    return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">';
  }

  @Post('parametros-ruta/:numeroUno/:numeroDos')
  parametrosRuta(
    @Param() parametrosRuta,
    @Res({ passthrough: true })
    response,
  ) {
    console.log(parametrosRuta.numeroUno);
    console.log(parametrosRuta.numeroDos);
    response.header('nueva-header', 'otro valor');
    const valorUno: number = parametrosRuta.numeroUno;
    const valorDos: number = parametrosRuta.numeroDos;
    let suma = 0;
    suma = valorUno + valorDos;
    console.log(suma);
    return suma;
  }

  @Get('setear-nombre/:nombre')
  setearNombre(
    @Param()
    parametrosRuta,
    @Req()
    request,
    @Res({ passthrough: true }) //Activamos passthrough para poder utilizar return
    response,
  ) {
    console.log(request.cookies); //El valor de la cookie en la petición
    response.cookie('nombreUsuario', parametrosRuta.nombre);
    return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'; //con pass
    //response.send('Cookie con nombre ' + parametrosRuta.nombre + ' seteada'); //sin pass
  }
}
