import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { MatrizService } from './matriz.service';
import { FindConditions, FindManyOptions, Like } from 'typeorm';
import { MatrizEntity } from '../matriz/matriz.entity';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

@Controller('matriz')
export class MatrizController {
  private fkEmpresa;
  private page = 1;

  constructor(private _matrizService: MatrizService) {}

  @Get('crear-matriz')
  crearMatrizVista(
    @Res()
    response,
  ) {
    response.render('matrices/crear');
  }

  @Post('crear-matriz')
  async crearMatriz(@Body() parametrosCuerpo, @Res() response) {
    const respuesta = await this._matrizService.matrizEntity.save({
      nombre: parametrosCuerpo.nombre,
      direccion: parametrosCuerpo.direccion,
      empleados: parametrosCuerpo.empleados,
      horario: parametrosCuerpo.horario,
      estado: parametrosCuerpo.estado,
      fkEmpresa: this.fkEmpresa,
    });
    response.redirect(
      '/matriz/matrices?empresa=' +
        this.fkEmpresa +
        '&&mensaje=Se creó la sucursal ' +
        parametrosCuerpo.nombre,
    );
  }

  @Get('editar')
  async editarMatriz(
    @Query()
    params,
    @Res()
    response,
  ) {
    const consultaWhereOR: FindConditions<MatrizEntity>[] = [
      {
        id: Like(params.id ? params.id : '%'),
      },
    ];

    const consulta: FindManyOptions<MatrizEntity> = {
      where: consultaWhereOR,
      take: 1,
    };

    const datos = await this._matrizService.matrizEntity.findAndCount(consulta);
    response.render('matrices/editar', {
      datos: datos[0][0],
      params: params,
    });
  }

  @Post('editar')
  async editarMatrizGuardar(
    @Body()
    bodyParams,
    @Query()
    queryParams,
    @Res()
    response,
  ) {
    const entity = {};
    if (bodyParams.nombre) {
      entity['nombre'] = bodyParams.nombre;
    }
    if (bodyParams.direccion) {
      entity['direccion'] = bodyParams.direccion;
    }
    if (bodyParams.empleados) {
      entity['empleados'] = bodyParams.empleados;
    }
    if (bodyParams.horario) {
      entity['horario'] = bodyParams.horario;
    }
    if (bodyParams.estado) {
      entity['estado'] = bodyParams.estado;
    }

    try {
      const respuesta = await this._matrizService.matrizEntity.update(
        {
          id: queryParams.id,
        },
        entity,
      );
      response.redirect(
        '/matriz/matrices?empresa=' +
          this.fkEmpresa +
          '&&mensaje=Se modificó la sucursal',
      );
    } catch {
      response.redirect(
        '/matriz/matrices?empresa=' +
          this.fkEmpresa +
          '&&mensaje=No se modificaron los datos',
      );
    }
  }

  @Get('eliminar')
  async eliminarEmpresa(
    @Query()
    queryParams,
    @Res()
    response,
  ) {
    try {
      await this._matrizService.matrizEntity.delete({
        id: queryParams.id,
      });
      response.redirect(
        '/matriz/matrices?empresa=' +
          this.fkEmpresa +
          '&&mensaje=Empresa Eliminada ',
      );
    } catch {
      response.redirect(
        '/matriz/matrices?empresa=' +
          this.fkEmpresa +
          '&&mensaje=No se pudo eliminar',
      );
    }
  }

  @Get('matrices')
  async obtenerMatrices(
    @Query()
    parametrosConsulta,
    @Res()
    response,
  ) {
    const take = 2;
    let skip = 0;
    let order = 'ASC';

    if (parametrosConsulta.order) {
      order = parametrosConsulta.order;
    }

    if (parametrosConsulta.page) {
      this.page = parseInt(parametrosConsulta.page);
      skip = 2 * (this.page - 1);
    }

    if (parametrosConsulta.empresa) {
      this.fkEmpresa = parametrosConsulta.empresa;
    } else {
      this.fkEmpresa = '1';
    }

    const consultaWhereAND: FindConditions<MatrizEntity>[] = [
      {
        nombre: Like(
          parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%',
        ),
        fkEmpresa: Like(this.fkEmpresa ? this.fkEmpresa : '%%'),
      },
    ];

    const consulta: FindManyOptions<MatrizEntity> = {
      where: consultaWhereAND,
      take: take,
      skip: skip,
      order: {
        id: order === 'ASC' ? 'ASC' : 'DESC',
      },
    };

    const datos = await this._matrizService.matrizEntity.findAndCount(consulta);
    response.render('matrices/inicio', {
      datos: datos,
      parametrosConsulta: parametrosConsulta,
      page: this.page,
    });
  }
}
