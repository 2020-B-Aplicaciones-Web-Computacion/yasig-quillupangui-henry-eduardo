import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrizEntity } from './matriz.entity';
import { MatrizController } from './matriz.controller';
import { MatrizService } from './matriz.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatrizEntity], 'default')],
  controllers: [MatrizController],
  providers: [MatrizService],
  exports: [MatrizService],
})
export class MatrizModule {}
