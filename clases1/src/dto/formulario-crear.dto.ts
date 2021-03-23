//dto
import {
    isEmail, isIn,
    isNotEmpty,
    isNumber,
    isNumberString,
    IsOptional,
    isPositive,
    isString, isValidationOptions,
    Length,
    minLength
} from "class-validator";

export class FormularioCrearDto{

    nombre: string;

    cedula: string;

    correo: string;

    edad: number;

    soltero:boolean;
}