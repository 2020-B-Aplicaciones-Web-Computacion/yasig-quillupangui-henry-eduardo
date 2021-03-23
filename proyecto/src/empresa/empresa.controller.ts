import {
  Controller,
  Get,
  Header,
  HttpCode,
  Req,
  Res,
  Headers,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaEntity } from './empresa.entity';
import {
  FindConditions,
  FindManyOptions,
  FindOneAndReplaceOption,
  FindOneOptions,
  Like,
} from 'typeorm';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

@Controller('empresa')
export class EmpresaController {
  constructor(private _empresaService: EmpresaService) {}

  private page = 1;

  @Get('crear-empresa')
  crearEmpresaVista(
    @Res()
    response,
  ) {
    response.render('empresas/crear');
  }

  @Post('crear-empresa')
  async crearEmpresa(@Body() parametrosCuerpo, @Res() response) {
    const respuesta = await this._empresaService.empresaEntity.save({
      nombre: parametrosCuerpo.nombre,
      ubicacion: parametrosCuerpo.ubicacion,
      creacion: parametrosCuerpo.creacion,
      presidente: parametrosCuerpo.presidente,
      ingresos: parametrosCuerpo.ingresos,
      empleados: parametrosCuerpo.empleados,
    });
    response.redirect(
      '/empresa/empresas?mensaje=Se creo la empresa ' + parametrosCuerpo.nombre,
    );
  }

  @Get('editar')
  async editarEmpresas(
    @Query()
    params,
    @Res()
    response,
  ) {
    const consultaWhereOR: FindConditions<EmpresaEntity>[] = [
      {
        id: Like(params.id ? params.id : '%'),
      },
    ];

    const consulta: FindManyOptions<EmpresaEntity> = {
      where: consultaWhereOR,
      take: 1,
    };

    const datos = await this._empresaService.empresaEntity.findAndCount(
      consulta,
    );
    response.render('empresas/editar', {
      datos: datos[0][0],
      params: params,
    });
  }

  @Post('editar')
  async editarEmpresasGuardar(
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
    if (bodyParams.ubicacion) {
      entity['ubicacion'] = bodyParams.ubicacion;
    }
    if (bodyParams.creacion) {
      entity['creacion'] = bodyParams.creacion;
    }
    if (bodyParams.presidente) {
      entity['presidente'] = bodyParams.presidente;
    }
    if (bodyParams.ingresos) {
      entity['ingresos'] = bodyParams.ingresos;
    }
    if (bodyParams.empleados) {
      entity['empleados'] = bodyParams.empleados;
    }

    try {
      const respuesta = await this._empresaService.empresaEntity.update(
        {
          id: queryParams.id,
        },
        entity,
      );
      response.redirect(
        '/empresa/empresas?mensaje=Se modificó la empresa exitosamente',
      );
    } catch {
      response.redirect(
        '/empresa/empresas?mensaje=No se modificarón los datos',
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
      await this._empresaService.empresaEntity.delete({
        id: queryParams.id,
      });
      response.redirect('/empresa/empresas?mensaje=Empresa Eliminada');
    } catch {
      response.redirect('/empresa/empresas?mensaje=No se pudo eliminar');
    }
  }

  @Get('empresas')
  async obtenerEmpresas(
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

    const consultaWhereOR: FindConditions<EmpresaEntity>[] = [
      {
        nombre: Like(
          parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%',
        ),
      },
    ];

    const consulta: FindManyOptions<EmpresaEntity> = {
      where: consultaWhereOR,
      take: take,
      skip: skip,
      order: {
        id: order === 'ASC' ? 'ASC' : 'DESC',
      },
    };

    const datos = await this._empresaService.empresaEntity.findAndCount(
      consulta,
    );
    response.render('empresas/inicio', {
      datos: datos,
      parametrosConsulta: parametrosConsulta,
      page: this.page,
    });
  }
}
