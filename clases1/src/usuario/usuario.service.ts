import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor( // Inyectar Dependencias
        @InjectRepository(UsuarioEntity)
        public usuarioEntity:Repository<UsuarioEntity>
    ) {
    }
}