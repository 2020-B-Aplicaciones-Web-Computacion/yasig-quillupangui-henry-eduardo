import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaModule } from './empresa/empresa.module';
import { MatrizModule } from './matriz/matriz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresa/empresa.entity';
import { MatrizEntity } from './matriz/matriz.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      port: 3010,
      username: 'epn',
      password: 'epn12345678',
      database: 'web',
      dropSchema: false,
      synchronize: true,
      entities: [EmpresaEntity, MatrizEntity],
    }),
    MatrizModule,
    EmpresaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
