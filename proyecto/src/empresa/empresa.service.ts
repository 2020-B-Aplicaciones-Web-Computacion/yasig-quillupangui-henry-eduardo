import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(EmpresaEntity)
    public empresaEntity: Repository<EmpresaEntity>,
  ) {}
}
