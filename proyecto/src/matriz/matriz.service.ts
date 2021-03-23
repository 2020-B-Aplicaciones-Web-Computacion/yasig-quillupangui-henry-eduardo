import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatrizEntity } from './matriz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatrizService {
  constructor(
    @InjectRepository(MatrizEntity)
    public matrizEntity: Repository<MatrizEntity>,
  ) {}
}
