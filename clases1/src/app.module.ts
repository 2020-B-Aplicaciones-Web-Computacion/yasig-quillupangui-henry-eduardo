import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from './usuario/usuario.module';
import {MascotaModule} from './mascota/mascota.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';
import {MascotaEntity} from './mascota/mascota.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default', // nombre cadena de conexión
      type: 'mysql',
      port: 3010,
      username: 'epn',
      password: 'epn12345678',
      database: 'web',
      dropSchema: false, // Elimina toda la base de datos
      synchronize: true, // Crea y modifica las tablas
      entities: [
        UsuarioEntity,
        MascotaEntity,
      ]
    }),
    MascotaModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}